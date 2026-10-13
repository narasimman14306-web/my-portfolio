import React, { useState, useEffect, useCallback } from 'react';
import RoutineCard from '../components/routine/RoutineCard';
import RoutineFormModal from '../components/routine/RoutineFormModal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import { routineService } from '../services/routineService';
import { Plus, Filter, CalendarCheck } from 'lucide-react';

const CATEGORY_TABS = ['All', 'Morning', 'Work', 'Learning', 'Fitness', 'Evening', 'Personal'];

export default function RoutinePage() {
  const [routines, setRoutines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [deleteConfirmRoutine, setDeleteConfirmRoutine] = useState(null);

  const loadRoutines = useCallback(async () => {
    try {
      const data = await routineService.getAllRoutines();
      // Sort chronologically by startTime
      data.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
      setRoutines(data);
    } catch (err) {
      console.error('Error loading routines:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoutines();
  }, [loadRoutines]);

  const handleCreateOrUpdate = async (formData) => {
    if (editingRoutine) {
      await routineService.updateRoutine(editingRoutine.id, formData);
    } else {
      await routineService.createRoutine(formData);
    }
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadRoutines();
  };

  const handleDelete = async () => {
    if (deleteConfirmRoutine) {
      await routineService.deleteRoutine(deleteConfirmRoutine.id);
      window.dispatchEvent(new Event('levelup-data-changed'));
      await loadRoutines();
    }
  };

  const handleToggleActive = async (id) => {
    await routineService.toggleRoutineActive(id);
    window.dispatchEvent(new Event('levelup-data-changed'));
    await loadRoutines();
  };

  const filteredRoutines = routines.filter((r) => {
    if (selectedCategory === 'All') return true;
    return r.category === selectedCategory;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white light:text-slate-900 tracking-tight">
            Daily Routine
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-500">
            Design your structured timetable for each day of the week
          </p>
        </div>

        <button
          onClick={() => {
            setEditingRoutine(null);
            setIsFormOpen(true);
          }}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Routine</span>
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
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 light:bg-slate-100 light:text-slate-600 light:border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Routine Cards List */}
      {filteredRoutines.length === 0 && !loading ? (
        <EmptyState
          title={selectedCategory === 'All' ? 'No routines created yet' : `No ${selectedCategory} routines`}
          description="Create your first structured daily routine to streamline your day."
          actionText="Create Routine"
          onAction={() => {
            setEditingRoutine(null);
            setIsFormOpen(true);
          }}
          icon={CalendarCheck}
        />
      ) : (
        <div className="space-y-3">
          {filteredRoutines.map((routine) => (
            <RoutineCard
              key={routine.id}
              routine={routine}
              onEdit={(r) => {
                setEditingRoutine(r);
                setIsFormOpen(true);
              }}
              onDelete={(r) => setDeleteConfirmRoutine(r)}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      )}

      {/* Routine Form Modal */}
      <RoutineFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleCreateOrUpdate}
        initialData={editingRoutine}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmRoutine)}
        onClose={() => setDeleteConfirmRoutine(null)}
        onConfirm={handleDelete}
        title="Delete Routine"
        message={`Are you sure you want to delete "${deleteConfirmRoutine?.title}"? All past completion logs for this routine will also be removed.`}
        confirmText="Delete Routine"
        isDestructive={true}
      />
    </div>
  );
}
