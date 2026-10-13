import Dexie from 'dexie';

export class LevelUpDatabase extends Dexie {
  constructor() {
    super('LevelUpBuddyDB');

    // Schema version 1
    this.version(1).stores({
      routines: '++id, category, priority, isActive, createdAt',
      routineCompletions: '++id, routineId, date, [routineId+date]',
      habits: '++id, category, isActive, createdAt',
      habitCompletions: '++id, habitId, date, [habitId+date]',
      settings: 'key'
    });

    // Schema version 2: Walking & Running Fitness
    this.version(2).stores({
      fitnessLogs: '++id, date, type, createdAt'
    });

    // Schema version 3: Hydration, Focus Sessions, Mood/Reflection & Expense Tracker
    this.version(3).stores({
      waterLogs: '++id, date',
      focusSessions: '++id, date, completedAt',
      moodLogs: '++id, date, mood',
      expenseLogs: '++id, date, category, createdAt'
    });
  }
}

export const db = new LevelUpDatabase();
