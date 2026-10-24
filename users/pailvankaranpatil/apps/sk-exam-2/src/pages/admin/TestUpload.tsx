import React, { useState } from 'react';
import { addTest, getTests, deleteTest, Question } from '../../utils/storage';
import { Plus, Trash2, ArrowLeft, BookOpen, Save, CheckCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function TestUpload({ onBack }: Props) {
  const [tests, setTests] = useState(getTests());
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [success, setSuccess] = useState('');

  const [currentQ, setCurrentQ] = useState({
    question: '', optionA: '', optionB: '', optionC: '', optionD: '',
    correctAnswer: 'A', explanation: '',
  });

  const addQuestion = () => {
    if (!currentQ.question || !currentQ.optionA || !currentQ.optionB || !currentQ.optionC || !currentQ.optionD) {
      alert('Please fill all question fields');
      return;
    }
    setQuestions([...questions, { ...currentQ, id: crypto.randomUUID() }]);
    setCurrentQ({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 'A', explanation: '' });
  };

  const removeQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleSaveTest = () => {
    if (!title || !subject || questions.length === 0) {
      alert('Please fill test details and add at least 1 question');
      return;
    }
    addTest({ title, subject, date, duration, questions, createdBy: 'admin' });
    setTests(getTests());
    setShowForm(false);
    setTitle('');
    setSubject('');
    setQuestions([]);
    setSuccess('Test uploaded successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteTest = (id: string) => {
    if (confirm('Are you sure you want to delete this test?')) {
      deleteTest(id);
      setTests(getTests());
    }
  };

  if (showForm) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <button onClick={() => setShowForm(false)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Tests
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upload New Test</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test Title *</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Daily Test - 24 Oct" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Mathematics" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
              <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          {/* Add Question */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Add Question</h3>
            <div className="space-y-3">
              <textarea value={currentQ.question} onChange={e => setCurrentQ({ ...currentQ, question: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter question..." rows={2} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" value={currentQ.optionA} onChange={e => setCurrentQ({ ...currentQ, optionA: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Option A" />
                <input type="text" value={currentQ.optionB} onChange={e => setCurrentQ({ ...currentQ, optionB: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Option B" />
                <input type="text" value={currentQ.optionC} onChange={e => setCurrentQ({ ...currentQ, optionC: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Option C" />
                <input type="text" value={currentQ.optionD} onChange={e => setCurrentQ({ ...currentQ, optionD: e.target.value })}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Option D" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correct Answer</label>
                  <select value={currentQ.correctAnswer} onChange={e => setCurrentQ({ ...currentQ, correctAnswer: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Explanation</label>
                  <input type="text" value={currentQ.explanation} onChange={e => setCurrentQ({ ...currentQ, explanation: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Explain the answer" />
                </div>
              </div>
              <button onClick={addQuestion} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium">
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>
          </div>

          {/* Questions List */}
          {questions.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Questions ({questions.length})</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {questions.map((q, i) => (
                  <div key={q.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Q{i + 1}. {q.question}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Answer: {q.correctAnswer}</p>
                    </div>
                    <button onClick={() => removeQuestion(i)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleSaveTest} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
            <Save className="w-4 h-4" /> Save Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Test Management</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" /> Upload Test
        </button>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg mb-4">
          <CheckCircle className="w-5 h-5" /> {success}
        </div>
      )}

      {tests.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No tests uploaded yet</p>
          <button onClick={() => setShowForm(true)} className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
            Upload your first test
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {[...tests].reverse().map(test => (
            <div key={test.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{test.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{test.subject} • {test.date} • {test.duration} min</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{test.questions.length} questions</p>
                </div>
                <button onClick={() => handleDeleteTest(test.id)} className="text-red-500 hover:text-red-700 p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
