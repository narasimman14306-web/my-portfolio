import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import BottomNav from '../common/BottomNav';
import { progressService } from '../../services/progressService';
import { getTodayDateString } from '../../utils/dateUtils';

export default function AppLayout({ children }) {
  const [streakCount, setStreakCount] = useState(0);

  // Load active streak count periodically or on event
  useEffect(() => {
    async function loadStreak() {
      try {
        const summary = await progressService.getTodaySummary(getTodayDateString());
        setStreakCount(summary.maxStreak || 0);
      } catch (e) {
        console.error('Error loading streak count:', e);
      }
    }
    loadStreak();

    // Listen for custom event when completion happens
    const handleUpdate = () => loadStreak();
    window.addEventListener('levelup-data-changed', handleUpdate);
    return () => window.removeEventListener('levelup-data-changed', handleUpdate);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#060813] light:bg-slate-50 text-slate-100 light:text-slate-900 transition-colors duration-300 relative overflow-x-hidden ambient-bg">
      {/* Dynamic Ambient Glow Orbs in the background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-indigo-600/15 blur-[90px] animate-pulse" />
        <div className="absolute top-1/4 -right-32 w-80 h-80 rounded-full bg-purple-600/15 blur-[100px]" />
        <div className="absolute top-2/3 -left-20 w-72 h-72 rounded-full bg-pink-600/10 blur-[110px]" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      {/* Navbar with sticky frosted glass */}
      <div className="relative z-30">
        <Navbar streakCount={streakCount} />
      </div>

      {/* Main Content View */}
      <main className="relative z-10 flex-1 max-w-md w-full mx-auto px-4 pb-24 pt-3">
        {children}
      </main>

      {/* Floating Bottom Navigation */}
      <div className="relative z-40">
        <BottomNav />
      </div>
    </div>
  );
}
