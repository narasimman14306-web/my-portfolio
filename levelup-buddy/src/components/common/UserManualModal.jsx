import React, { useState } from 'react';
import Modal from './Modal';
import {
  BookOpen,
  CalendarCheck,
  Zap,
  TrendingUp,
  Bell,
  HardDrive,
  CheckCircle2,
  HelpCircle,
  Smartphone,
  ShieldCheck
} from 'lucide-react';

const SECTIONS = [
  { id: 'overview', title: '1. Overview', icon: BookOpen },
  { id: 'routine', title: '2. Daily Routines', icon: CalendarCheck },
  { id: 'habits', title: '3. Habit Streaks', icon: Zap },
  { id: 'notifications', title: '4. Timing & Alerts', icon: Bell },
  { id: 'analytics', title: '5. Analytics', icon: TrendingUp },
  { id: 'backup', title: '6. Backup & APK', icon: HardDrive }
];

export default function UserManualModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📖 LevelUp Buddy — User Manual">
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800 pb-2.5 light:border-slate-200">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isSelected = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveTab(sec.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 light:bg-slate-100 light:text-slate-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-3 text-xs text-slate-300 light:text-slate-700 leading-relaxed">
            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 light:bg-indigo-50 light:border-indigo-200 light:text-indigo-900">
              <h4 className="font-bold text-sm text-white light:text-indigo-950 mb-1 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Small Steps. Better You.</span>
              </h4>
              LevelUp Buddy helps you build life discipline across fitness, career, spoken English, and mental wellness in a completely private, 100% offline environment.
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white light:text-slate-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Core Principles:</span>
              </h5>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 light:text-slate-600">
                <li><strong>Zero Internet Needed:</strong> Everything runs locally on IndexedDB.</li>
                <li><strong>No Accounts or Ads:</strong> You open the app and instantly start using it.</li>
                <li><strong>Permanent Privacy:</strong> Your personal data never leaves your smartphone.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Daily Routines */}
        {activeTab === 'routine' && (
          <div className="space-y-3 text-xs text-slate-300 light:text-slate-700 leading-relaxed">
            <h4 className="font-bold text-sm text-white light:text-slate-900">
              How Daily Routines Work
            </h4>
            <div className="space-y-2">
              <p>
                Routines are time-anchored events that structure your day (e.g., Morning Workout at 06:30 AM, Deep Work at 09:30 AM).
              </p>
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 light:bg-slate-100 light:border-slate-200">
                <div className="font-semibold text-white light:text-slate-900">Key Features:</div>
                <ul className="list-disc pl-4 space-y-1 text-slate-400 light:text-slate-600">
                  <li><strong>Start & End Time:</strong> Set precise 12h/24h schedule windows.</li>
                  <li><strong>Active Days:</strong> Select individual days or use shortcuts like "Everyday" or "Weekdays".</li>
                  <li><strong>Independent Daily Checks:</strong> Checking a task complete today will never mark future days complete.</li>
                  <li><strong>Undo Support:</strong> Accidentally checked a task? Click the checkbox again to undo.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Habit Streaks */}
        {activeTab === 'habits' && (
          <div className="space-y-3 text-xs text-slate-300 light:text-slate-700 leading-relaxed">
            <h4 className="font-bold text-sm text-white light:text-slate-900">
              Habit Streaks & Consistency
            </h4>
            <p>
              Habits are atomic actions you perform daily (e.g., Practice Spoken English, Read 15 mins, No Phone Scrolling).
            </p>
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 light:bg-slate-100 light:border-slate-200">
              <div className="font-semibold text-white light:text-slate-900">Streak Calculation Rules:</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 light:text-slate-600">
                <li><strong>Current Streak:</strong> Counts consecutive days. If completed today or yesterday, your streak remains alive!</li>
                <li><strong>Missed Days:</strong> If you miss 2 consecutive days, the active streak resets to 0.</li>
                <li><strong>Best Streak (Trophy):</strong> Remembers your highest-ever streak record forever.</li>
                <li><strong>7-Day Mini Dots:</strong> Under each habit card, 7 dots show your consistency over the last week.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Timing & Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-3 text-xs text-slate-300 light:text-slate-700 leading-relaxed">
            <h4 className="font-bold text-sm text-white light:text-slate-900">
              Timing Reminders & Notifications
            </h4>
            <p>
              LevelUp Buddy triggers reminders right when your scheduled routine time arrives.
            </p>
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 light:bg-slate-100 light:border-slate-200">
              <div className="font-semibold text-white light:text-slate-900">How to Setup:</div>
              <ol className="list-decimal pl-4 space-y-1 text-slate-400 light:text-slate-600">
                <li>Go to <strong>Settings</strong> or tap the <strong>Enable Notifications</strong> banner.</li>
                <li>Allow notification permission when prompted by your phone or browser.</li>
                <li>When you create a routine with a <strong>Start Time</strong> (e.g., 07:00), the app automatically schedules a notification for that exact time on the active days.</li>
              </ol>
            </div>
          </div>
        )}

        {/* Tab 5: Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-3 text-xs text-slate-300 light:text-slate-700 leading-relaxed">
            <h4 className="font-bold text-sm text-white light:text-slate-900">
              Dashboard & Analytics Charts
            </h4>
            <ul className="list-disc pl-4 space-y-2 text-slate-400 light:text-slate-600">
              <li><strong>Progress Ring:</strong> Shows overall percentage of scheduled routines and active habits completed today.</li>
              <li><strong>Weekly Activity:</strong> Stacked bar chart showing total completed routines vs habits for each day of the last 7 days.</li>
              <li><strong>30-Day Momentum:</strong> Area chart visualizing your consistency curve across the month.</li>
              <li><strong>Star Habit:</strong> Identifies and celebrates your best-performing habit.</li>
            </ul>
          </div>
        )}

        {/* Tab 6: Backup & APK */}
        {activeTab === 'backup' && (
          <div className="space-y-3 text-xs text-slate-300 light:text-slate-700 leading-relaxed">
            <h4 className="font-bold text-sm text-white light:text-slate-900">
              Data Backup & Android APK
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1 light:bg-slate-100 light:border-slate-200">
                <span className="font-semibold text-white light:text-slate-900">Export / Restore:</span>
                <p className="text-slate-400 light:text-slate-600">
                  In <strong>Settings</strong>, click <strong>Export Backup</strong> to save a complete `.json` file to your Downloads folder. To restore on another phone, click <strong>Import Backup</strong> and select the file.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1 light:bg-slate-100 light:border-slate-200">
                <span className="font-semibold text-white light:text-slate-900">Android APK Build:</span>
                <p className="text-slate-400 light:text-slate-600">
                  Run <code>npm run cap:open</code> to open Android Studio, then select <strong>Build ➡️ Build APK(s)</strong>. The resulting `.apk` will be in <code>android/app/build/outputs/apk/debug/app-debug.apk</code>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="pt-3 border-t border-slate-800 light:border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-transform active:scale-95 shadow-md shadow-indigo-600/30"
          >
            Got it, Let's Level Up!
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Sparkles(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  );
}
