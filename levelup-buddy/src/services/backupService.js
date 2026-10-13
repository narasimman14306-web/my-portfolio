import { db } from '../db/database';
import { validateBackupJson } from '../utils/validation';
import { getTodayDateString } from '../utils/dateUtils';

export const backupService = {
  /**
   * Export all database records into a JSON backup object
   */
  async exportBackup() {
    const routines = await db.routines.toArray();
    const routineCompletions = await db.routineCompletions.toArray();
    const habits = await db.habits.toArray();
    const habitCompletions = await db.habitCompletions.toArray();
    const fitnessLogs = (await db.fitnessLogs?.toArray()) || [];
    const waterLogs = (await db.waterLogs?.toArray()) || [];
    const focusSessions = (await db.focusSessions?.toArray()) || [];
    const moodLogs = (await db.moodLogs?.toArray()) || [];
    const expenseLogs = (await db.expenseLogs?.toArray()) || [];
    const settings = await db.settings.toArray();

    const backupData = {
      appName: 'LevelUp Buddy',
      version: db.verno || 3,
      exportedAt: new Date().toISOString(),
      data: {
        routines,
        routineCompletions,
        habits,
        habitCompletions,
        fitnessLogs,
        waterLogs,
        focusSessions,
        moodLogs,
        expenseLogs,
        settings
      },
      // Flat references for schema validator compatibility
      routines,
      routineCompletions,
      habits,
      habitCompletions,
      fitnessLogs,
      waterLogs,
      focusSessions,
      moodLogs,
      expenseLogs,
      settings
    };

    const jsonString = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const fileName = `levelup-buddy-backup-${getTodayDateString()}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return {
      success: true,
      fileName,
      totalRecords:
        routines.length +
        habits.length +
        routineCompletions.length +
        habitCompletions.length +
        fitnessLogs.length +
        waterLogs.length +
        focusSessions.length +
        moodLogs.length +
        expenseLogs.length
    };
  },

  /**
   * Validate and import a backup JSON object
   */
  async importBackup(jsonData) {
    const validation = validateBackupJson(jsonData);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid backup file structure.');
    }

    const {
      routines,
      routineCompletions,
      habits,
      habitCompletions,
      fitnessLogs = [],
      waterLogs = [],
      focusSessions = [],
      moodLogs = [],
      expenseLogs = [],
      settings = []
    } = jsonData;

    // Use transaction to atomically replace data
    await db.transaction(
      'rw',
      [
        db.routines,
        db.routineCompletions,
        db.habits,
        db.habitCompletions,
        db.fitnessLogs,
        db.waterLogs,
        db.focusSessions,
        db.moodLogs,
        db.expenseLogs,
        db.settings
      ],
      async () => {
        // Clear existing records
        await db.routines.clear();
        await db.routineCompletions.clear();
        await db.habits.clear();
        await db.habitCompletions.clear();
        if (db.fitnessLogs) await db.fitnessLogs.clear();
        if (db.waterLogs) await db.waterLogs.clear();
        if (db.focusSessions) await db.focusSessions.clear();
        if (db.moodLogs) await db.moodLogs.clear();
        if (db.expenseLogs) await db.expenseLogs.clear();

        // Bulk add new records
        if (routines.length > 0) await db.routines.bulkAdd(routines);
        if (routineCompletions.length > 0) await db.routineCompletions.bulkAdd(routineCompletions);
        if (habits.length > 0) await db.habits.bulkAdd(habits);
        if (habitCompletions.length > 0) await db.habitCompletions.bulkAdd(habitCompletions);
        if (fitnessLogs.length > 0 && db.fitnessLogs) await db.fitnessLogs.bulkAdd(fitnessLogs);
        if (waterLogs.length > 0 && db.waterLogs) await db.waterLogs.bulkAdd(waterLogs);
        if (focusSessions.length > 0 && db.focusSessions) await db.focusSessions.bulkAdd(focusSessions);
        if (moodLogs.length > 0 && db.moodLogs) await db.moodLogs.bulkAdd(moodLogs);
        if (expenseLogs.length > 0 && db.expenseLogs) await db.expenseLogs.bulkAdd(expenseLogs);
        if (Array.isArray(settings) && settings.length > 0) {
          await db.settings.clear();
          await db.settings.bulkAdd(settings);
        }
      }
    );

    return {
      success: true,
      routinesCount: routines.length,
      habitsCount: habits.length,
      routineCompletionsCount: routineCompletions.length,
      habitCompletionsCount: habitCompletions.length,
      fitnessLogsCount: fitnessLogs.length,
      waterLogsCount: waterLogs.length
    };
  },

  /**
   * Clear all records from the database
   */
  async clearAllData() {
    await db.transaction(
      'rw',
      [
        db.routines,
        db.routineCompletions,
        db.habits,
        db.habitCompletions,
        db.fitnessLogs,
        db.waterLogs,
        db.focusSessions,
        db.moodLogs,
        db.expenseLogs,
        db.settings
      ],
      async () => {
        await db.routines.clear();
        await db.routineCompletions.clear();
        await db.habits.clear();
        await db.habitCompletions.clear();
        if (db.fitnessLogs) await db.fitnessLogs.clear();
        if (db.waterLogs) await db.waterLogs.clear();
        if (db.focusSessions) await db.focusSessions.clear();
        if (db.moodLogs) await db.moodLogs.clear();
        if (db.expenseLogs) await db.expenseLogs.clear();
        await db.settings.clear();
      }
    );
    return { success: true };
  }
};
