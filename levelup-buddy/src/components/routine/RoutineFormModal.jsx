import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { validateRoutine } from '../../utils/validation';

const CATEGORIES = ['Morning', 'Work', 'Learning', 'Fitness', 'Evening', 'Personal'];
const PRIORITIES = [
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'low', label: 'Low Priority' }
];
const DAYS = [
  { label: 'Sun', value: 0 },
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 }
];

export default function RoutineFormModal({
  isOpen,
  onClose,
  onSave,
  initialData = null
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Morning',
    startTime: '07:00',
    endTime: '08:00',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    priority: 'high',
    isActive: 1
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Morning',
        startTime: initialData.startTime || '07:00',
        endTime: initialData.endTime || '',
        daysOfWeek: initialData.daysOfWeek || [0, 1, 2, 3, 4, 5, 6],
        priority: initialData.priority || 'high',
        isActive: initialData.isActive !== undefined ? initialData.isActive : 1
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Morning',
        startTime: '07:00',
        endTime: '08:00',
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        priority: 'high',
        isActive: 1
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const toggleDay = (dayValue) => {
    setFormData((prev) => {
      const exists = prev.daysOfWeek.includes(dayValue);
      const updated = exists
        ? prev.daysOfWeek.filter((d) => d !== dayValue)
        : [...prev.daysOfWeek, dayValue].sort();
      return { ...prev, daysOfWeek: updated };
    });
  };

  const setPresetDays = (preset) => {
    if (preset === 'all') setFormData((prev) => ({ ...prev, daysOfWeek: [0, 1, 2, 3, 4, 5, 6] }));
    if (preset === 'weekdays') setFormData((prev) => ({ ...prev, daysOfWeek: [1, 2, 3, 4, 5] }));
    if (preset === 'weekends') setFormData((prev) => ({ ...prev, daysOfWeek: [0, 6] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateRoutine(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Routine' : 'Create Routine'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
            Routine Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Morning Workout & Hydration"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
          />
          {errors.title && <p className="text-[11px] text-rose-400 mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
            Description
          </label>
          <textarea
            rows="2"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Key actions, focus notes, or reminders..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900 resize-none"
          />
        </div>

        {/* Category & Priority Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
            >
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Start & End Times */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
              Start Time *
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
            />
            {errors.startTime && <p className="text-[11px] text-rose-400 mt-1">{errors.startTime}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
              End Time (Optional)
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
            />
          </div>
        </div>

        {/* Days of week */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300 light:text-slate-700">
              Active Days *
            </label>
            <div className="flex items-center space-x-1.5 text-[10px]">
              <button
                type="button"
                onClick={() => setPresetDays('all')}
                className="text-indigo-400 hover:underline"
              >
                Everyday
              </button>
              <span className="text-slate-600">•</span>
              <button
                type="button"
                onClick={() => setPresetDays('weekdays')}
                className="text-indigo-400 hover:underline"
              >
                Weekdays
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {DAYS.map((d) => {
              const isSelected = formData.daysOfWeek.includes(d.value);
              return (
                <button
                  type="button"
                  key={d.value}
                  onClick={() => toggleDay(d.value)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'bg-slate-800/70 text-slate-400 hover:bg-slate-750 light:bg-slate-100 light:text-slate-600'
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
          {errors.daysOfWeek && <p className="text-[11px] text-rose-400 mt-1">{errors.daysOfWeek}</p>}
        </div>

        {/* Active toggle */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-semibold text-slate-300 light:text-slate-700">
            Enable Routine Schedule
          </span>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isActive: formData.isActive ? 0 : 1 })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              formData.isActive ? 'bg-indigo-600' : 'bg-slate-800 light:bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                formData.isActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Submit */}
        <div className="pt-3 border-t border-slate-800 light:border-slate-200">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
          >
            {initialData ? 'Update Routine' : 'Create Routine'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
