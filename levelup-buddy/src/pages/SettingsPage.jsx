import React, { useState, useRef, useEffect } from 'react';
import ConfirmDialog from '../components/common/ConfirmDialog';
import UserManualModal from '../components/common/UserManualModal';
import { backupService } from '../services/backupService';
import { seedStarterSuggestions } from '../db/seed';
import { notificationService } from '../services/notificationService';
import { routineService } from '../services/routineService';
import { useTheme } from '../context/ThemeContext';
import { db } from '../db/database';
import {
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Sun,
  Moon,
  ShieldCheck,
  Smartphone,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Bell,
  BellRing
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef(null);

  // Status feedback banners
  const [feedback, setFeedback] = useState(null);
  
  // Dialog States
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [isSeedConfirmOpen, setIsSeedConfirmOpen] = useState(false);
  const [importPendingData, setImportPendingData] = useState(null);
  const [isImportConfirmOpen, setIsImportConfirmOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Notification state
  const [hasNotifPermission, setHasNotifPermission] = useState(false);

  useEffect(() => {
    async function checkNotif() {
      const granted = await notificationService.hasPermission();
      setHasNotifPermission(granted);
    }
    checkNotif();
  }, []);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 6000);
  };

  // Notification toggle / test
  const handleToggleNotification = async () => {
    const granted = await notificationService.requestPermission();
    setHasNotifPermission(granted);
    if (granted) {
      const allRoutines = await routineService.getAllRoutines();
      await notificationService.syncRoutineNotifications(allRoutines);
      await notificationService.sendInstantNotification(
        '🔔 LevelUp Buddy Notification Test',
        'Your daily timing reminders are working and ready for offline use!'
      );
      showFeedback('success', 'Timing notifications enabled & test alert sent!');
    } else {
      showFeedback('error', 'Notification permission was denied.');
    }
  };

  // Export
  const handleExport = async () => {
    try {
      const result = await backupService.exportBackup();
      showFeedback('success', `Exported ${result.totalRecords} records to ${result.fileName}!`);
    } catch (err) {
      showFeedback('error', `Export failed: ${err.message}`);
    }
  };

  // Import file selected
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setImportPendingData(json);
        setIsImportConfirmOpen(true);
      } catch (err) {
        showFeedback('error', `Invalid JSON file: ${err.message}`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Confirm Import
  const handleExecuteImport = async () => {
    if (!importPendingData) return;
    try {
      const res = await backupService.importBackup(importPendingData);
      window.dispatchEvent(new Event('levelup-data-changed'));
      showFeedback(
        'success',
        `Successfully restored backup! (${res.routinesCount} routines, ${res.habitsCount} habits imported)`
      );
    } catch (err) {
      showFeedback('error', `Import failed: ${err.message}`);
    } finally {
      setImportPendingData(null);
    }
  };

  // Clear All Data
  const handleExecuteClear = async () => {
    try {
      await backupService.clearAllData();
      window.dispatchEvent(new Event('levelup-data-changed'));
      showFeedback('success', 'All local records successfully erased.');
    } catch (err) {
      showFeedback('error', `Clear failed: ${err.message}`);
    }
  };

  // Reset to starter templates
  const handleExecuteSeed = async () => {
    try {
      await seedStarterSuggestions();
      window.dispatchEvent(new Event('levelup-data-changed'));
      showFeedback('success', 'Starter routine and habit templates successfully loaded!');
    } catch (err) {
      showFeedback('error', `Template load failed: ${err.message}`);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white light:text-slate-900 tracking-tight">
          Settings & Data
        </h1>
        <p className="text-xs text-slate-400 light:text-slate-500">
          Preferences, backup exports, and offline storage controls
        </p>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl flex items-start space-x-2.5 text-xs font-medium border animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span className="leading-snug">{feedback.message}</span>
        </div>
      )}

      {/* User Manual Spotlight Card */}
      <div className="glass-panel p-4 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-purple-950/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white light:text-slate-900">
                User Manual & Guide
              </div>
              <div className="text-xs text-slate-400 light:text-slate-500">
                Detailed instructions on how to use every feature
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
          >
            Open Manual
          </button>
        </div>
      </div>

      {/* Timing Notifications Card */}
      <div className="glass-panel p-4 rounded-3xl">
        <h3 className="text-xs font-bold text-slate-400 light:text-slate-600 uppercase tracking-wider mb-3">
          Timing Reminders & Notifications
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${hasNotifPermission ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
              {hasNotifPermission ? <BellRing className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-sm font-bold text-white light:text-slate-900">
                {hasNotifPermission ? 'Timing Reminders Active' : 'Enable Timing Alerts'}
              </div>
              <div className="text-xs text-slate-400 light:text-slate-500">
                {hasNotifPermission ? 'Alarms trigger at routine start times' : 'Receive alerts on scheduled routine times'}
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleNotification}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              hasNotifPermission
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750 light:bg-slate-100 light:text-slate-800'
                : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500 shadow-md shadow-indigo-600/30'
            }`}
          >
            {hasNotifPermission ? 'Test Alert' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Appearance Theme Card */}
      <div className="glass-panel p-4 rounded-3xl">
        <h3 className="text-xs font-bold text-slate-400 light:text-slate-600 uppercase tracking-wider mb-3">
          Appearance
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-sm font-bold text-white light:text-slate-900">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </div>
              <div className="text-xs text-slate-400 light:text-slate-500">
                {theme === 'dark' ? 'Modern dark navy aesthetics' : 'Clean high-contrast theme'}
              </div>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold border border-slate-700 light:bg-slate-100 light:text-slate-900 light:border-slate-300 transition-colors"
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      {/* Backup & Restore Card */}
      <div className="glass-panel p-4 rounded-3xl space-y-3">
        <h3 className="text-xs font-bold text-slate-400 light:text-slate-600 uppercase tracking-wider">
          Data Backup & Restore
        </h3>
        <p className="text-xs text-slate-400 light:text-slate-500 leading-relaxed">
          Because LevelUp Buddy is 100% offline, your data stays entirely on your phone. Export regular backups to safeguard your progress.
        </p>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={handleExport}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-2xl bg-slate-800/80 hover:bg-slate-750 text-slate-200 text-xs font-bold border border-slate-700/70 transition-transform active:scale-95 light:bg-slate-100 light:text-slate-800 light:border-slate-300"
          >
            <Upload className="w-4 h-4 text-indigo-400" />
            <span>Import Backup</span>
          </button>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/json"
          className="hidden"
        />
      </div>

      {/* Database Management & Templates */}
      <div className="glass-panel p-4 rounded-3xl space-y-3">
        <h3 className="text-xs font-bold text-slate-400 light:text-slate-600 uppercase tracking-wider">
          Database Actions
        </h3>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-xs font-bold text-white light:text-slate-900">
              Starter Suggestions
            </div>
            <div className="text-[11px] text-slate-400 light:text-slate-500">
              Inject recommended productivity templates
            </div>
          </div>
          <button
            onClick={() => setIsSeedConfirmOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700/60 light:bg-slate-100 light:text-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Load Templates</span>
          </button>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-slate-800/60 light:border-slate-200">
          <div>
            <div className="text-xs font-bold text-rose-400">
              Erase All Data
            </div>
            <div className="text-[11px] text-slate-400 light:text-slate-500">
              Permanently wipe all habits, routines, and logs
            </div>
          </div>
          <button
            onClick={() => setIsClearConfirmOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/25"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Data</span>
          </button>
        </div>
      </div>

      {/* Application & Architecture Info */}
      <div className="glass-panel p-4 rounded-3xl space-y-3">
        <h3 className="text-xs font-bold text-slate-400 light:text-slate-600 uppercase tracking-wider">
          App Architecture & Privacy
        </h3>

        <div className="space-y-2 text-xs text-slate-300 light:text-slate-600">
          <div className="flex items-center justify-between py-1 border-b border-slate-800/40 light:border-slate-200">
            <span className="flex items-center space-x-1.5 text-slate-400">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Application</span>
            </span>
            <span className="font-semibold text-white light:text-slate-900">LevelUp Buddy v1.0.0</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800/40 light:border-slate-200">
            <span className="flex items-center space-x-1.5 text-slate-400">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Database Engine</span>
            </span>
            <span className="font-semibold text-white light:text-slate-900">IndexedDB (Dexie v{db.verno || 1})</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800/40 light:border-slate-200">
            <span className="flex items-center space-x-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacy Model</span>
            </span>
            <span className="font-semibold text-emerald-400">100% Offline (Zero Tracking)</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/60 text-[11px] text-slate-400 light:bg-slate-100 light:border-slate-200 light:text-slate-600 leading-relaxed">
          LevelUp Buddy runs entirely on your device with no remote servers, accounts, or background data collection. Your habits, schedules, and analytics remain strictly private to you.
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={isClearConfirmOpen}
        onClose={() => setIsClearConfirmOpen(false)}
        onConfirm={handleExecuteClear}
        title="Wipe All Data?"
        message="This will permanently delete every routine, habit, and completion history on this device. Make sure you export a backup first if you need this data."
        confirmText="Erase Everything"
        isDestructive={true}
      />

      <ConfirmDialog
        isOpen={isImportConfirmOpen}
        onClose={() => {
          setIsImportConfirmOpen(false);
          setImportPendingData(null);
        }}
        onConfirm={handleExecuteImport}
        title="Restore Backup?"
        message="Restoring this backup will replace existing data with the records contained in the JSON file. Are you sure you want to proceed?"
        confirmText="Restore Data"
        isDestructive={false}
      />

      <ConfirmDialog
        isOpen={isSeedConfirmOpen}
        onClose={() => setIsSeedConfirmOpen(false)}
        onConfirm={handleExecuteSeed}
        title="Load Suggested Templates?"
        message="This will add suggested starter routines and habits (Coding, Workout, Spoken English, Hydration) to your app without affecting your existing streak history."
        confirmText="Load Templates"
        isDestructive={false}
      />

      {/* User Manual Modal */}
      <UserManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />
    </div>
  );
}
