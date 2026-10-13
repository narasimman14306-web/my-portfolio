import { describe, it, expect } from 'vitest';
import {
  getTodayDateString,
  formatDisplayDate,
  formatTimeDisplay,
  isRoutineScheduledForDate,
  getTimeOfDayGreeting,
  getLastNDays
} from '../dateUtils';

describe('dateUtils', () => {
  it('returns correctly formatted local date YYYY-MM-DD', () => {
    const fixedDate = new Date(2026, 9, 13); // Oct 13, 2026
    expect(getTodayDateString(fixedDate)).toBe('2026-10-13');
  });

  it('formats display dates nicely', () => {
    expect(formatDisplayDate('2026-10-13', 'yyyy-MM-dd')).toBe('2026-10-13');
    expect(formatDisplayDate('2026-10-13', 'EEE')).toBe('Tue');
  });

  it('formats 24-hour time to 12-hour AM/PM', () => {
    expect(formatTimeDisplay('07:30')).toBe('7:30 AM');
    expect(formatTimeDisplay('18:45')).toBe('6:45 PM');
    expect(formatTimeDisplay('00:00')).toBe('12:00 AM');
    expect(formatTimeDisplay('12:00')).toBe('12:00 PM');
  });

  it('correctly checks if routine is scheduled for a given day', () => {
    const tuesday = new Date(2026, 9, 13); // Day 2 (Tuesday)
    expect(isRoutineScheduledForDate([1, 2, 3], tuesday)).toBe(true);
    expect(isRoutineScheduledForDate([0, 6], tuesday)).toBe(false);
    expect(isRoutineScheduledForDate([], tuesday)).toBe(true); // empty defaults to everyday
  });

  it('generates last N days interval correctly', () => {
    const refDate = new Date(2026, 9, 13);
    const days = getLastNDays(7, refDate);
    expect(days).toHaveLength(7);
    expect(days[days.length - 1].dateString).toBe('2026-10-13');
  });

  it('returns valid greeting based on hour', () => {
    const morning = new Date(2026, 9, 13, 9);
    const afternoon = new Date(2026, 9, 13, 14);
    const evening = new Date(2026, 9, 13, 20);

    expect(getTimeOfDayGreeting(morning)).toBe('Good Morning');
    expect(getTimeOfDayGreeting(afternoon)).toBe('Good Afternoon');
    expect(getTimeOfDayGreeting(evening)).toBe('Good Evening');
  });
});
