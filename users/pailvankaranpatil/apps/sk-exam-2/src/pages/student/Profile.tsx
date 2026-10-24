import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateStudent } from '../../utils/storage';
import { ArrowLeft, Camera, Save, CheckCircle, User, Phone, Mail, BookOpen, MapPin, Hash } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function Profile({ onBack }: Props) {
  const { user, refreshStudent } = useAuth();
  const student = user?.student;
  if (!student) return null;

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: student.name,
    email: student.email,
    className: student.className,
    rollNo: student.rollNo,
    fatherName: student.fatherName,
    address: student.address,
    photo: student.photo,
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateStudent(student.id, form);
    refreshStudent();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {saved && (
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg mb-4">
          <CheckCircle className="w-5 h-5" /> Profile updated successfully!
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/50">
                {form.photo ? (
                  <img src={form.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-white/70" />
                )}
              </div>
              {editing && (
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 cursor-pointer shadow-md">
                  <Camera className="w-3 h-3 text-blue-600" />
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-blue-100 font-mono">{student.skId}</p>
              <p className="text-blue-200 text-sm">Class {student.className} • Roll No: {student.rollNo}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">Personal Details</h3>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">
                  <Save className="w-3 h-3" /> Save
                </button>
                <button onClick={() => { setEditing(false); setForm({ name: student.name, email: student.email, className: student.className, rollNo: student.rollNo, fatherName: student.fatherName, address: student.address, photo: student.photo }); }} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Hash className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">SK ID</p>
                <p className="font-mono font-medium text-gray-900 dark:text-white">{student.skId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Hash className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Roll Number</p>
                {editing ? (
                  <input value={form.rollNo} onChange={e => setForm({ ...form, rollNo: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white outline-none text-sm" />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{student.rollNo}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <User className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
                {editing ? (
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white outline-none text-sm" />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <BookOpen className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Class</p>
                {editing ? (
                  <input value={form.className} onChange={e => setForm({ ...form, className: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white outline-none text-sm" />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{student.className}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Phone className="w-5 h-5 text-teal-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mobile</p>
                <p className="font-medium text-gray-900 dark:text-white">{student.mobile}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Mail className="w-5 h-5 text-pink-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                {editing ? (
                  <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white outline-none text-sm" />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{student.email || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg sm:col-span-2">
              <User className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Father's Name</p>
                {editing ? (
                  <input value={form.fatherName} onChange={e => setForm({ ...form, fatherName: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white outline-none text-sm" />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{student.fatherName || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg sm:col-span-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                {editing ? (
                  <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white outline-none text-sm" rows={2} />
                ) : (
                  <p className="font-medium text-gray-900 dark:text-white">{student.address || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
