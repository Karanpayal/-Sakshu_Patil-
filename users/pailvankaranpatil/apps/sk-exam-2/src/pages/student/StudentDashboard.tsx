import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getTests, getResults, getResultsByStudent } from '../../utils/storage';
import { BookOpen, Trophy, TrendingUp, Target, Clock, Award, BarChart3, User } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export default function StudentDashboard({ onNavigate }: Props) {
  const { user } = useAuth();
  const student = user?.student;
  if (!student) return null;

  const tests = getTests();
  const myResults = getResultsByStudent(student.id);
  const allResults = getResults();

  const avgScore = myResults.length > 0
    ? (myResults.reduce((sum, r) => sum + r.percentage, 0) / myResults.length).toFixed(1)
    : '0';

  const bestRank = myResults.length > 0
    ? Math.min(...myResults.map(r => r.rank))
    : '-';

  const pendingTests = tests.filter(t => !myResults.find(r => r.testId === t.id));
  const todayTest = tests.find(t => t.date === new Date().toISOString().split('T')[0] && !myResults.find(r => r.testId === t.id));

  const menuItems = [
    { id: 'take-test', label: 'Take Test', desc: `${pendingTests.length} tests available`, icon: BookOpen, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
    { id: 'results', label: 'My Results', desc: 'View scores & rankings', icon: Trophy, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30' },
    { id: 'progress', label: 'Progress Report', desc: 'Charts & analytics', icon: BarChart3, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' },
    { id: 'profile', label: 'My Profile', desc: 'View & edit details', icon: User, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/30' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">👋 Welcome, {student.name}!</h1>
            <p className="text-green-100 mt-1">Keep learning, keep growing!</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
              <p className="text-xs text-green-100">Your ID</p>
              <p className="font-bold font-mono">{student.skId}</p>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
              <p className="text-xs text-green-100">Roll No</p>
              <p className="font-bold">{student.rollNo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Test Alert */}
      {todayTest && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 dark:bg-yellow-800 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="font-medium text-yellow-800 dark:text-yellow-200">Today's Test Available!</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">{todayTest.title} • {todayTest.subject}</p>
            </div>
          </div>
          <button onClick={() => onNavigate('take-test')} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium">
            Start Now
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <Target className="w-6 h-6 text-blue-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{myResults.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tests Taken</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
          <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgScore}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Average Score</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <Award className="w-6 h-6 text-purple-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">#{bestRank}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Best Rank</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
          <BookOpen className="w-6 h-6 text-orange-500 mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingTests.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending Tests</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-green-300 dark:hover:border-green-600 transition-all text-left"
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

      {/* Recent Results */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" /> Recent Results
        </h3>
        {myResults.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No tests taken yet. Start taking tests!</p>
        ) : (
          <div className="space-y-2">
            {[...myResults].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()).slice(0, 5).map(r => {
              const test = tests.find(t => t.id === r.testId);
              return (
                <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{test?.title || 'Test'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{test?.subject} • {test?.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{r.score}/{r.totalQuestions} ({r.percentage.toFixed(0)}%)</p>
                    <p className="text-xs text-gray-500">Rank #{r.rank}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
