import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { verifyAdmin, getStudentByMobile, generateOTP, verifyOTP } from '../utils/storage';
import { GraduationCap, Shield, Phone, Lock, Mail, ArrowRight, Eye, EyeOff, MessageSquare, Copy, CheckCircle } from 'lucide-react';

export default function Login({ onSwitchToRegister }: { onSwitchToRegister: () => void }) {
  const { login } = useAuth();
  const [loginType, setLoginType] = useState<'admin' | 'student'>('student');
  
  // Admin state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminError, setAdminError] = useState('');
  
  // Student state
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [studentError, setStudentError] = useState('');
  const [otpCopied, setOtpCopied] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    if (verifyAdmin(adminEmail, adminPassword)) {
      login('admin', 'admin');
    } else {
      setAdminError('Invalid email or password');
    }
  };

  const handleSendOTP = () => {
    setStudentError('');
    if (mobile.length !== 10) {
      setStudentError('Please enter a valid 10-digit mobile number');
      return;
    }
    const student = getStudentByMobile(mobile);
    if (!student) {
      setStudentError('Mobile number not registered. Please register first.');
      return;
    }
    const otpCode = generateOTP(mobile);
    setGeneratedOtp(otpCode);
    setOtpSent(true);
  };

  const handleCopyOTP = () => {
    navigator.clipboard.writeText(generatedOtp);
    setOtpCopied(true);
    setTimeout(() => setOtpCopied(false), 2000);
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');
    if (verifyOTP(mobile, otp)) {
      const student = getStudentByMobile(mobile);
      if (student) {
        login('student', student.id);
      } else {
        setStudentError('Student not found');
      }
    } else {
      setStudentError('Invalid or expired OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SK_EXAM</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Exam Management System</p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => { setLoginType('student'); setStudentError(''); setAdminError(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
              loginType === 'student'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Student Login
          </button>
          <button
            onClick={() => { setLoginType('admin'); setStudentError(''); setAdminError(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
              loginType === 'admin'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Shield className="w-4 h-4" />
            Head Login
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          {loginType === 'admin' ? (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Head Login</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admin access only</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={e => setAdminEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {adminError && <p className="text-red-500 text-sm">{adminError}</p>}

              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md">
                Login as Head <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Student Login</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Login with mobile & OTP</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>
              </div>

              {!otpSent ? (
                <button type="button" onClick={handleSendOTP} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                  Send OTP
                </button>
              ) : (
                <>
                  {/* OTP Display Box */}
                  <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">OTP Sent Successfully!</span>
                    </div>
                    <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-md p-3 border border-green-300 dark:border-green-600">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Your OTP is:</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 tracking-widest">{generatedOtp}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyOTP}
                        className="flex items-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
                      >
                        {otpCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {otpCopied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-2">
                      💡 In production, this OTP would be sent via SMS to +91 {mobile}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter OTP</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={otp}
                        onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="4-digit OTP"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md">
                    Verify & Login <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {studentError && <p className="text-red-500 text-sm">{studentError}</p>}

              <div className="text-center pt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Don't have an account?{' '}
                  <button type="button" onClick={onSwitchToRegister} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                    Register here
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
