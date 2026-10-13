import { db } from './database';

export const SAMPLE_ROUTINES = [
  {
    title: 'Morning Hydration & Light Stretch',
    description: 'Drink 500ml water and do a 10-minute mobility routine to wake up the body.',
    category: 'Morning',
    startTime: '06:30',
    endTime: '07:00',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // All week
    priority: 'high',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Focused Deep Work & Coding',
    description: 'High-focus work block. Silence phone notifications.',
    category: 'Work',
    startTime: '09:30',
    endTime: '12:30',
    daysOfWeek: [1, 2, 3, 4, 5], // Mon-Fri
    priority: 'high',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Gym & Strength Training',
    description: 'Full workout session or cardio workout to stay active and energized.',
    category: 'Fitness',
    startTime: '17:30',
    endTime: '18:45',
    daysOfWeek: [1, 2, 3, 4, 5, 6], // Mon-Sat
    priority: 'high',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'English Communication Practice',
    description: 'Read aloud, listen to an English podcast, or practice shadow speaking for fluency.',
    category: 'Learning',
    startTime: '19:30',
    endTime: '20:15',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // All week
    priority: 'medium',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Evening Wind-down & Reflection',
    description: 'Review achievements, plan tomorrow, and keep screens away before sleeping.',
    category: 'Evening',
    startTime: '22:00',
    endTime: '22:30',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // All week
    priority: 'medium',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const SAMPLE_HABITS = [
  {
    name: 'Wake Up on Time',
    description: 'Start the day before 6:30 AM consistently.',
    category: 'Health',
    targetFrequency: 'daily',
    color: '#6366f1', // Indigo
    icon: 'Sun',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Workout or Gym',
    description: 'At least 45 minutes of physical exercise.',
    category: 'Fitness',
    targetFrequency: 'daily',
    color: '#10b981', // Emerald
    icon: 'Dumbbell',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Master Tech & Programming',
    description: 'Practice programming, building projects, or algorithms.',
    category: 'Career',
    targetFrequency: 'daily',
    color: '#3b82f6', // Blue
    icon: 'Code',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Spoken English Fluency',
    description: 'Practice speaking English aloud for at least 20 minutes.',
    category: 'English',
    targetFrequency: 'daily',
    color: '#8b5cf6', // Violet
    icon: 'MessageSquare',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Read for 15 Minutes',
    description: 'Non-fiction, career growth, or mindset books.',
    category: 'Personal Growth',
    targetFrequency: 'daily',
    color: '#f59e0b', // Amber
    icon: 'BookOpen',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'No Doomscrolling',
    description: 'Avoid mindless short videos and social media scrolling.',
    category: 'Mental Wellness',
    targetFrequency: 'daily',
    color: '#ec4899', // Pink
    icon: 'Shield',
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/**
 * Seeds sample suggestions into the database without touching historical completions.
 */
export async function seedStarterSuggestions() {
  return await db.transaction('rw', db.routines, db.habits, async () => {
    // Add sample routines
    for (const r of SAMPLE_ROUTINES) {
      await db.routines.add({ ...r });
    }
    // Add sample habits
    for (const h of SAMPLE_HABITS) {
      await db.habits.add({ ...h });
    }
  });
}
