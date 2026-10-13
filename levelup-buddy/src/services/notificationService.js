import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import { parse, isAfter, addDays, set } from 'date-fns';

export const notificationService = {
  isSupported() {
    return Capacitor.isNativePlatform() || ('Notification' in window);
  },

  async requestPermission() {
    try {
      if (Capacitor.isNativePlatform()) {
        const status = await LocalNotifications.requestPermissions();
        return status.display === 'granted';
      } else if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
    } catch (e) {
      console.warn('Error requesting notification permission:', e);
    }
    return false;
  },

  async hasPermission() {
    try {
      if (Capacitor.isNativePlatform()) {
        const status = await LocalNotifications.checkPermissions();
        return status.display === 'granted';
      } else if ('Notification' in window) {
        return Notification.permission === 'granted';
      }
    } catch {
      return false;
    }
    return false;
  },

  /**
   * Schedules a single local notification or tests notification
   */
  async sendInstantNotification(title, body) {
    try {
      if (Capacitor.isNativePlatform()) {
        await LocalNotifications.schedule({
          notifications: [
            {
              id: Math.floor(Math.random() * 100000),
              title,
              body,
              schedule: { at: new Date(Date.now() + 1000) },
              sound: 'beep.wav'
            }
          ]
        });
      } else if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/favicon.svg' });
      }
    } catch (e) {
      console.warn('Could not fire notification:', e);
    }
  },

  /**
   * Schedules notifications for all active routines based on their start times and days of week
   */
  async syncRoutineNotifications(routines = []) {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    try {
      // Cancel previous routine notifications
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({ notifications: pending.notifications });
      }

      const notifications = [];
      const now = new Date();

      for (const r of routines) {
        if (!r.isActive || !r.startTime) continue;

        const [hours, minutes] = r.startTime.split(':').map(Number);
        const days = r.daysOfWeek || [0, 1, 2, 3, 4, 5, 6];

        // Schedule for the next occurrence of each active day of week (within next 7 days)
        for (let i = 0; i < 7; i++) {
          const targetDay = addDays(now, i);
          const dayOfWeek = targetDay.getDay();

          if (days.includes(dayOfWeek)) {
            const scheduledTime = set(targetDay, { hours, minutes, seconds: 0, milliseconds: 0 });

            if (isAfter(scheduledTime, now)) {
              notifications.push({
                id: (Number(r.id) * 10 + i) % 2147483647,
                title: `⏰ Time for: ${r.title}`,
                body: `${r.category} • Scheduled for ${r.startTime}. Stay disciplined!`,
                schedule: { at: scheduledTime },
                sound: 'beep.wav'
              });
            }
          }
        }
      }

      if (notifications.length > 0) {
        // LocalNotifications allows scheduling batches
        await LocalNotifications.schedule({ notifications });
      }
    } catch (err) {
      console.warn('Error syncing routine notifications:', err);
    }
  }
};
