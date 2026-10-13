import { db } from '../db/database';
import { getTodayDateString } from '../utils/dateUtils';
import { getDailyEnglishPhrase } from '../utils/englishPhrases';

export const lifeToolsService = {
  // --- 💧 WATER TRACKER ---
  async getTodayWater(dateString = getTodayDateString()) {
    const record = await db.waterLogs.where('date').equals(dateString).first();
    const glasses = record?.glasses || 0;
    return {
      date: dateString,
      glasses,
      ml: glasses * 250, // 250ml per glass (target: 8 glasses = 2000ml)
      targetGlasses: 8
    };
  },

  async addWaterGlass(dateString = getTodayDateString()) {
    const existing = await db.waterLogs.where('date').equals(dateString).first();
    if (existing) {
      await db.waterLogs.update(existing.id, {
        glasses: existing.glasses + 1,
        ml: (existing.glasses + 1) * 250
      });
    } else {
      await db.waterLogs.add({
        date: dateString,
        glasses: 1,
        ml: 250
      });
    }
  },

  async removeWaterGlass(dateString = getTodayDateString()) {
    const existing = await db.waterLogs.where('date').equals(dateString).first();
    if (existing && existing.glasses > 0) {
      await db.waterLogs.update(existing.id, {
        glasses: existing.glasses - 1,
        ml: (existing.glasses - 1) * 250
      });
    }
  },

  // --- 🧠 MOOD & EVENING WIN NOTE ---
  async getTodayMood(dateString = getTodayDateString()) {
    return await db.moodLogs.where('date').equals(dateString).first();
  },

  async saveTodayMood(dateString = getTodayDateString(), mood, winNote) {
    const existing = await db.moodLogs.where('date').equals(dateString).first();
    if (existing) {
      await db.moodLogs.update(existing.id, {
        mood,
        winNote,
        updatedAt: new Date().toISOString()
      });
    } else {
      await db.moodLogs.add({
        date: dateString,
        mood,
        winNote,
        createdAt: new Date().toISOString()
      });
    }
  },

  // --- ⏱️ POMODORO / FOCUS SESSIONS ---
  async logFocusSession(durationMins, taskTitle = 'Deep Work') {
    const today = getTodayDateString();
    await db.focusSessions.add({
      date: today,
      durationMins: Number(durationMins),
      taskTitle,
      completedAt: new Date().toISOString()
    });
  },

  async getTodayFocusMins(dateString = getTodayDateString()) {
    const sessions = await db.focusSessions.where('date').equals(dateString).toArray();
    return sessions.reduce((sum, s) => sum + (Number(s.durationMins) || 0), 0);
  },

  // --- 💰 DAILY EXPENSE TRACKER ---
  async getTodayExpenses(dateString = getTodayDateString()) {
    const items = await db.expenseLogs.where('date').equals(dateString).toArray();
    const totalAmount = items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    return {
      date: dateString,
      items,
      totalAmount
    };
  },

  async addExpense({ amount, category = 'Food', note = '' }) {
    const today = getTodayDateString();
    await db.expenseLogs.add({
      date: today,
      amount: Number(amount) || 0,
      category,
      note,
      createdAt: new Date().toISOString()
    });
  },

  async deleteExpense(id) {
    await db.expenseLogs.delete(Number(id));
  },

  // --- 🗣️ ENGLISH FLUENCY OF THE DAY ---
  getEnglishPhrase() {
    return getDailyEnglishPhrase();
  }
};
