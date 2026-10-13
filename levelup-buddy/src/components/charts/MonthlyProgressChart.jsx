import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Calendar } from 'lucide-react';

export default function MonthlyProgressChart({ data = [] }) {
  const totalCompleted = data.reduce((acc, curr) => acc + (curr.total || 0), 0);

  if (!data || data.length === 0 || totalCompleted === 0) {
    return (
      <div className="glass-panel p-5 rounded-3xl text-center">
        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 mx-auto flex items-center justify-center mb-2">
          <Calendar className="w-5 h-5" />
        </div>
        <p className="text-xs text-slate-400 light:text-slate-500">
          Not enough historical records yet. As you mark habits and routines daily, your 30-day consistency trend will display here.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-5 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white light:text-slate-900 tracking-tight">
            30-Day Momentum
          </h4>
          <span className="text-[11px] text-slate-400 light:text-slate-500">
            {totalCompleted} total completions in the last month
          </span>
        </div>
      </div>

      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="momentumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="dayName"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: '#f8fafc'
              }}
              cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="total"
              name="Completed Actions"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#momentumGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
