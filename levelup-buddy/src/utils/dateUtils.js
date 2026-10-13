import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, subDays, addDays, isToday, isYesterday, parse } from 'date-fns';

/**
 * Returns today's date in local calendar YYYY-MM-DD format.
 * Never uses UTC slicing which can misalign across midnight timezones.
 */
export function getTodayDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a YYYY-MM-DD string or Date object into human-readable format.
 */
export function formatDisplayDate(dateInput, formatPattern = 'EEE, MMM d') {
  if (!dateInput) return '';
  const dateObj = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
  return format(dateObj, formatPattern);
}

/**
 * Formats standard "HH:mm" time strings (24h) to "h:mm a" (12h).
 */
export function formatTimeDisplay(timeStr) {
  if (!timeStr) return '';
  try {
    const parsed = parse(timeStr, 'HH:mm', new Date());
    return format(parsed, 'h:mm a');
  } catch {
    return timeStr;
  }
}

/**
 * Returns array of days for current week (Monday to Sunday)
 */
export function getCurrentWeekDays(referenceDate = new Date()) {
  const start = startOfWeek(referenceDate, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(referenceDate, { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end }).map(d => ({
    date: d,
    dateString: getTodayDateString(d),
    dayName: format(d, 'EEE'),
    dayNumber: format(d, 'd'),
    isToday: isToday(d)
  }));
}

/**
 * Returns array of the last N days ending today
 */
export function getLastNDays(numDays = 7, referenceDate = new Date()) {
  const days = [];
  for (let i = numDays - 1; i >= 0; i--) {
    const d = subDays(referenceDate, i);
    days.push({
      date: d,
      dateString: getTodayDateString(d),
      dayName: format(d, 'EEE'),
      dayNumber: format(d, 'd'),
      isToday: isToday(d)
    });
  }
  return days;
}

/**
 * Checks if a routine's daysOfWeek array applies to a given date.
 * daysOfWeek: array of numbers [0..6] where 0 is Sunday, 1 is Monday...
 */
export function isRoutineScheduledForDate(daysOfWeek, targetDate = new Date()) {
  if (!daysOfWeek || !Array.isArray(daysOfWeek) || daysOfWeek.length === 0) {
    return true; // Default to every day if not specified
  }
  const dayIndex = targetDate.getDay(); // 0 is Sunday
  return daysOfWeek.includes(dayIndex);
}

/**
 * Time of day greeting
 */
export function getTimeOfDayGreeting(date = new Date()) {
  const hours = date.getHours();
  if (hours < 12) return 'Good Morning';
  if (hours < 17) return 'Good Afternoon';
  return 'Good Evening';
}
