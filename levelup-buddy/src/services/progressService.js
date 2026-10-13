import { db } from '../db/database';
import { getTodayDateString, getLastNDays, isRoutineScheduledForDate } from '../utils/dateUtils';
import { parseISO } from 'date-fns';
import { habitService } from './habitService';

export const progressService = {
  /**
   * Calculates today's summary metrics for Dashboard
   */
  async getTodaySummary(dateString = getTodayDateString()) {
    const dateObj = parseISO(dateString);

    // Routines scheduled today
    const allRoutines = await db.routines.toArray();
    const scheduledRoutines = allRoutines.filter(r => 
      Boolean(r.isActive) && isRoutineScheduledForDate(r.daysOfWeek, dateObj)
    );
    const routineCompletions = await db.routineCompletions.where('date').equals(dateString).toArray();
    const completedRoutineIds = new Set(routineCompletions.map(c => c.routineId));

    const routinesTotal = scheduledRoutines.length;
    const routinesCompleted = scheduledRoutines.filter(r => completedRoutineIds.has(r.id)).length;
    const routinePercentage = routinesTotal > 0 ? Math.round((routinesCompleted / routinesTotal) * 100) : 0;

    // Habits
    const allHabits = await db.habits.toArray();
    const activeHabits = allHabits.filter(h => Boolean(h.isActive));
    const habitCompletions = await db.habitCompletions.where('date').equals(dateString).toArray();
    const completedHabitIds = new Set(habitCompletions.map(c => c.habitId));

    const habitsTotal = activeHabits.length;
    const habitsCompleted = activeHabits.filter(h => completedHabitIds.has(h.id)).length;
    const habitPercentage = habitsTotal > 0 ? Math.round((habitsCompleted / habitsTotal) * 100) : 0;

    // Overall daily percentage
    const totalItems = routinesTotal + habitsTotal;
    const totalCompleted = routinesCompleted + habitsCompleted;
    const overallPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

    // Habits with streaks
    const habitsWithStats = await habitService.getAllHabitsWithStats(dateString);
    const maxStreak = habitsWithStats.reduce((max, h) => Math.max(max, h.currentStreak || 0), 0);
    const totalCompletionsAllTime = habitsWithStats.reduce((acc, h) => acc + (h.totalCompletions || 0), 0);

    return {
      dateString,
      routinesTotal,
      routinesCompleted,
      routinePercentage,
      habitsTotal,
      habitsCompleted,
      habitPercentage,
      totalItems,
      totalCompleted,
      overallPercentage,
      maxStreak,
      totalCompletionsAllTime
    };
  },

  /**
   * Generates chart data for the last 7 days
   */
  async getWeeklyChartData(numDays = 7, referenceDate = new Date()) {
    const days = getLastNDays(numDays, referenceDate);
    const chartData = [];

    for (const d of days) {
      const routineCount = await db.routineCompletions.where('date').equals(d.dateString).count();
      const habitCount = await db.habitCompletions.where('date').equals(d.dateString).count();

      chartData.push({
        date: d.dateString,
        dayName: d.dayName,
        routines: routineCount,
        habits: habitCount,
        total: routineCount + habitCount
      });
    }

    return chartData;
  },

  /**
   * Generates comprehensive progress data for the Analytics screen
   */
  async getFullAnalyticsData() {
    const todayStr = getTodayDateString();
    const weeklyData = await this.getWeeklyChartData(7);
    const monthlyData = await this.getWeeklyChartData(30);

    const habitsWithStats = await habitService.getAllHabitsWithStats(todayStr);
    const totalRoutineCompletions = await db.routineCompletions.count();
    const totalHabitCompletions = await db.habitCompletions.count();

    // Best performing habit
    let bestHabit = null;
    if (habitsWithStats.length > 0) {
      bestHabit = [...habitsWithStats].sort((a, b) => (b.bestStreak || 0) - (a.bestStreak || 0))[0];
    }

    // Category breakdown
    const categoryMap = {};
    for (const h of habitsWithStats) {
      const cat = h.category || 'General';
      categoryMap[cat] = (categoryMap[cat] || 0) + (h.totalCompletions || 0);
    }
    const categoryBreakdown = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value
    }));

    return {
      weeklyData,
      monthlyData,
      habitsWithStats,
      totalRoutineCompletions,
      totalHabitCompletions,
      totalCompletionsAllTime: totalRoutineCompletions + totalHabitCompletions,
      bestHabit,
      categoryBreakdown
    };
  }
};
