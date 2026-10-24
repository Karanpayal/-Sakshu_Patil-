import React, { useState } from 'react';
import { getTests, getResults, getStudents, Test } from '../../utils/storage';
import { generateAllStudentsReport, generateTestResultPDF } from '../../utils/pdfGenerator';
import { ArrowLeft, Download, FileText, Users, CheckCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function Reports({ onBack }: Props) {
  const tests = getTests();
  const results = getResults();
  const students = getStudents();
  const [downloaded, setDownloaded] = useState('');

  const handleAllStudentsReport = () => {
    generateAllStudentsReport();
    setDownloaded('all-students');
    setTimeout(() => setDownloaded(''), 3000);
  };

  const handleTestReport = (test: Test) => {
    const testResults = results.filter(r => r.testId === test.id);
    generateTestResultPDF(test, testResults);
    setDownloaded(test.id);
    setTimeout(() => setDownloaded(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Reports & Downloads</h2>

      {downloaded && (
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg mb-4">
          <CheckCircle className="w-5 h-5" /> PDF downloaded successfully!
        </div>
      )}

      {/* All Students Report */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> All Students Report
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Complete report with all students, their average scores, and rankings.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              {students.length} students • {results.length} total submissions
            </p>
          </div>
          <button
            onClick={handleAllStudentsReport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Per-Test Reports */}
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Test-wise Reports</h3>
      {tests.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No tests uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...tests].reverse().map(test => {
            const testResults = results.filter(r => r.testId === test.id);
            const avgScore = testResults.length > 0
              ? (testResults.reduce((sum, r) => sum + r.percentage, 0) / testResults.length).toFixed(1)
              : '0';
            return (
              <div key={test.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{test.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{test.subject} • {test.date}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{testResults.length} submissions</span>
                      <span>Avg: {avgScore}%</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTestReport(test)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium"
                  >
                    <Download className="w-3 h-3" /> PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
