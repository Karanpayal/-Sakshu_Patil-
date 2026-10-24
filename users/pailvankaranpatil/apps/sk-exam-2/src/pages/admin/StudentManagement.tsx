import React, { useState } from 'react';
import { getStudents, deleteStudent, updateStudent, Student } from '../../utils/storage';
import { ArrowLeft, Edit2, Trash2, Search, UserX, Save, X } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function StudentManagement({ onBack }: Props) {
  const [students, setStudents] = useState(getStudents());
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Student>>({});

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.skId.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
    s.mobile.includes(search)
  );

  const handleEdit = (student: Student) => {
    setEditingId(student.id);
    setEditData({ ...student });
  };

  const handleSave = () => {
    if (editingId) {
      updateStudent(editingId, editData);
      setStudents(getStudents());
      setEditingId(null);
      setEditData({});
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this student? This cannot be undone.')) {
      deleteStudent(id);
      setStudents(getStudents());
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Management</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            placeholder="Search by name, ID, roll..."
          />
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <UserX className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No students registered yet</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">SK ID</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Roll No</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300 hidden sm:table-cell">Class</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">Mobile</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filtered.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3">
                      {editingId === student.id ? (
                        <input value={editData.skId || ''} disabled className="px-2 py-1 rounded border border-blue-300 bg-blue-50 dark:bg-blue-900/30 text-sm w-20 text-gray-900 dark:text-white" />
                      ) : (
                        <span className="font-mono text-blue-600 dark:text-blue-400 font-medium">{student.skId}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === student.id ? (
                        <input value={editData.rollNo || ''} onChange={e => setEditData({ ...editData, rollNo: e.target.value })}
                          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm w-16 text-gray-900 dark:text-white" />
                      ) : (
                        <span className="text-gray-900 dark:text-white">{student.rollNo}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === student.id ? (
                        <input value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })}
                          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm w-32 text-gray-900 dark:text-white" />
                      ) : (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">{student.className}</p>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {editingId === student.id ? (
                        <input value={editData.className || ''} onChange={e => setEditData({ ...editData, className: e.target.value })}
                          className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm w-20 text-gray-900 dark:text-white" />
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{student.className}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-600 dark:text-gray-300">{student.mobile}</td>
                    <td className="px-4 py-3">
                      {editingId === student.id ? (
                        <div className="flex gap-1">
                          <button onClick={handleSave} className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={() => { setEditingId(null); setEditData({}); }} className="p-1.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(student)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(student.id)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">No students match your search</div>
          )}
        </div>
      )}
    </div>
  );
}
