import React from 'react';
import { getStudents, getTests, getResults } from '../../utils/storage';
import { Users, FileText, Trophy, TrendingUp, BookOpen, BarChart3, UserCog, Download } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onNavigate }: Props) {
  const students = getStudents();
  const tests = getTests();
  const results = getResults();

  const avgScore = results.length > 0
    ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1)
    : '0';

  const todayTests = tests.filter(t => t.date === new Date().toISOString().split('T')[0]).length;

  const stats = [
    { label: 'Total Students', value: students.length, icon: Users, color: 'bg-blue-500', lightColor: 'bg-blue-50 dark:bg-blue-900/30' },
    { label: 'Total Tests', value: tests.length, icon: FileText, color: 'bg-green-500', lightColor: 'bg-green-50 dark:bg-green-900/30' },
    { label: 'Avg Score', value: `${avgScore}%`, icon: TrendingUp, color: 'bg-purple-500', lightColor: 'bg-purple-50 dark:bg-purple-900/30' },
    { label: "Today's Tests", value: todayTests, icon: BookOpen, color: 'bg-orange-500', lightColor: 'bg-orange-50 dark:bg-orange-900/30' },
  ];

  const menuItems = [
    { id: 'test-upload', label: 'Upload New Test', desc: 'Create and upload daily tests', icon: BookOpen, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
    { id: 'students', label: 'Student Management', desc: 'View, edit, delete students', icon: UserCog, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30' },
    { id: 'reports', label: 'Reports & Downloads', desc: 'Download marks reports (PDF)', icon: Download, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' },
    { id: 'analytics', label: 'Performance Analytics', desc: 'Track student performance', icon: BarChart3, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/30' },
  ];

  const recentResults = [...results].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold">👋 Welcome Boss!</h1>
        <p className="text-blue-100 mt-2">Here's what's happening at SK_EXAM today.</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-xs text-blue-100">Date</p>
            <p className="font-semibold">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-xs text-blue-100">Active Students</p>
            <p className="font-semibold">{students.length}</p>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <p className="text-xs text-blue-100">Tests Submitted</p>
            <p className="font-semibold">{results.length}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.lightColor} rounded-xl p-4 border border-gray-200 dark:border-gray-700`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all text-left"
          >
            <div className={`${item.bg} p-2 rounded-lg`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> Recent Submissions
          </h3>
          {recentResults.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No submissions yet</p>
          ) : (
            <div className="space-y-2">
              {recentResults.map(r => {
                const student = students.find(s => s.id === r.studentId);
                const test = tests.find(t => t.id === r.testId);
                return (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{student?.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{test?.title || 'Test'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{r.percentage.toFixed(0)}%</p>
                      <p className="text-xs text-gray-500">Rank #{r.rank}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-500" /> Recent Tests
          </h3>
          {tests.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No tests uploaded yet</p>
          ) : (
            <div className="space-y-2">
              {[...tests].reverse().slice(0, 5).map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{t.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.subject} • {t.questions.length} Qs</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{t.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
