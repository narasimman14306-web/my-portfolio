import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { validateHabit } from '../../utils/validation';

const CATEGORIES = [
  'Health',
  'Fitness',
  'Career',
  'Learning',
  'English',
  'Personal Growth',
  'Mental Wellness',
  'Finance'
];

const FREQUENCIES = [
  { value: 'daily', label: 'Everyday (Daily)' },
  { value: 'weekdays', label: 'Weekdays (Mon - Fri)' },
  { value: 'weekends', label: 'Weekends (Sat - Sun)' },
  { value: '3_times_week', label: '3 times a week' },
  { value: '5_times_week', label: '5 times a week' }
];

const COLOR_PALETTE = [
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink / Rose
  '#06b6d4', // Cyan
  '#d946ef'  // Fuchsia
];

export default function HabitFormModal({
  isOpen,
  onClose,
  onSave,
  initialData = null
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Health',
    targetFrequency: 'daily',
    color: '#6366f1',
    icon: 'Flame',
    isActive: 1
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || 'Health',
        targetFrequency: initialData.targetFrequency || 'daily',
        color: initialData.color || '#6366f1',
        icon: initialData.icon || 'Flame',
        isActive: initialData.isActive !== undefined ? initialData.isActive : 1
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Health',
        targetFrequency: 'daily',
        color: '#6366f1',
        icon: 'Flame',
        isActive: 1
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateHabit(formData);
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
      title={initialData ? 'Edit Habit' : 'Create New Habit'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-1">
            Habit Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Practice Spoken English"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
          />
          {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
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
            placeholder="Why is this habit important? Any guidelines?"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900 resize-none"
          />
        </div>

        {/* Category & Frequency */}
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
              Frequency *
            </label>
            <select
              value={formData.targetFrequency}
              onChange={(e) => setFormData({ ...formData, targetFrequency: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
            >
              {FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 mb-2">
            Theme Color
          </label>
          <div className="flex items-center space-x-2.5">
            {COLOR_PALETTE.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setFormData({ ...formData, color: c })}
                className={`w-7 h-7 rounded-xl transition-transform ${
                  formData.color === c ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>

        {/* Active toggle */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-semibold text-slate-300 light:text-slate-700">
            Keep Habit Active
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
            {initialData ? 'Update Habit' : 'Create Habit'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
