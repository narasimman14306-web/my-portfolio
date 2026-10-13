import { db } from '../db/database';
import { getTodayDateString, isRoutineScheduledForDate } from '../utils/dateUtils';
import { parseISO } from 'date-fns';

export const routineService = {
  /**
   * Fetch all routines
   */
  async getAllRoutines() {
    return await db.routines.toArray();
  },

  /**
   * Fetch a single routine by ID
   */
  async getRoutineById(id) {
    return await db.routines.get(Number(id));
  },

  /**
   * Create a new routine
   */
  async createRoutine(routineData) {
    const now = new Date().toISOString();
    const newRoutine = {
      ...routineData,
      isActive: routineData.isActive !== undefined ? (routineData.isActive ? 1 : 0) : 1,
      createdAt: now,
      updatedAt: now
    };
    const id = await db.routines.add(newRoutine);
    return { ...newRoutine, id };
  },

  /**
   * Update an existing routine
   */
  async updateRoutine(id, routineData) {
    const numId = Number(id);
    const existing = await db.routines.get(numId);
    if (!existing) {
      throw new Error(`Routine with id ${id} not found`);
    }

    const updated = {
      ...existing,
      ...routineData,
      isActive: routineData.isActive !== undefined ? (routineData.isActive ? 1 : 0) : existing.isActive,
      updatedAt: new Date().toISOString()
    };

    await db.routines.put(updated);
    return updated;
  },

  /**
   * Delete a routine and its completion records
   */
  async deleteRoutine(id) {
    const numId = Number(id);
    return await db.transaction('rw', db.routines, db.routineCompletions, async () => {
      await db.routineCompletions.where('routineId').equals(numId).delete();
      await db.routines.delete(numId);
    });
  },

  /**
   * Toggle routine active status
   */
  async toggleRoutineActive(id) {
    const numId = Number(id);
    const routine = await db.routines.get(numId);
    if (routine) {
      const newStatus = routine.isActive ? 0 : 1;
      await db.routines.update(numId, {
        isActive: newStatus,
        updatedAt: new Date().toISOString()
      });
      return newStatus;
    }
    return null;
  },

  /**
   * Get routines scheduled for a given date (defaults to today), sorted by startTime
   */
  async getRoutinesForDate(dateString = getTodayDateString()) {
    const dateObj = parseISO(dateString);
    const allRoutines = await db.routines.toArray();
    
    // Filter active and scheduled for this day of week
    const scheduled = allRoutines.filter(r => 
      Boolean(r.isActive) && isRoutineScheduledForDate(r.daysOfWeek, dateObj)
    );

    // Sort chronologically by startTime (e.g. "06:30" < "09:00")
    scheduled.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
    return scheduled;
  },

  /**
   * Get completion records for a specific date
   */
  async getCompletionsForDate(dateString = getTodayDateString()) {
    return await db.routineCompletions.where('date').equals(dateString).toArray();
  },

  /**
   * Check if a routine is completed on a specific date
   */
  async isCompleted(routineId, dateString = getTodayDateString()) {
    const count = await db.routineCompletions
      .where('[routineId+date]')
      .equals([Number(routineId), dateString])
      .count();
    return count > 0;
  },

  /**
   * Mark a routine as completed for a specific date (idempotent, prevents duplicates)
   */
  async markCompleted(routineId, dateString = getTodayDateString()) {
    const numId = Number(routineId);
    const existing = await db.routineCompletions
      .where('[routineId+date]')
      .equals([numId, dateString])
      .first();

    if (!existing) {
      await db.routineCompletions.add({
        routineId: numId,
        date: dateString,
        completedAt: new Date().toISOString()
      });
    }
  },

  /**
   * Undo/remove a routine completion for a date
   */
  async undoCompletion(routineId, dateString = getTodayDateString()) {
    const numId = Number(routineId);
    await db.routineCompletions
      .where('[routineId+date]')
      .equals([numId, dateString])
      .delete();
  }
};
