import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, setCurrentUser as saveCurrentUser, getStudentById, Student } from '../utils/storage';

interface AuthUser {
  type: 'admin' | 'student';
  id: string;
  student?: Student;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (type: 'admin' | 'student', id: string) => void;
  logout: () => void;
  refreshStudent: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const saved = getCurrentUser();
    if (saved) {
      if (saved.type === 'student') {
        const student = getStudentById(saved.id);
        if (student) {
          setUser({ type: 'student', id: saved.id, student });
        } else {
          saveCurrentUser(null);
        }
      } else {
        setUser({ type: 'admin', id: saved.id });
      }
    }
  }, []);

  const login = (type: 'admin' | 'student', id: string) => {
    const authUser: AuthUser = { type, id };
    if (type === 'student') {
      const student = getStudentById(id);
      authUser.student = student;
    }
    setUser(authUser);
    saveCurrentUser({ type, id });
  };

  const logout = () => {
    setUser(null);
    saveCurrentUser(null);
  };

  const refreshStudent = () => {
    if (user?.type === 'student') {
      const student = getStudentById(user.id);
      if (student) {
        setUser({ ...user, student });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
