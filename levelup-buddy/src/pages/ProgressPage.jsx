import React, { useState, useEffect } from 'react';
import WeeklyProductivityChart from '../components/charts/WeeklyProductivityChart';
import MonthlyProgressChart from '../components/charts/MonthlyProgressChart';
import StatCard from '../components/common/StatCard';
import { progressService } from '../services/progressService';
import { getTodayDateString } from '../utils/dateUtils';
import { Flame, Trophy, CheckCircle, Target, Sparkles, TrendingUp } from 'lucide-react';

export default function ProgressPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [todaySummary, setTodaySummary] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const today = getTodayDateString();
        const [sum, anal] = await Promise.all([
          progressService.getTodaySummary(today),
          progressService.getFullAnalyticsData()
        ]);
        setTodaySummary(sum);
        setAnalytics(anal);
      } catch (err) {
        console.error('Error loading progress analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalActions = analytics?.totalCompletionsAllTime || 0;
  const bestHabit = analytics?.bestHabit;
  const maxStreak = todaySummary?.maxStreak || 0;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white light:text-slate-900 tracking-tight">
          Analytics & Insights
        </h1>
        <p className="text-xs text-slate-400 light:text-slate-500">
          Quantified personal growth based on your local device records
        </p>
      </div>

      {/* High-level stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="All-Time Actions"
          value={totalActions}
          subtext="Completions logged"
          icon={CheckCircle}
          accentColor="indigo"
        />
        <StatCard
          title="Top Active Streak"
          value={`${maxStreak}d`}
          subtext="Consecutive days"
          icon={Flame}
          accentColor="amber"
        />
        <StatCard
          title="Routine Today"
          value={`${todaySummary?.routinePercentage || 0}%`}
          subtext={`${todaySummary?.routinesCompleted || 0}/${todaySummary?.routinesTotal || 0} scheduled`}
          icon={Target}
          accentColor="emerald"
        />
        <StatCard
          title="Habits Today"
          value={`${todaySummary?.habitPercentage || 0}%`}
          subtext={`${todaySummary?.habitsCompleted || 0}/${todaySummary?.habitsTotal || 0} active`}
          icon={TrendingUp}
          accentColor="violet"
        />
      </div>

      {/* Best-performing habit spotlight */}
      {bestHabit && (
        <div className="glass-panel p-4 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/30 to-indigo-950/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Star Habit
              </div>
              <h4 className="text-sm font-bold text-white light:text-slate-900 truncate">
                {bestHabit.name}
              </h4>
              <p className="text-xs text-slate-300 light:text-slate-600 mt-0.5">
                Best streak of <span className="font-bold text-amber-400">{bestHabit.bestStreak} days</span> with {bestHabit.totalCompletions} total completions!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Chart */}
      <WeeklyProductivityChart data={analytics?.weeklyData || []} />

      {/* Monthly Chart */}
      <MonthlyProgressChart data={analytics?.monthlyData || []} />

      {/* Consistency Summary Card */}
      <div className="glass-panel p-5 rounded-3xl">
        <div className="flex items-center space-x-2.5 mb-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-white light:text-slate-900 tracking-tight">
            Consistency Principle
          </h4>
        </div>
        <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed">
          Improving just <span className="text-indigo-400 font-semibold">1% every day</span> leads to a <span className="text-emerald-400 font-semibold">37x improvement</span> over the course of a year. Every routine completed and habit maintained strengthens your neural pathways and self-identity.
        </p>
      </div>
    </div>
  );
}
