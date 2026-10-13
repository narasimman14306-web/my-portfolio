import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GreetingCard from '../components/dashboard/GreetingCard';
import FitnessTrackerCard from '../components/dashboard/FitnessTrackerCard';
import WaterTrackerCard from '../components/dashboard/WaterTrackerCard';
import EnglishFluencyCard from '../components/dashboard/EnglishFluencyCard';
import DailyReflectionCard from '../components/dashboard/DailyReflectionCard';
import LogActivityModal from '../components/dashboard/LogActivityModal';
import FocusTimerModal from '../components/dashboard/FocusTimerModal';
import ExpenseModal from '../components/dashboard/ExpenseModal';
import TodayRoutineList from '../components/dashboard/TodayRoutineList';
import TodayHabitList from '../components/dashboard/TodayHabitList';
import WeeklyProductivityChart from '../components/charts/WeeklyProductivityChart';
import RoutineFormModal from '../components/routine/RoutineFormModal';
import HabitFormModal from '../components/habits/HabitFormModal';
import UserManualModal from '../components/common/UserManualModal';
import { routineService } from '../services/routineService';
import { habitService } from '../services/habitService';
import { progressService } from '../services/progressService';
import { fitnessService } from '../services/fitnessService';
import { lifeToolsService } from '../services/lifeToolsService';
import { notificationService } from '../services/notificationService';
import { seedStarterSuggestions } from '../db/seed';
import { getTodayDateString, formatTimeDisplay } from '../utils/dateUtils';
import {
  Plus,
  Sparkles,
  BookOpen,
  Bell,
  BellRing,
  Clock,
  LayoutGrid,
  List,
  Target,
  Timer,
  Wallet
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [fitnessData, setFitnessData] = useState(null);
  const [waterData, setWaterData] = useState(null);
  const [todayRoutines, setTodayRoutines] = useState([]);
  const [todayCompletedRoutineIds, setTodayCompletedRoutineIds] = useState(new Set());
  const [todayHabits, setTodayHabits] = useState([]);
  const [weeklyChartData, setWeeklyChartData] = useState([]);

  // Full Details view toggle
  const [showFullDetails, setShowFullDetails] = useState(true);

  // Modals
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isLogActivityModalOpen, setIsLogActivityModalOpen] = useState(false);
  const [isFocusModalOpen, setIsFocusModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Notification status
  const [hasNotifPermission, setHasNotifPermission] = useState(false);
  const [notifMessage, setNotifMessage] = useState(null);

  const loadDashboardData = useCallback(async () => {
    try {
      const today = getTodayDateString();

      // 1. Load Summary
      const sum = await progressService.getTodaySummary(today);
      setSummary(sum);

      // 2. Load Fitness steps & distance data
      const fit = await fitnessService.getTodaySummary(today);
      setFitnessData(fit);

      // 3. Load Water Hydration data
      const water = await lifeToolsService.getTodayWater(today);
      setWaterData(water);

      // 4. Load Today Routines
      const scheduled = await routineService.getRoutinesForDate(today);
      setTodayRoutines(scheduled);

      // 5. Routine completions
      const completions = await routineService.getCompletionsForDate(today);
      setTodayCompletedRoutineIds(new Set(completions.map((c) => c.routineId)));

      // 6. Load Habits with stats
      const habits = await habitService.getAllHabitsWithStats(today);
      setTodayHabits(habits.filter((h) => Boolean(h.isActive)));

      // 7. Weekly chart
      const chart = await progressService.getWeeklyChartData(7);
      setWeeklyChartData(chart);

      // 8. Check notification permissions
      const granted = await notificationService.hasPermission();
      setHasNotifPermission(granted);

      // Sync active routine notification alarms
      if (granted && scheduled.length > 0) {
        notificationService.syncRoutineNotifications(scheduled);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Request notifications permission
  const handleEnableNotifications = async () => {
    const granted = await notificationService.requestPermission();
    setHasNotifPermission(granted);
    if (granted) {
      await notificationService.syncRoutineNotifications(todayRoutines);
      await notificationService.sendInstantNotification(
        '🔔 LevelUp Buddy Alerts Enabled',
        'You will now receive timing reminders for all your scheduled daily routines!'
      );
      setNotifMessage('Notification reminders activated!');
    } else {
      setNotifMessage('Notifications were declined or unavailable.');
    }
    setTimeout(() => setNotifMessage(null), 4000);
  };

  // Find next upcoming routine for today
  const nextUpcomingRoutine = useMemo(() => {
    if (!todayRoutines || todayRoutines.length === 0) return null;
    const now = new Date();
    const currentHM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const upcoming = todayRoutines.find(
      (r) => !todayCompletedRoutineIds.has(r.id) && r.startTime >= currentHM
    );
    return upcoming || null;
  }, [todayRoutines, todayCompletedRoutineIds]);

  // Handle Routine toggle
  const handleToggleRoutine = async (routineId, currentlyDone) => {
    const today = getTodayDateString();
    if (currentlyDone) {
      await routineService.undoCompletion(routineId, today);
    } else {
      await routineService.markCompleted(routineId, today);
    }
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadDashboardData();
  };

  // Handle Habit toggle
  const handleToggleHabit = async (habitId, currentlyDone) => {
    const today = getTodayDateString();
    if (currentlyDone) {
      await habitService.undoCompletion(habitId, today);
    } else {
      await habitService.markCompleted(habitId, today);
    }
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadDashboardData();
  };

  // Handle Fitness quick add
  const handleQuickAddSteps = async (amount) => {
    await fitnessService.logActivity({
      steps: amount,
      type: 'walk'
    });
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadDashboardData();
  };

  // Handle Save Fitness session
  const handleSaveActivity = async (entry) => {
    await fitnessService.logActivity(entry);
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadDashboardData();
  };

  // Handle Water glasses
  const handleAddWater = async () => {
    await lifeToolsService.addWaterGlass();
    await loadDashboardData();
  };

  const handleRemoveWater = async () => {
    await lifeToolsService.removeWaterGlass();
    await loadDashboardData();
  };

  // Handle Save Focus Session
  const handleSaveFocusSession = async (mins, task) => {
    await lifeToolsService.logFocusSession(mins, task);
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadDashboardData();
  };

  // Save new routine
  const handleSaveRoutine = async (data) => {
    await routineService.createRoutine(data);
    if (hasNotifPermission) {
      const allScheduled = await routineService.getRoutinesForDate(getTodayDateString());
      await notificationService.syncRoutineNotifications(allScheduled);
    }
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadDashboardData();
  };

  // Save new habit
  const handleSaveHabit = async (data) => {
    await habitService.createHabit(data);
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadDashboardData();
  };

  // Quick Seed Starters if user has no items
  const handleSeedStarters = async () => {
    await seedStarterSuggestions();
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadDashboardData();
  };

  const isBrandNewUser = todayRoutines.length === 0 && todayHabits.length === 0 && !loading;

  return (
    <div className="space-y-4 animate-fade-in pb-4">
      {/* Top Utility Bar: Manual, Focus Timer, Expenses, Notifications, View Toggle */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setIsManualModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/30 text-xs font-bold transition-all active:scale-95 shadow-sm whitespace-nowrap light:bg-indigo-50 light:text-indigo-700 light:border-indigo-200"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Manual</span>
        </button>

        <button
          onClick={() => setIsFocusModalOpen(true)}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-400 border border-purple-500/30 text-xs font-bold transition-all active:scale-95 whitespace-nowrap light:bg-purple-50 light:text-purple-700 light:border-purple-200"
        >
          <Timer className="w-3.5 h-3.5" />
          <span>Focus Mode</span>
        </button>

        <button
          onClick={() => setIsExpenseModalOpen(true)}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all active:scale-95 whitespace-nowrap light:bg-amber-50 light:text-amber-800 light:border-amber-200"
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>Expenses</span>
        </button>

        {/* Notification Button */}
        <button
          onClick={handleEnableNotifications}
          className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
            hasNotifPermission
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200'
              : 'bg-amber-500/15 text-amber-400 border-amber-500/30 animate-pulse light:bg-amber-50 light:text-amber-800'
          }`}
          title={hasNotifPermission ? 'Timing Notifications Active' : 'Enable Timing Notifications'}
        >
          {hasNotifPermission ? <BellRing className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
          <span>{hasNotifPermission ? 'Alerts On' : 'Alerts'}</span>
        </button>

        {/* Details Toggle */}
        <button
          onClick={() => setShowFullDetails(!showFullDetails)}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] text-xs font-medium light:bg-white light:text-slate-700 light:border-slate-300 shadow-sm whitespace-nowrap"
          title="Toggle Detailed View"
        >
          {showFullDetails ? <List className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
          <span>{showFullDetails ? 'Details' : 'Compact'}</span>
        </button>
      </div>

      {/* Notification Toast Feedback */}
      {notifMessage && (
        <div className="p-3 rounded-2xl bg-indigo-600/90 text-white text-xs font-semibold flex items-center space-x-2 animate-fade-in shadow-lg shadow-indigo-600/30">
          <BellRing className="w-4 h-4 shrink-0" />
          <span>{notifMessage}</span>
        </div>
      )}

      {/* Header Greeting & Today Summary */}
      <GreetingCard summary={summary} />

      {/* 🏃‍♂️ Daily Morning Walk & Running Tracker */}
      <FitnessTrackerCard
        fitnessData={fitnessData}
        onQuickAddSteps={handleQuickAddSteps}
        onOpenLogModal={() => setIsLogActivityModalOpen(true)}
      />

      {/* 💧 Water Hydration Tracker */}
      <WaterTrackerCard
        waterData={waterData}
        onAddGlass={handleAddWater}
        onRemoveGlass={handleRemoveWater}
      />

      {/* 🗣️ Spoken English • Phrase of the Day Card */}
      <EnglishFluencyCard />

      {/* Next Upcoming Routine Banner (Full Details Feature) */}
      {nextUpcomingRoutine && (
        <div className="p-3.5 rounded-2xl glass-panel border border-indigo-500/30 bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/40 light:from-indigo-50/90 light:to-purple-50/90 light:border-indigo-200 flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase font-bold text-indigo-400 light:text-indigo-600 tracking-wider">
                Next Upcoming Routine
              </div>
              <div className="text-xs font-bold text-white light:text-slate-900 truncate">
                {nextUpcomingRoutine.title}
              </div>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 light:bg-indigo-100 light:text-indigo-800 text-xs font-bold shrink-0">
            {formatTimeDisplay(nextUpcomingRoutine.startTime)}
          </div>
        </div>
      )}

      {/* Brand new user starter prompt */}
      {isBrandNewUser && (
        <div className="glass-panel p-5 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-purple-950/30 text-center light:from-indigo-50 light:to-purple-50">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 mx-auto flex items-center justify-center mb-2.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white light:text-slate-900 mb-1">
            Welcome to LevelUp Buddy!
          </h4>
          <p className="text-xs text-slate-300 light:text-slate-600 max-w-xs mx-auto mb-3.5 leading-relaxed">
            Start leveling up your life today. Would you like to load suggested routines & habits or build from scratch?
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleSeedStarters}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
            >
              Load Starter Templates
            </button>
          </div>
        </div>
      )}

      {/* Routine Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-400 light:text-slate-600 uppercase tracking-wider">
            Today's Routine Schedule
          </h3>
          <span className="text-[11px] text-slate-500 light:text-slate-600">
            {todayCompletedRoutineIds.size} of {todayRoutines.length} completed
          </span>
        </div>
        <button
          onClick={() => setIsRoutineModalOpen(true)}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-indigo-400 hover:text-indigo-300 text-xs font-semibold border border-slate-700/60 transition-colors light:bg-white light:text-indigo-600 light:border-slate-300 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Routine</span>
        </button>
      </div>

      {/* Today's Routines */}
      <TodayRoutineList
        routines={todayRoutines}
        completedIds={todayCompletedRoutineIds}
        onToggleComplete={handleToggleRoutine}
        onNavigateToRoutine={() => navigate('/routine')}
      />

      {/* Habits Section Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h3 className="text-xs font-bold text-slate-400 light:text-slate-600 uppercase tracking-wider">
            Today's Habit Checklist
          </h3>
          <span className="text-[11px] text-slate-500 light:text-slate-600">
            {todayHabits.filter((h) => h.isCompletedToday).length} of {todayHabits.length} checked
          </span>
        </div>
        <button
          onClick={() => setIsHabitModalOpen(true)}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-pink-400 hover:text-pink-300 text-xs font-semibold border border-slate-700/60 transition-colors light:bg-white light:text-pink-600 light:border-slate-300 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Habit</span>
        </button>
      </div>

      <TodayHabitList
        habits={todayHabits}
        onToggleComplete={handleToggleHabit}
        onNavigateToHabits={() => navigate('/habits')}
      />

      {/* 🧠 Evening Win & Mood Journal */}
      <DailyReflectionCard />

      {/* Detailed Full Breakdown Card (when Full Details is active) */}
      {showFullDetails && (
        <div className="glass-panel p-4 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white light:text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Full Daily Breakdown</span>
            </h4>
            <span className="text-[10px] font-semibold text-slate-400 light:text-slate-600">Live Status</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-slate-800/50 border border-slate-700/40 light:bg-slate-50 light:border-slate-200">
              <div className="text-[10px] text-slate-400 light:text-slate-600 font-medium">Pending Tasks</div>
              <div className="text-base font-extrabold text-amber-400 light:text-amber-600 mt-0.5">
                {Math.max(0, todayRoutines.length - todayCompletedRoutineIds.size)}
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-800/50 border border-slate-700/40 light:bg-slate-50 light:border-slate-200">
              <div className="text-[10px] text-slate-400 light:text-slate-600 font-medium">Active Habits</div>
              <div className="text-base font-extrabold text-pink-400 light:text-pink-600 mt-0.5">
                {todayHabits.length}
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-800/50 border border-slate-700/40 light:bg-slate-50 light:border-slate-200">
              <div className="text-[10px] text-slate-400 light:text-slate-600 font-medium">Streak Status</div>
              <div className="text-base font-extrabold text-emerald-400 light:text-emerald-600 mt-0.5">
                {summary?.maxStreak || 0}d🔥
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Productivity Trend */}
      <div className="pt-2">
        <WeeklyProductivityChart data={weeklyChartData} />
      </div>

      {/* Routine Modal */}
      <RoutineFormModal
        isOpen={isRoutineModalOpen}
        onClose={() => setIsRoutineModalOpen(false)}
        onSave={handleSaveRoutine}
      />

      {/* Habit Modal */}
      <HabitFormModal
        isOpen={isHabitModalOpen}
        onClose={() => setIsHabitModalOpen(false)}
        onSave={handleSaveHabit}
      />

      {/* User Manual Modal */}
      <UserManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />

      {/* Log Activity Modal */}
      <LogActivityModal
        isOpen={isLogActivityModalOpen}
        onClose={() => setIsLogActivityModalOpen(false)}
        onSave={handleSaveActivity}
      />

      {/* Focus Timer Modal */}
      <FocusTimerModal
        isOpen={isFocusModalOpen}
        onClose={() => setIsFocusModalOpen(false)}
        onSaveSession={handleSaveFocusSession}
      />

      {/* Expense Modal */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onUpdated={loadDashboardData}
      />
    </div>
  );
}
