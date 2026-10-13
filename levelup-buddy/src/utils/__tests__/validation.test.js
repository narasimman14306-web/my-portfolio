import { describe, it, expect } from 'vitest';
import { validateRoutine, validateHabit, validateBackupJson } from '../validation';

describe('validation', () => {
  it('validates a valid routine', () => {
    const routine = {
      title: 'Morning Run',
      category: 'Fitness',
      startTime: '06:30',
      daysOfWeek: [1, 2, 3]
    };
    const res = validateRoutine(routine);
    expect(res.isValid).toBe(true);
    expect(res.errors).toEqual({});
  });

  it('detects missing fields in routine', () => {
    const res = validateRoutine({ title: '', daysOfWeek: [] });
    expect(res.isValid).toBe(false);
    expect(res.errors.title).toBeDefined();
    expect(res.errors.category).toBeDefined();
    expect(res.errors.startTime).toBeDefined();
  });

  it('validates a valid habit', () => {
    const habit = {
      name: 'Read 15 Mins',
      category: 'Learning',
      targetFrequency: 'daily'
    };
    const res = validateHabit(habit);
    expect(res.isValid).toBe(true);
  });

  it('detects short or empty habit name', () => {
    const res = validateHabit({ name: 'A', category: 'Health' });
    expect(res.isValid).toBe(false);
    expect(res.errors.name).toBeDefined();
  });

  it('validates valid backup JSON payload', () => {
    const backup = {
      appName: 'LevelUp Buddy',
      routines: [],
      routineCompletions: [],
      habits: [],
      habitCompletions: []
    };
    const res = validateBackupJson(backup);
    expect(res.isValid).toBe(true);
    expect(res.error).toBeNull();
  });

  it('rejects foreign or corrupted backup JSON', () => {
    const invalidBackup = { appName: 'RandomApp', routines: [] };
    const res = validateBackupJson(invalidBackup);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('LevelUp Buddy');
  });
});
