import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getTests, getResultsByStudent, addResult, Test } from '../../utils/storage';
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function TakeTest({ onBack }: Props) {
  const { user } = useAuth();
  const student = user?.student;
  if (!student) return null;

  const tests = getTests();
  const myResults = getResultsByStudent(student.id);
  const pendingTests = tests.filter(t => !myResults.find(r => r.testId === t.id));

  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedTest && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            handleSubmit();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedTest, timeLeft > 0]);

  const startTest = (test: Test) => {
    setSelectedTest(test);
    setTimeLeft(test.duration * 60);
    setAnswers({});
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selectedTest || !student) return;

    let correct = 0;
    selectedTest.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });

    const percentage = (correct / selectedTest.questions.length) * 100;

    // Get all results for this test to calculate rank
    const existingResults = getResultsByStudent(student.id).filter(r => r.testId === selectedTest.id);
    
    addResult({
      studentId: student.id,
      testId: selectedTest.id,
      answers,
      score: correct,
      totalQuestions: selectedTest.questions.length,
      percentage,
      rank: 0, // Will be recalculated
    });

    setScore(correct);
    setSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Test Selection Screen
  if (!selectedTest) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Available Tests</h2>

        {pendingTests.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-900 dark:text-white font-medium">All caught up!</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">No pending tests. Check back later for new tests.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTests.map(test => (
              <div key={test.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{test.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{test.subject} • {test.questions.length} questions • {test.duration} min</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Date: {test.date}</p>
                </div>
                <button onClick={() => startTest(test)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                  Start Test
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Result Screen
  if (submitted) {
    const percentage = (score / selectedTest.questions.length) * 100;
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${percentage >= 60 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
              {percentage >= 60 ? <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" /> : <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Test Submitted!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{selectedTest.title}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}/{selectedTest.questions.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{percentage.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Percentage</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                #{getResultsByStudent(student.id).find(r => r.testId === selectedTest.id)?.rank || '-'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Rank</p>
            </div>
          </div>

          {/* Explanations */}
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Answer Explanations</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {selectedTest.questions.map((q, i) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Q{i + 1}. {q.question}</p>
                  <div className="mt-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-300">Your answer: <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{userAnswer ? q[`option${userAnswer}` as keyof typeof q] : 'Not answered'}</span></p>
                    {!isCorrect && <p className="text-green-600 dark:text-green-400">Correct answer: {q[`option${q.correctAnswer}` as keyof typeof q]}</p>}
                    {q.explanation && <p className="text-gray-500 dark:text-gray-400 mt-1 italic">💡 {q.explanation}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => { setSelectedTest(null); setSubmitted(false); }} className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  // Test Taking Screen
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Timer Bar */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 mb-4 flex items-center justify-between shadow-sm">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{selectedTest.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{selectedTest.questions.length} Questions</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${timeLeft < 60 ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'}`}>
          <Clock className="w-4 h-4" />
          <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {selectedTest.questions.map((q, i) => (
          <div key={q.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <p className="font-medium text-gray-900 dark:text-white mb-3">
              <span className="text-blue-600 dark:text-blue-400">Q{i + 1}.</span> {q.question}
            </p>
            <div className="space-y-2">
              {['A', 'B', 'C', 'D'].map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  answers[q.id] === opt
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}>
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium text-gray-500 dark:text-gray-400 mr-2">{opt})</span>
                    {q[`option${opt}` as keyof typeof q]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-lg">
        Submit Test
      </button>
    </div>
  );
}
