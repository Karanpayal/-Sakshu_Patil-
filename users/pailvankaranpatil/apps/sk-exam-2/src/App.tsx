import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { initializeStorage } from './utils/storage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import TestUpload from './pages/admin/TestUpload';
import StudentManagement from './pages/admin/StudentManagement';
import Reports from './pages/admin/Reports';
import Analytics from './pages/admin/Analytics';
import StudentDashboard from './pages/student/StudentDashboard';
import TakeTest from './pages/student/TakeTest';
import Results from './pages/student/Results';
import ProgressChart from './pages/student/ProgressChart';
import Profile from './pages/student/Profile';

function AppContent() {
  const { user } = useAuth();
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');
  const [adminPage, setAdminPage] = useState('dashboard');
  const [studentPage, setStudentPage] = useState('dashboard');

  useEffect(() => {
    initializeStorage();
  }, []);

  if (!user) {
    if (authPage === 'register') {
      return <Register onSwitchToLogin={() => setAuthPage('login')} />;
    }
    return <Login onSwitchToRegister={() => setAuthPage('register')} />;
  }

  if (user.type === 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        {adminPage === 'dashboard' && <AdminDashboard onNavigate={setAdminPage} />}
        {adminPage === 'test-upload' && <TestUpload onBack={() => setAdminPage('dashboard')} />}
        {adminPage === 'students' && <StudentManagement onBack={() => setAdminPage('dashboard')} />}
        {adminPage === 'reports' && <Reports onBack={() => setAdminPage('dashboard')} />}
        {adminPage === 'analytics' && <Analytics onBack={() => setAdminPage('dashboard')} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {studentPage === 'dashboard' && <StudentDashboard onNavigate={setStudentPage} />}
      {studentPage === 'take-test' && <TakeTest onBack={() => setStudentPage('dashboard')} />}
      {studentPage === 'results' && <Results onBack={() => setStudentPage('dashboard')} />}
      {studentPage === 'progress' && <ProgressChart onBack={() => setStudentPage('dashboard')} />}
      {studentPage === 'profile' && <Profile onBack={() => setStudentPage('dashboard')} />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
