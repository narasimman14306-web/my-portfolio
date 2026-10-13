import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TrendingUp, Sparkles } from 'lucide-react';

export default function WeeklyProductivityChart({ data = [] }) {
  const totalInPeriod = data.reduce((acc, curr) => acc + (curr.total || 0), 0);

  if (!data || data.length === 0 || totalInPeriod === 0) {
    return (
      <div className="glass-panel p-5 rounded-3xl text-center">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-400 mx-auto flex items-center justify-center mb-2.5 shadow-sm shadow-indigo-500/20">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h4 className="text-xs font-bold text-white light:text-slate-900 mb-0.5">
          Weekly Momentum
        </h4>
        <p className="text-xs text-slate-400 light:text-slate-500">
          Complete routines or habits this week to see your productivity trend.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-5 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-extrabold text-white light:text-slate-900 tracking-tight flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Weekly Activity</span>
          </h4>
          <span className="text-[11px] text-slate-400 light:text-slate-500 font-medium">
            {totalInPeriod} actions completed in the last 7 days
          </span>
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="barRoutine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="barHabit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="dayName"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 20, 36, 0.95)',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                borderRadius: '1rem',
                fontSize: '12px',
                color: '#f8fafc',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
              }}
              cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
            />
            <Bar
              dataKey="routines"
              name="Routines"
              fill="url(#barRoutine)"
              radius={[6, 6, 0, 0]}
              stackId="a"
            />
            <Bar
              dataKey="habits"
              name="Habits"
              fill="url(#barHabit)"
              radius={[6, 6, 0, 0]}
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
