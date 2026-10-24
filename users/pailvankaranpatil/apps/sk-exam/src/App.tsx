import { useState, useEffect, useCallback } from 'react';
import {
  subjects,
  generateDailyTest,
  generatePracticeTest,
  type Question,
  type DailyTest,
} from './data/questions';

type Screen = 'home' | 'quiz' | 'results' | 'review' | 'history' | 'practice-setup';

interface Answer {
  questionId: number;
  selected: number;
  correct: number;
  isCorrect: boolean;
}

interface TestResult {
  date: string;
  score: number;
  total: number;
  percentage: number;
  answers: Answer[];
  questions: Question[];
  mode: 'daily' | 'practice';
}

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentTest, setCurrentTest] = useState<DailyTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [testMode, setTestMode] = useState<'daily' | 'practice'>('daily');
  const [history, setHistory] = useState<TestResult[]>([]);

  // Practice setup state
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [practiceCount, setPracticeCount] = useState(20);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sk_exam_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const saveHistory = useCallback((newHistory: TestResult[]) => {
    setHistory(newHistory);
    localStorage.setItem('sk_exam_history', JSON.stringify(newHistory));
  }, []);

  const startDailyTest = () => {
    const test = generateDailyTest(20);
    setCurrentTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setTestMode('daily');
    setScreen('quiz');
  };

  const startPracticeTest = () => {
    const test = generatePracticeTest(selectedSubjects, practiceCount, selectedDifficulty);
    if (test.questions.length === 0) {
      alert('निवडलेल्या विषयांमध्ये प्रश्न उपलब्ध नाहीत. कृपया वेगळे विषय निवडा.');
      return;
    }
    setCurrentTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setTestMode('practice');
    setScreen('quiz');
  };

  const handleAnswer = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(optionIndex);
  };

  const confirmAnswer = () => {
    if (selectedAnswer === null || !currentTest) return;
    setShowExplanation(true);
    const q = currentTest.questions[currentQuestionIndex];
    const newAnswer: Answer = {
      questionId: q.id,
      selected: selectedAnswer,
      correct: q.correct,
      isCorrect: selectedAnswer === q.correct,
    };
    setAnswers(prev => [...prev, newAnswer]);
  };

  const nextQuestion = () => {
    if (!currentTest) return;
    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    if (!currentTest) return;
    const score = answers.filter(a => a.isCorrect).length;
    const result: TestResult = {
      date: new Date().toISOString().split('T')[0],
      score,
      total: currentTest.questions.length,
      percentage: Math.round((score / currentTest.questions.length) * 100),
      answers,
      questions: currentTest.questions,
      mode: testMode,
    };
    const newHistory = [result, ...history].slice(0, 30);
    saveHistory(newHistory);
    setScreen('results');
  };

  const startReview = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(true);
    setScreen('review');
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  const toggleDifficulty = (diff: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
    );
  };

  const getTodayMarathi = () => {
    const today = new Date();
    const months = ['जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'];
    const days = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
    return `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  };

  const isDailyTestTaken = () => {
    const today = new Date().toISOString().split('T')[0];
    return history.some(h => h.date === today && h.mode === 'daily');
  };

  const getStreak = () => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      if (history.some(h => h.date === dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  };

  // HOME SCREEN
  const renderHome = () => {
    const streak = getStreak();
    const todayTaken = isDailyTestTaken();
    const totalTests = history.length;
    const avgScore = totalTests > 0
      ? Math.round(history.reduce((sum, h) => sum + h.percentage, 0) / totalTests)
      : 0;

    return (
      <div className="home-screen">
        <div className="app-header">
          <div className="logo-section">
            <div className="logo-icon">📝</div>
            <div>
              <h1 className="app-title">SK_EXAM</h1>
              <p className="app-subtitle">रोजचा परीक्षा • ज्ञानाचा मार्ग</p>
            </div>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{streak}</span>
            <span className="stat-label">दिवस स्ट्रीक</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <span className="stat-value">{totalTests}</span>
            <span className="stat-label">एकूण टेस्ट</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">{avgScore}%</span>
            <span className="stat-label">सरासरी स्कोअर</span>
          </div>
        </div>

        <div className="date-display">
          <span className="date-icon">📅</span>
          <span>{getTodayMarathi()}</span>
        </div>

        <div className={`daily-card ${todayTaken ? 'completed' : ''}`}>
          <div className="daily-card-header">
            <span className="daily-badge">📖 दैनिक परीक्षा</span>
            {todayTaken && <span className="completed-badge">✅ पूर्ण झाले</span>}
          </div>
          <div className="daily-card-body">
            <h2>आजचा टेस्ट</h2>
            <p>दररोज २० नवीन प्रश्न • सर्व विषांमधून • Explanation सह</p>
            <div className="daily-card-info">
              <span>⏱️ ~१५ मिनिटे</span>
              <span>📝 २० प्रश्न</span>
              <span>🏆 गुण मिळवा</span>
            </div>
            <button className={`btn btn-primary ${todayTaken ? 'btn-retake' : ''}`} onClick={startDailyTest}>
              {todayTaken ? '🔄 पुन्हा द्या' : '🚀 टेस्ट सुरू करा'}
            </button>
          </div>
        </div>

        <div className="practice-card" onClick={() => setScreen('practice-setup')}>
          <div className="practice-card-header">
            <span className="practice-badge">🎯 सराव परीक्षा</span>
          </div>
          <div className="practice-card-body">
            <h2>प्रॅक्टिस टेस्ट</h2>
            <p>विषय निवडा • कठीणताई निवडा • स्वतःची टेस्ट तयार करा</p>
            <button className="btn btn-outline" onClick={(e) => { e.stopPropagation(); setScreen('practice-setup'); }}>
              ✏️ सराव सुरू करा
            </button>
          </div>
        </div>

        <div className="history-section">
          <button className="btn btn-ghost" onClick={() => setScreen('history')}>
            📜 परीक्षा इतिहास पहा
          </button>
        </div>
      </div>
    );
  };

  // PRACTICE SETUP
  const renderPracticeSetup = () => (
    <div className="practice-setup-screen">
      <div className="setup-header-bar">
        <button className="back-btn" onClick={() => setScreen('home')}>← मागे</button>
        <h2>🎯 सराव परीक्षा तयार करा</h2>
      </div>
      <div className="setup-body">
        <div className="setup-section">
          <h3>📚 विषय निवडा (रिकामे सोडल्यास सर्व विषय)</h3>
          <div className="subject-grid">
            {subjects.map(s => (
              <button key={s} className={`subject-chip ${selectedSubjects.includes(s) ? 'active' : ''}`} onClick={() => toggleSubject(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="setup-section">
          <h3>⚡ कठीणताई निवडा</h3>
          <div className="difficulty-grid-setup">
            {[
              { key: 'easy', label: 'सोपे', color: '#4caf50' },
              { key: 'medium', label: 'मध्यम', color: '#ff9800' },
              { key: 'hard', label: 'कठीण', color: '#f44336' },
            ].map(d => (
              <button key={d.key} className={`diff-chip ${selectedDifficulty.includes(d.key) ? 'active' : ''}`} style={{ '--diff-color': d.color } as React.CSSProperties} onClick={() => toggleDifficulty(d.key)}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div className="setup-section">
          <h3>📝 प्रश्नांची संख्या: {practiceCount}</h3>
          <input type="range" min="5" max="50" value={practiceCount} onChange={e => setPracticeCount(parseInt(e.target.value))} className="range-slider" />
          <div className="range-labels"><span>५</span><span>२५</span><span>५०</span></div>
        </div>
        <button className="btn btn-primary btn-large" onClick={startPracticeTest}>
          🚀 टेस्ट सुरू करा ({practiceCount} प्रश्न)
        </button>
      </div>
    </div>
  );

  // QUIZ SCREEN
  const renderQuiz = () => {
    if (!currentTest) return null;
    const question = currentTest.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100;
    const currentAnswer = answers.find(a => a.questionId === question.id);

    return (
      <div className="quiz-screen">
        <div className="quiz-progress">
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <div className="progress-text">
            <span>प्रश्न {currentQuestionIndex + 1} / {currentTest.questions.length}</span>
            <span className="subject-tag">{question.subject}</span>
          </div>
        </div>

        <div className="question-card">
          <div className="question-number">
            प्रश्न {currentQuestionIndex + 1}
            <span className={`diff-badge diff-${question.difficulty}`}>
              {question.difficulty === 'easy' ? 'सोपे' : question.difficulty === 'medium' ? 'मध्यम' : 'कठीण'}
            </span>
          </div>
          <h2 className="question-text">{question.question}</h2>

          <div className="options-list">
            {question.options.map((option, idx) => {
              let optionClass = 'option-item';
              if (showExplanation) {
                if (idx === question.correct) optionClass += ' correct';
                else if (idx === selectedAnswer && idx !== question.correct) optionClass += ' wrong';
              } else if (selectedAnswer === idx) {
                optionClass += ' selected';
              }
              return (
                <button key={idx} className={optionClass} onClick={() => handleAnswer(idx)} disabled={showExplanation}>
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                  {showExplanation && idx === question.correct && <span className="option-icon correct-icon">✓</span>}
                  {showExplanation && idx === selectedAnswer && idx !== question.correct && <span className="option-icon wrong-icon">✗</span>}
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className={`explanation-card ${currentAnswer?.isCorrect ? 'correct-explanation' : 'wrong-explanation'}`}>
            <div className="explanation-header">
              <span className="explanation-icon">{currentAnswer?.isCorrect ? '🎉' : '💡'}</span>
              <span className="explanation-title">{currentAnswer?.isCorrect ? 'बरोबर! शाबास!' : 'स्पष्टीकरण'}</span>
            </div>
            <p className="explanation-text">{question.explanation}</p>
          </div>
        )}

        <div className="quiz-actions">
          {!showExplanation ? (
            <button className="btn btn-primary" onClick={confirmAnswer} disabled={selectedAnswer === null}>
              ✓ उत्तर तपासा
            </button>
          ) : (
            <button className="btn btn-primary" onClick={nextQuestion}>
              {currentQuestionIndex < currentTest.questions.length - 1 ? 'पुढचा प्रश्न →' : '📊 निकाल पहा'}
            </button>
          )}
        </div>
      </div>
    );
  };

  // REVIEW SCREEN
  const renderReview = () => {
    if (!currentTest) return null;
    const question = currentTest.questions[currentQuestionIndex];
    const answer = answers.find(a => a.questionId === question.id);

    return (
      <div className="review-screen">
        <div className="review-header-bar">
          <button className="back-btn" onClick={() => setScreen('results')}>← निकालावर जा</button>
          <h3>पुनरावलोकन: {currentQuestionIndex + 1} / {currentTest.questions.length}</h3>
        </div>

        <div className="question-card">
          <div className="question-number">
            प्रश्न {currentQuestionIndex + 1}
            <span className={`diff-badge diff-${question.difficulty}`}>
              {question.difficulty === 'easy' ? 'सोपे' : question.difficulty === 'medium' ? 'मध्यम' : 'कठीण'}
            </span>
          </div>
          <h2 className="question-text">{question.question}</h2>

          <div className="options-list">
            {question.options.map((option, idx) => {
              let optionClass = 'option-item';
              if (idx === question.correct) optionClass += ' correct';
              else if (answer && idx === answer.selected && idx !== question.correct) optionClass += ' wrong';
              return (
                <div key={idx} className={optionClass}>
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                  {idx === question.correct && <span className="option-icon correct-icon">✓</span>}
                  {answer && idx === answer.selected && idx !== question.correct && <span className="option-icon wrong-icon">✗</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="explanation-card correct-explanation">
          <div className="explanation-header">
            <span className="explanation-icon">💡</span>
            <span className="explanation-title">स्पष्टीकरण</span>
          </div>
          <p className="explanation-text">{question.explanation}</p>
        </div>

        <div className="review-nav">
          <button className="btn btn-outline" onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0}>
            ← मागील
          </button>
          <span className="review-counter">{currentQuestionIndex + 1} / {currentTest.questions.length}</span>
          <button className="btn btn-outline" onClick={() => setCurrentQuestionIndex(prev => Math.min(currentTest.questions.length - 1, prev + 1))} disabled={currentQuestionIndex === currentTest.questions.length - 1}>
            पुढील →
          </button>
        </div>
      </div>
    );
  };

  // RESULTS SCREEN
  const renderResults = () => {
    if (history.length === 0) return null;
    const latestResult = history[0];
    const { score, total, percentage } = latestResult;
    const grade = percentage >= 80 ? 'A+' : percentage >= 60 ? 'B+' : percentage >= 40 ? 'C' : 'D';
    const gradeColor = percentage >= 80 ? '#4caf50' : percentage >= 60 ? '#2196f3' : percentage >= 40 ? '#ff9800' : '#f44336';
    const emoji = percentage >= 80 ? '🏆' : percentage >= 60 ? '👏' : percentage >= 40 ? '💪' : '📚';

    return (
      <div className="results-screen">
        <div className="results-header">
          <h2>📊 परीक्षा निकाल</h2>
          <p>{latestResult.date} • {latestResult.mode === 'daily' ? 'दैनिक परीक्षा' : 'सराव परीक्षा'}</p>
        </div>

        <div className="score-circle" style={{ '--score-color': gradeColor } as React.CSSProperties}>
          <div className="score-inner">
            <span className="score-emoji">{emoji}</span>
            <span className="score-value">{percentage}%</span>
            <span className="score-text">{score} / {total} बरोबर</span>
          </div>
        </div>

        <div className="grade-display" style={{ color: gradeColor }}>ग्रेड: {grade}</div>

        <div className="breakdown-card">
          <h3>📋 विषयनिहाय विश्लेषण</h3>
          {(() => {
            const subjectStats: Record<string, { correct: number; total: number }> = {};
            latestResult.questions.forEach((q, idx) => {
              if (!subjectStats[q.subject]) subjectStats[q.subject] = { correct: 0, total: 0 };
              subjectStats[q.subject].total++;
              if (latestResult.answers[idx]?.isCorrect) subjectStats[q.subject].correct++;
            });
            return Object.entries(subjectStats).map(([subject, stats]) => (
              <div key={subject} className="breakdown-row">
                <span className="breakdown-subject">{subject}</span>
                <div className="breakdown-bar-container">
                  <div className="breakdown-bar" style={{ width: `${(stats.correct / stats.total) * 100}%`, backgroundColor: (stats.correct / stats.total) >= 0.7 ? '#4caf50' : (stats.correct / stats.total) >= 0.4 ? '#ff9800' : '#f44336' }} />
                </div>
                <span className="breakdown-score">{stats.correct}/{stats.total}</span>
              </div>
            ));
          })()}
        </div>

        <div className="results-actions">
          <button className="btn btn-primary" onClick={startReview}>📖 प्रत्येक प्रश्नाचे Explanation पहा</button>
          <button className="btn btn-outline" onClick={() => setScreen('home')}>🏠 मुख्यपृष्ठ</button>
        </div>
      </div>
    );
  };

  // HISTORY SCREEN
  const renderHistory = () => (
    <div className="history-screen">
      <div className="history-header-bar">
        <button className="back-btn" onClick={() => setScreen('home')}>← मागे</button>
        <h2>📜 परीक्षा इतिहास</h2>
      </div>
      {history.length === 0 ? (
        <div className="empty-history">
          <span className="empty-icon">📭</span>
          <p>अद्याप कोणतीही परीक्षा दिली नाही.</p>
          <button className="btn btn-primary" onClick={() => setScreen('home')}>🚀 पहिली टेस्ट द्या</button>
        </div>
      ) : (
        <div className="history-list">
          {history.map((h, idx) => (
            <div key={idx} className="history-item">
              <div className="history-left">
                <span className="history-date">{h.date}</span>
                <span className="history-mode">{h.mode === 'daily' ? '📖 दैनिक' : '🎯 सराव'}</span>
              </div>
              <div className="history-right">
                <div className="history-score" style={{ color: h.percentage >= 80 ? '#4caf50' : h.percentage >= 60 ? '#2196f3' : h.percentage >= 40 ? '#ff9800' : '#f44336' }}>
                  {h.percentage}%
                </div>
                <span className="history-detail">{h.score}/{h.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="app-container">
      {screen === 'home' && renderHome()}
      {screen === 'practice-setup' && renderPracticeSetup()}
      {screen === 'quiz' && renderQuiz()}
      {screen === 'results' && renderResults()}
      {screen === 'review' && renderReview()}
      {screen === 'history' && renderHistory()}
    </div>
  );
}

export default App;
