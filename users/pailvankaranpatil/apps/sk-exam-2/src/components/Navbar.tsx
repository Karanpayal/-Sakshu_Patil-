import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, LogOut, GraduationCap, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">SK_EXAM</h1>
            {user && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {user.type === 'admin' ? <Shield className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                {user.type === 'admin' ? 'Admin' : 'Student'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                {user.type === 'admin' ? '👋 Welcome Boss' : `👋 Welcome, ${user.student?.name || 'Student'}`}
              </span>
            )}
            
            <button
              onClick={toggle}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={dark ? 'Light Mode' : 'Dark Mode'}
            >
              {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {user && (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
