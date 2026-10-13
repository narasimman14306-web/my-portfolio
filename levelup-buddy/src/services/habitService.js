import { db } from '../db/database';
import { getTodayDateString } from '../utils/dateUtils';
import { calculateHabitStats } from '../utils/streakUtils';

export const habitService = {
  /**
   * Fetch all habits
   */
  async getAllHabits() {
    return await db.habits.toArray();
  },

  /**
   * Fetch a single habit by ID
   */
  async getHabitById(id) {
    return await db.habits.get(Number(id));
  },

  /**
   * Create a new habit
   */
  async createHabit(habitData) {
    const now = new Date().toISOString();
    const newHabit = {
      ...habitData,
      isActive: habitData.isActive !== undefined ? (habitData.isActive ? 1 : 0) : 1,
      createdAt: now,
      updatedAt: now
    };
    const id = await db.habits.add(newHabit);
    return { ...newHabit, id };
  },

  /**
   * Update an existing habit
   */
  async updateHabit(id, habitData) {
    const numId = Number(id);
    const existing = await db.habits.get(numId);
    if (!existing) {
      throw new Error(`Habit with id ${id} not found`);
    }

    const updated = {
      ...existing,
      ...habitData,
      isActive: habitData.isActive !== undefined ? (habitData.isActive ? 1 : 0) : existing.isActive,
      updatedAt: new Date().toISOString()
    };

    await db.habits.put(updated);
    return updated;
  },

  /**
   * Delete a habit and its completions
   */
  async deleteHabit(id) {
    const numId = Number(id);
    return await db.transaction('rw', db.habits, db.habitCompletions, async () => {
      await db.habitCompletions.where('habitId').equals(numId).delete();
      await db.habits.delete(numId);
    });
  },

  /**
   * Toggle habit active status
   */
  async toggleHabitActive(id) {
    const numId = Number(id);
    const habit = await db.habits.get(numId);
    if (habit) {
      const newStatus = habit.isActive ? 0 : 1;
      await db.habits.update(numId, {
        isActive: newStatus,
        updatedAt: new Date().toISOString()
      });
      return newStatus;
    }
    return null;
  },

  /**
   * Get all completion records for a specific habit
   */
  async getCompletionsForHabit(habitId) {
    const numId = Number(habitId);
    return await db.habitCompletions.where('habitId').equals(numId).toArray();
  },

  /**
   * Get all completion records for a specific date
   */
  async getCompletionsForDate(dateString = getTodayDateString()) {
    return await db.habitCompletions.where('date').equals(dateString).toArray();
  },

  /**
   * Check if a habit is completed on a specific date
   */
  async isCompleted(habitId, dateString = getTodayDateString()) {
    const count = await db.habitCompletions
      .where('[habitId+date]')
      .equals([Number(habitId), dateString])
      .count();
    return count > 0;
  },

  /**
   * Mark habit completed for a date (idempotent, prevents duplicates)
   */
  async markCompleted(habitId, dateString = getTodayDateString()) {
    const numId = Number(habitId);
    const existing = await db.habitCompletions
      .where('[habitId+date]')
      .equals([numId, dateString])
      .first();

    if (!existing) {
      await db.habitCompletions.add({
        habitId: numId,
        date: dateString,
        completedAt: new Date().toISOString()
      });
    }
  },

  /**
   * Undo/remove habit completion for a date
   */
  async undoCompletion(habitId, dateString = getTodayDateString()) {
    const numId = Number(habitId);
    await db.habitCompletions
      .where('[habitId+date]')
      .equals([numId, dateString])
      .delete();
  },

  /**
   * Fetch all habits along with their computed stats (streaks, total, completedToday)
   */
  async getAllHabitsWithStats(referenceDate = getTodayDateString()) {
    const habits = await db.habits.toArray();
    const allCompletions = await db.habitCompletions.toArray();

    // Group completions by habitId
    const completionsByHabit = new Map();
    for (const c of allCompletions) {
      if (!completionsByHabit.has(c.habitId)) {
        completionsByHabit.set(c.habitId, []);
      }
      completionsByHabit.get(c.habitId).push(c.date);
    }

    return habits.map(habit => {
      const dates = completionsByHabit.get(habit.id) || [];
      const stats = calculateHabitStats(dates, referenceDate);
      const isCompletedToday = dates.includes(referenceDate);

      return {
        ...habit,
        ...stats,
        isCompletedToday,
        completionHistory: dates
      };
    });
  }
};
