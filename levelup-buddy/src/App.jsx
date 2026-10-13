import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import RoutinePage from './pages/RoutinePage';
import HabitsPage from './pages/HabitsPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import { checkAndRunMigrations } from './db/migrations';

export default function App() {
  useEffect(() => {
    // Check and verify Dexie database status
    checkAndRunMigrations();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/routine" element={<RoutinePage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </ThemeProvider>
  );
}
