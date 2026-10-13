import { describe, it, expect } from 'vitest';
import { calculateHabitStats, isDateCompleted } from '../streakUtils';

describe('streakUtils', () => {
  it('returns zeros for empty completion history', () => {
    const stats = calculateHabitStats([], '2026-10-13');
    expect(stats.currentStreak).toBe(0);
    expect(stats.bestStreak).toBe(0);
    expect(stats.totalCompletions).toBe(0);
  });

  it('calculates current streak when completed today', () => {
    const completions = ['2026-10-11', '2026-10-12', '2026-10-13'];
    const stats = calculateHabitStats(completions, '2026-10-13');

    expect(stats.currentStreak).toBe(3);
    expect(stats.bestStreak).toBe(3);
    expect(stats.totalCompletions).toBe(3);
  });

  it('maintains streak if completed yesterday but not yet completed today', () => {
    const completions = ['2026-10-11', '2026-10-12'];
    const stats = calculateHabitStats(completions, '2026-10-13');

    expect(stats.currentStreak).toBe(2);
    expect(stats.bestStreak).toBe(2);
    expect(stats.totalCompletions).toBe(2);
  });

  it('resets current streak to 0 if missed both today and yesterday', () => {
    const completions = ['2026-10-10', '2026-10-11']; // missed 10-12 and 10-13
    const stats = calculateHabitStats(completions, '2026-10-13');

    expect(stats.currentStreak).toBe(0);
    expect(stats.bestStreak).toBe(2);
    expect(stats.totalCompletions).toBe(2);
  });

  it('deduplicates duplicate completion dates cleanly', () => {
    const completions = ['2026-10-12', '2026-10-13', '2026-10-13'];
    const stats = calculateHabitStats(completions, '2026-10-13');

    expect(stats.currentStreak).toBe(2);
    expect(stats.totalCompletions).toBe(2);
  });

  it('tracks all-time best streak even when current streak breaks', () => {
    const completions = [
      '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04', '2026-09-05', // 5-day streak
      '2026-10-13' // 1-day current streak
    ];
    const stats = calculateHabitStats(completions, '2026-10-13');

    expect(stats.currentStreak).toBe(1);
    expect(stats.bestStreak).toBe(5);
    expect(stats.totalCompletions).toBe(6);
  });

  it('checks if a date is completed', () => {
    expect(isDateCompleted(['2026-10-13'], '2026-10-13')).toBe(true);
    expect(isDateCompleted(['2026-10-12'], '2026-10-13')).toBe(false);
  });
});
