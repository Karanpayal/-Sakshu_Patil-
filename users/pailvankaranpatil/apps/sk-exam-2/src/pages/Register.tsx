import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addStudent, generateOTP, verifyOTP, getStudentByMobile } from '../utils/storage';
import { GraduationCap, User, Phone, Lock, Mail, BookOpen, ArrowRight, ArrowLeft, MapPin, UserCircle } from 'lucide-react';

export default function Register({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const { login } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [className, setClassName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [address, setAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = () => {
    setError('');
    if (mobile.length !== 10) {
      setError('Enter valid 10-digit mobile number');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (getStudentByMobile(mobile)) {
      setError('This mobile number is already registered. Please login.');
      return;
    }
    const otpCode = generateOTP(mobile);
    setGeneratedOtp(otpCode);
    setStep(2);
    alert(`Your OTP is: ${otpCode}\n(In production, this would be sent via SMS)`);
  };

  const handleVerifyOTP = () => {
    setError('');
    if (verifyOTP(mobile, otp)) {
      setStep(3);
    } else {
      setError('Invalid or expired OTP');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!className || !rollNo) {
      setError('Please fill all required fields');
      return;
    }
    const student = addStudent({
      name,
      mobile,
      email,
      className,
      rollNo,
      fatherName,
      address,
      photo: '',
    });
    login('student', student.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Registration</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create your SK_EXAM account</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Enter full name" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="10-digit mobile number" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="email@example.com" />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button onClick={handleSendOTP} className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                Send OTP <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Verify OTP</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">OTP sent to +91 {mobile}</p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter 4-digit OTP</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none text-center text-2xl tracking-widest"
                    placeholder="• • • •" required />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={handleVerifyOTP} className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
                  Verify <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleRegister} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Academic Details</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class *</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={className} onChange={e => setClassName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="e.g. 10th" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Roll No *</label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={rollNo} onChange={e => setRollNo(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="e.g. 01" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Father's Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" value={fatherName} onChange={e => setFatherName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Father's name" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea value={address} onChange={e => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Your address" rows={2} />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md">
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <button onClick={onSwitchToLogin} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
