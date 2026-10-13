import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { IndianRupee, Tag, Plus, Trash2, Wallet } from 'lucide-react';
import { lifeToolsService } from '../../services/lifeToolsService';

const EXPENSE_CATS = ['Food', 'Travel', 'Learning & Tech', 'Bills', 'Personal'];

export default function ExpenseModal({ isOpen, onClose, onUpdated }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');
  const [todayExpenses, setTodayExpenses] = useState({ items: [], totalAmount: 0 });

  const loadExpenses = async () => {
    const data = await lifeToolsService.getTodayExpenses();
    setTodayExpenses(data);
  };

  useEffect(() => {
    if (isOpen) {
      loadExpenses();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    await lifeToolsService.addExpense({
      amount: Number(amount),
      category,
      note
    });

    setAmount('');
    setNote('');
    await loadExpenses();
    if (onUpdated) onUpdated();
  };

  const handleDelete = async (id) => {
    await lifeToolsService.deleteExpense(id);
    await loadExpenses();
    if (onUpdated) onUpdated();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="💰 Daily Expense Tracker">
      <div className="space-y-4">
        {/* Daily Total Banner */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-white light:text-slate-900">Today's Total Spend</span>
          </div>
          <span className="text-lg font-black text-amber-400">
            ₹{todayExpenses.totalAmount.toLocaleString()}
          </span>
        </div>

        {/* Add Expense Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 light:text-slate-700 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 150"
                className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 light:text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
              >
                {EXPENSE_CATS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note: (e.g. Lunch with friends, Course book)"
              className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-500 light:bg-slate-100 light:border-slate-300 light:text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-md shadow-amber-600/30 transition-transform active:scale-95"
          >
            + Add Expense
          </button>
        </form>

        {/* Today's Expense List */}
        <div className="pt-2 border-t border-slate-800 light:border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Today's Logged Items ({todayExpenses.items.length})
          </span>

          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {todayExpenses.items.map((item) => (
              <div
                key={item.id}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] light:bg-slate-50 light:border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-white light:text-slate-900 truncate">
                    {item.note || item.category}
                  </div>
                  <span className="text-[10px] text-slate-400">{item.category}</span>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="font-bold text-amber-400">₹{item.amount}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded-lg text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
