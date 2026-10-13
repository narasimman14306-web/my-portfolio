/**
 * Input and data validation utilities for LevelUp Buddy
 */

export function validateRoutine(routine) {
  const errors = {};

  if (!routine.title || routine.title.trim().length < 2) {
    errors.title = 'Title must be at least 2 characters long';
  }

  if (!routine.category) {
    errors.category = 'Please select a category';
  }

  if (!routine.startTime) {
    errors.startTime = 'Start time is required';
  } else if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(routine.startTime)) {
    errors.startTime = 'Start time must be in HH:mm format';
  }

  if (routine.endTime && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(routine.endTime)) {
    errors.endTime = 'End time must be in HH:mm format';
  }

  if (!Array.isArray(routine.daysOfWeek) || routine.daysOfWeek.length === 0) {
    errors.daysOfWeek = 'Select at least one day of the week';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateHabit(habit) {
  const errors = {};

  if (!habit.name || habit.name.trim().length < 2) {
    errors.name = 'Habit name must be at least 2 characters long';
  }

  if (!habit.category) {
    errors.category = 'Please select a category';
  }

  if (!habit.targetFrequency) {
    errors.targetFrequency = 'Please select target frequency';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates imported backup JSON payload structure
 */
export function validateBackupJson(data) {
  if (!data || typeof data !== 'object') {
    return { isValid: false, error: 'Backup file does not contain a valid JSON object.' };
  }

  if (data.appName !== 'LevelUp Buddy') {
    return {
      isValid: false,
      error: 'Unrecognized backup file. Missing appName "LevelUp Buddy".'
    };
  }

  if (!Array.isArray(data.routines)) {
    return { isValid: false, error: 'Invalid backup: "routines" array is missing.' };
  }

  if (!Array.isArray(data.routineCompletions)) {
    return { isValid: false, error: 'Invalid backup: "routineCompletions" array is missing.' };
  }

  if (!Array.isArray(data.habits)) {
    return { isValid: false, error: 'Invalid backup: "habits" array is missing.' };
  }

  if (!Array.isArray(data.habitCompletions)) {
    return { isValid: false, error: 'Invalid backup: "habitCompletions" array is missing.' };
  }

  return { isValid: true, error: null };
}
