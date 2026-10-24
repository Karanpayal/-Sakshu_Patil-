import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getTests, getResultsByStudent } from '../../utils/storage';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

interface Props {
  onBack: () => void;
}

export default function ProgressChart({ onBack }: Props) {
  const { user } = useAuth();
  const student = user?.student;
  if (!student) return null;

  const tests = getTests();
  const myResults = getResultsByStudent(student.id);

  // Prepare chart data sorted by date
  const chartData = myResults
    .map(r => {
      const test = tests.find(t => t.id === r.testId);
      return {
        date: test?.date || '',
        title: test?.title || 'Test',
        percentage: Math.round(r.percentage * 10) / 10,
        score: r.score,
        total: r.totalQuestions,
        rank: r.rank,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const avgScore = myResults.length > 0
    ? (myResults.reduce((s, r) => s + r.percentage, 0) / myResults.length).toFixed(1)
    : '0';

  const improvement = chartData.length >= 2
    ? (chartData[chartData.length - 1].percentage - chartData[0].percentage).toFixed(1)
    : '0';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-purple-500" /> My Progress Report
      </h2>

      {myResults.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <TrendingUp className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No data yet. Take tests to see your progress!</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 border border-blue-200 dark:border-blue-800 text-center">
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{myResults.length}</p>
              <p className="text-xs text-gray-500">Tests</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-3 border border-green-200 dark:border-green-800 text-center">
              <p className="text-xl font-bold text-green-600 dark:text-green-400">{avgScore}%</p>
              <p className="text-xs text-gray-500">Average</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-3 border border-purple-200 dark:border-purple-800 text-center">
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {Number(improvement) >= 0 ? '+' : ''}{improvement}%
              </p>
              <p className="text-xs text-gray-500">Improvement</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-3 border border-yellow-200 dark:border-yellow-800 text-center">
              <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">#{Math.min(...myResults.map(r => r.rank))}</p>
              <p className="text-xs text-gray-500">Best Rank</p>
            </div>
          </div>

          {/* Performance Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📈 Score Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" domain={[0, 100]} />
                <Tooltip formatter={(value: any) => `${value}%`} />
                <Area type="monotone" dataKey="percentage" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} name="Score %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Score Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📊 Test-wise Scores</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="title" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" domain={[0, 100]} />
                <Tooltip formatter={(value: any) => `${value}%`} />
                <Bar dataKey="percentage" fill="#10b981" radius={[4, 4, 0, 0]} name="Score %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Rank Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🏆 Rank Progress</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" reversed domain={[1, 'auto']} />
                <Tooltip />
                <Line type="stepAfter" dataKey="rank" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Rank" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 text-center mt-2">Lower rank = Better performance</p>
          </div>
        </>
      )}
    </div>
  );
}
