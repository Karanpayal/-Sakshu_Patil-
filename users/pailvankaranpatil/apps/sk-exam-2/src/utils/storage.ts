// LocalStorage utility for SK_EXAM - simulated database

export interface Student {
  id: string;
  skId: string;
  rollNo: string;
  name: string;
  mobile: string;
  email: string;
  className: string;
  photo: string;
  fatherName: string;
  address: string;
  createdAt: string;
}

export interface Question {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  date: string;
  duration: number; // minutes
  questions: Question[];
  createdBy: string;
  createdAt: string;
}

export interface TestResult {
  id: string;
  studentId: string;
  testId: string;
  answers: Record<string, string>;
  score: number;
  totalQuestions: number;
  percentage: number;
  rank: number;
  submittedAt: string;
}

const KEYS = {
  STUDENTS: 'sk_students',
  TESTS: 'sk_tests',
  RESULTS: 'sk_results',
  ADMIN: 'sk_admin',
  CURRENT_USER: 'sk_current_user',
  OTP_STORE: 'sk_otp_store',
};

// Initialize default admin
export function initializeStorage() {
  if (!localStorage.getItem(KEYS.ADMIN)) {
    localStorage.setItem(KEYS.ADMIN, JSON.stringify({
      email: 'factpailvankaranpatil@gmail.com',
      password: 'Pailvan@123',
    }));
  }
  if (!localStorage.getItem(KEYS.STUDENTS)) {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.TESTS)) {
    localStorage.setItem(KEYS.TESTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.RESULTS)) {
    localStorage.setItem(KEYS.RESULTS, JSON.stringify([]));
  }
}

// Students
export function getStudents(): Student[] {
  return JSON.parse(localStorage.getItem(KEYS.STUDENTS) || '[]');
}

export function getStudentById(id: string): Student | undefined {
  return getStudents().find(s => s.id === id);
}

export function getStudentByMobile(mobile: string): Student | undefined {
  return getStudents().find(s => s.mobile === mobile);
}

export function addStudent(student: Omit<Student, 'id' | 'skId' | 'createdAt'>): Student {
  const students = getStudents();
  const nextNum = students.length + 1;
  const newStudent: Student = {
    ...student,
    id: crypto.randomUUID(),
    skId: `SK_${String(nextNum).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
  };
  students.push(newStudent);
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  return newStudent;
}

export function updateStudent(id: string, data: Partial<Student>): Student | undefined {
  const students = getStudents();
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return undefined;
  students[idx] = { ...students[idx], ...data };
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  return students[idx];
}

export function deleteStudent(id: string): boolean {
  const students = getStudents();
  const filtered = students.filter(s => s.id !== id);
  if (filtered.length === students.length) return false;
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(filtered));
  return true;
}

// Tests
export function getTests(): Test[] {
  return JSON.parse(localStorage.getItem(KEYS.TESTS) || '[]');
}

export function getTestById(id: string): Test | undefined {
  return getTests().find(t => t.id === id);
}

export function addTest(test: Omit<Test, 'id' | 'createdAt'>): Test {
  const tests = getTests();
  const newTest: Test = {
    ...test,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  tests.push(newTest);
  localStorage.setItem(KEYS.TESTS, JSON.stringify(tests));
  return newTest;
}

export function deleteTest(id: string): boolean {
  const tests = getTests();
  const filtered = tests.filter(t => t.id !== id);
  localStorage.setItem(KEYS.TESTS, JSON.stringify(filtered));
  return true;
}

// Results
export function getResults(): TestResult[] {
  return JSON.parse(localStorage.getItem(KEYS.RESULTS) || '[]');
}

export function getResultsByStudent(studentId: string): TestResult[] {
  return getResults().filter(r => r.studentId === studentId);
}

export function getResultsByTest(testId: string): TestResult[] {
  return getResults().filter(r => r.testId === testId);
}

export function addResult(result: Omit<TestResult, 'id' | 'submittedAt'>): TestResult {
  const results = getResults();
  const newResult: TestResult = {
    ...result,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };
  results.push(newResult);
  
  // Calculate ranks for this test
  const testResults = results.filter(r => r.testId === result.testId);
  testResults.push(newResult);
  testResults.sort((a, b) => b.percentage - a.percentage);
  testResults.forEach((r, idx) => {
    const rIdx = results.findIndex(x => x.id === r.id);
    if (rIdx !== -1) results[rIdx].rank = idx + 1;
  });
  
  localStorage.setItem(KEYS.RESULTS, JSON.stringify(results));
  return newResult;
}

// OTP
export function generateOTP(mobile: string): string {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpStore = JSON.parse(localStorage.getItem(KEYS.OTP_STORE) || '{}');
  otpStore[mobile] = { otp, expires: Date.now() + 5 * 60 * 1000 };
  localStorage.setItem(KEYS.OTP_STORE, JSON.stringify(otpStore));
  return otp;
}

export function verifyOTP(mobile: string, otp: string): boolean {
  const otpStore = JSON.parse(localStorage.getItem(KEYS.OTP_STORE) || '{}');
  const stored = otpStore[mobile];
  if (!stored) return false;
  if (Date.now() > stored.expires) return false;
  if (stored.otp !== otp) return false;
  delete otpStore[mobile];
  localStorage.setItem(KEYS.OTP_STORE, JSON.stringify(otpStore));
  return true;
}

// Auth
export function setCurrentUser(user: { type: 'admin' | 'student'; id: string } | null) {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
}

export function getCurrentUser(): { type: 'admin' | 'student'; id: string } | null {
  const data = localStorage.getItem(KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

export function verifyAdmin(email: string, password: string): boolean {
  const admin = JSON.parse(localStorage.getItem(KEYS.ADMIN) || '{}');
  return admin.email === email && admin.password === password;
}
