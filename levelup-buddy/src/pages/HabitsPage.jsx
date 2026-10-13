import React, { useState, useEffect, useCallback } from 'react';
import HabitCard from '../components/habits/HabitCard';
import HabitFormModal from '../components/habits/HabitFormModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import { habitService } from '../services/habitService';
import { getTodayDateString } from '../utils/dateUtils';
import { Plus, Zap } from 'lucide-react';

const CATEGORY_TABS = [
  'All',
  'Health',
  'Fitness',
  'Career',
  'Learning',
  'English',
  'Personal Growth',
  'Mental Wellness',
  'Finance'
];

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [deleteConfirmHabit, setDeleteConfirmHabit] = useState(null);

  const loadHabits = useCallback(async () => {
    try {
      const today = getTodayDateString();
      const data = await habitService.getAllHabitsWithStats(today);
      setHabits(data);
    } catch (err) {
      console.error('Error loading habits:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  const handleToggleToday = async (habitId, currentlyDone) => {
    const today = getTodayDateString();
    if (currentlyDone) {
      await habitService.undoCompletion(habitId, today);
    } else {
      await habitService.markCompleted(habitId, today);
    }
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadHabits();
  };

  const handleCreateOrUpdate = async (formData) => {
    if (editingHabit) {
      await habitService.updateHabit(editingHabit.id, formData);
    } else {
      await habitService.createHabit(formData);
    }
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadHabits();
  };

  const handleDelete = async () => {
    if (deleteConfirmHabit) {
      await habitService.deleteHabit(deleteConfirmHabit.id);
      window.dispatchEvent(new Event('levelup-data-changed'));
      await loadHabits();
    }
  };

  const filteredHabits = habits.filter((h) => {
    if (selectedCategory === 'All') return true;
    return h.category === selectedCategory;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Habit Tracker
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-500">
            Build discipline with unbroken streaks and daily consistency
          </p>
        </div>

        <button
          onClick={() => {
            setEditingHabit(null);
            setIsFormOpen(true);
          }}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-pink-600/30 transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Habit</span>
        </button>
      </div>

      {/* Category Filter Pills (Horizontal Scrollable) */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-pink-600 text-white shadow-sm shadow-pink-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 light:bg-slate-100 light:text-slate-600 light:border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Habit Cards List */}
      {filteredHabits.length === 0 && !loading ? (
        <EmptyState
          title={selectedCategory === 'All' ? 'No habits tracked yet' : `No ${selectedCategory} habits`}
          description="Atomic habits compound over time. Add your first habit now."
          actionText="Create Habit"
          onAction={() => {
            setEditingHabit(null);
            setIsFormOpen(true);
          }}
          icon={Zap}
        />
      ) : (
        <div className="space-y-3">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleToday={handleToggleToday}
              onEdit={(h) => {
                setEditingHabit(h);
                setIsFormOpen(true);
              }}
              onDelete={(h) => setDeleteConfirmHabit(h)}
            />
          ))}
        </div>
      )}

      {/* Habit Form Modal */}
      <HabitFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleCreateOrUpdate}
        initialData={editingHabit}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmHabit)}
        onClose={() => setDeleteConfirmHabit(null)}
        onConfirm={handleDelete}
        title="Delete Habit"
        message={`Are you sure you want to delete "${deleteConfirmHabit?.name}"? All streak milestones and history for this habit will be deleted permanently.`}
        confirmText="Delete Habit"
        isDestructive={true}
      />
    </div>
  );
}
