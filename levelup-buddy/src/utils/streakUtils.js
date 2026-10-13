import { parseISO, subDays, differenceInCalendarDays } from 'date-fns';
import { getTodayDateString } from './dateUtils';

/**
 * Calculates current streak, best streak, and total completions for a habit.
 * 
 * @param {Array<string>} completionDates - List of YYYY-MM-DD completion dates
 * @param {string} referenceDateString - Reference date (defaults to today's local date)
 * @returns {{ currentStreak: number, bestStreak: number, totalCompletions: number }}
 */
export function calculateHabitStats(completionDates = [], referenceDateString = getTodayDateString()) {
  if (!completionDates || completionDates.length === 0) {
    return { currentStreak: 0, bestStreak: 0, totalCompletions: 0 };
  }

  // Deduplicate and sort dates ascending
  const uniqueDates = Array.from(new Set(completionDates)).sort();
  const totalCompletions = uniqueDates.length;

  if (totalCompletions === 0) {
    return { currentStreak: 0, bestStreak: 0, totalCompletions: 0 };
  }

  // Date set for O(1) lookup
  const dateSet = new Set(uniqueDates);

  // 1. Calculate Best Streak across all dates
  let bestStreak = 0;
  let currentRun = 0;

  for (let i = 0; i < uniqueDates.length; i++) {
    if (i === 0) {
      currentRun = 1;
    } else {
      const prevDate = parseISO(uniqueDates[i - 1]);
      const currDate = parseISO(uniqueDates[i]);
      const diff = differenceInCalendarDays(currDate, prevDate);

      if (diff === 1) {
        currentRun += 1;
      } else {
        currentRun = 1;
      }
    }
    if (currentRun > bestStreak) {
      bestStreak = currentRun;
    }
  }

  // 2. Calculate Current Streak relative to referenceDate
  const refDate = parseISO(referenceDateString);
  const completedToday = dateSet.has(referenceDateString);

  const yesterdayDateString = getTodayDateString(subDays(refDate, 1));
  const completedYesterday = dateSet.has(yesterdayDateString);

  let currentStreak = 0;

  if (completedToday || completedYesterday) {
    // Start counting backwards from whichever was the most recent completed day
    let checkDate = completedToday ? refDate : subDays(refDate, 1);
    while (dateSet.has(getTodayDateString(checkDate))) {
      currentStreak += 1;
      checkDate = subDays(checkDate, 1);
    }
  }

  return {
    currentStreak,
    bestStreak: Math.max(bestStreak, currentStreak),
    totalCompletions
  };
}

/**
 * Checks if a specific date is completed in the list of completion dates
 */
export function isDateCompleted(completionDates = [], targetDateString) {
  if (!completionDates || !targetDateString) return false;
  return completionDates.includes(targetDateString);
}
