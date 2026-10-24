import React from 'react';
import { getStudents, getTests, getResults } from '../../utils/storage';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface Props {
  onBack: () => void;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Analytics({ onBack }: Props) {
  const students = getStudents();
  const tests = getTests();
  const results = getResults();

  // Student performance data
  const studentPerformance = students.map(s => {
    const studentResults = results.filter(r => r.studentId === s.id);
    const avg = studentResults.length > 0
      ? studentResults.reduce((sum, r) => sum + r.percentage, 0) / studentResults.length
      : 0;
    return { name: s.name.split(' ')[0], avg: Math.round(avg), tests: studentResults.length };
  }).filter(s => s.tests > 0);

  // Test-wise average
  const testPerformance = tests.map(t => {
    const testResults = results.filter(r => r.testId === t.id);
    const avg = testResults.length > 0
      ? testResults.reduce((sum, r) => sum + r.percentage, 0) / testResults.length
      : 0;
    return { name: t.title.length > 15 ? t.title.slice(0, 15) + '...' : t.title, avg: Math.round(avg), count: testResults.length };
  });

  // Score distribution
  const ranges = [
    { name: '0-20%', count: 0 },
    { name: '21-40%', count: 0 },
    { name: '41-60%', count: 0 },
    { name: '61-80%', count: 0 },
    { name: '81-100%', count: 0 },
  ];
  results.forEach(r => {
    if (r.percentage <= 20) ranges[0].count++;
    else if (r.percentage <= 40) ranges[1].count++;
    else if (r.percentage <= 60) ranges[2].count++;
    else if (r.percentage <= 80) ranges[3].count++;
    else ranges[4].count++;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-blue-500" /> Performance Analytics
      </h2>

      {results.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <BarChart3 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No test results yet. Analytics will appear after students take tests.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Performance Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Student Average Scores</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={studentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="avg" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Avg %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Test Performance Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Test-wise Average</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={testPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="avg" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Avg %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Score Distribution Pie */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Score Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={ranges.filter(r => r.count > 0)} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {ranges.filter(r => r.count > 0).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🏆 Top Performers</h3>
            <div className="space-y-2">
              {[...results].sort((a, b) => b.percentage - a.percentage).slice(0, 5).map((r, i) => {
                const student = students.find(s => s.id === r.studentId);
                return (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-400">#{i + 1}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{student?.name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{student?.skId}</p>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{r.percentage.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
