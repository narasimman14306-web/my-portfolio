import { db } from '../db/database';
import { getTodayDateString, getLastNDays } from '../utils/dateUtils';

export const fitnessService = {
  /**
   * Get fitness summary for today
   */
  async getTodaySummary(dateString = getTodayDateString()) {
    const logs = await db.fitnessLogs.where('date').equals(dateString).toArray();

    const totalSteps = logs.reduce((sum, item) => sum + (Number(item.steps) || 0), 0);
    const totalDistance = logs.reduce((sum, item) => sum + (Number(item.distanceKm) || 0), 0);
    const totalDuration = logs.reduce((sum, item) => sum + (Number(item.durationMins) || 0), 0);
    const totalCalories = logs.reduce((sum, item) => sum + (Number(item.calories) || 0), 0);

    return {
      date: dateString,
      steps: totalSteps,
      distanceKm: parseFloat(totalDistance.toFixed(2)),
      durationMins: totalDuration,
      calories: Math.round(totalCalories),
      logs
    };
  },

  /**
   * Log a walk, run, or daily step session
   */
  async logActivity({
    date = getTodayDateString(),
    type = 'walk',
    steps = 0,
    distanceKm = 0,
    durationMins = 0,
    calories = 0,
    notes = ''
  }) {
    let finalSteps = Number(steps) || 0;
    let finalDistance = Number(distanceKm) || 0;
    let finalDuration = Number(durationMins) || 0;
    let finalCalories = Number(calories) || 0;

    // Smart conversions if one is provided
    if (finalSteps > 0 && finalDistance === 0) {
      finalDistance = parseFloat((finalSteps * 0.00076).toFixed(2));
    } else if (finalDistance > 0 && finalSteps === 0) {
      finalSteps = Math.round(finalDistance * 1315);
    }

    if (finalCalories === 0 && finalSteps > 0) {
      finalCalories = Math.round(finalSteps * 0.04);
    }

    const entry = {
      date,
      type,
      steps: finalSteps,
      distanceKm: finalDistance,
      durationMins: finalDuration,
      calories: finalCalories,
      notes,
      createdAt: new Date().toISOString()
    };

    const id = await db.fitnessLogs.add(entry);
    return { ...entry, id };
  },

  /**
   * Get weekly walking/running trend for the last 7 days
   */
  async getWeeklyDistanceChart() {
    const days = getLastNDays(7);
    const chartData = [];

    for (const d of days) {
      const logs = await db.fitnessLogs.where('date').equals(d.dateString).toArray();
      const dist = logs.reduce((sum, i) => sum + (Number(i.distanceKm) || 0), 0);
      const steps = logs.reduce((sum, i) => sum + (Number(i.steps) || 0), 0);

      chartData.push({
        dayName: d.dayName,
        date: d.dateString,
        distanceKm: parseFloat(dist.toFixed(2)),
        steps
      });
    }

    return chartData;
  },

  /**
   * Delete an entry
   */
  async deleteLog(id) {
    await db.fitnessLogs.delete(Number(id));
  }
};
