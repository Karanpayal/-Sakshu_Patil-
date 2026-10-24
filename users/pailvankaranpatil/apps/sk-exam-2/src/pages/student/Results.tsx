import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getTests, getResultsByStudent, getResultsByTest, getStudents } from '../../utils/storage';
import { generateStudentReport } from '../../utils/pdfGenerator';
import { ArrowLeft, Trophy, Download, Medal } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function Results({ onBack }: Props) {
  const { user } = useAuth();
  const student = user?.student;
  if (!student) return null;

  const tests = getTests();
  const myResults = getResultsByStudent(student.id);
  const allStudents = getStudents();

  const handleDownloadReport = () => {
    generateStudentReport(student, myResults);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Results</h2>
        {myResults.length > 0 && (
          <button onClick={handleDownloadReport} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        )}
      </div>

      {myResults.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <Trophy className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No test results yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Take a test to see your results here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-4 text-white mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{myResults.length}</p>
                <p className="text-xs text-blue-100">Tests Taken</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {(myResults.reduce((s, r) => s + r.percentage, 0) / myResults.length).toFixed(1)}%
                </p>
                <p className="text-xs text-blue-100">Average</p>
              </div>
              <div>
                <p className="text-2xl font-bold">#{Math.min(...myResults.map(r => r.rank))}</p>
                <p className="text-xs text-blue-100">Best Rank</p>
              </div>
            </div>
          </div>

          {/* Results List */}
          {[...myResults].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()).map(result => {
            const test = tests.find(t => t.id === result.testId);
            const testResults = getResultsByTest(result.testId);
            const totalStudents = testResults.length;
            
            return (
              <div key={result.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{test?.title || 'Test'}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{test?.subject} • {test?.date}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                    <Medal className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">#{result.rank}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{result.score}/{result.totalQuestions}</p>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{result.percentage.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500">Percentage</p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{totalStudents}</p>
                    <p className="text-xs text-gray-500">Participants</p>
                  </div>
                </div>

                {/* Leaderboard for this test */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Leaderboard</p>
                  <div className="space-y-1">
                    {testResults.sort((a, b) => a.rank - b.rank).slice(0, 5).map(r => {
                      const s = allStudents.find(st => st.id === r.studentId);
                      const isMe = r.studentId === student.id;
                      return (
                        <div key={r.id} className={`flex items-center justify-between p-2 rounded text-sm ${isMe ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' : ''}`}>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 w-6">#{r.rank}</span>
                            <span className={`font-medium ${isMe ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                              {s?.name || 'Unknown'} {isMe && '(You)'}
                            </span>
                          </div>
                          <span className="text-gray-500 dark:text-gray-400">{r.percentage.toFixed(0)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
