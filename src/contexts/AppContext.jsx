import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('osas_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        setCurrentUser(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('osas_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('osas_user');
    }
  }, [currentUser]);

  async function loginUser(credentials) {
    // backend expects { email, password }
    const payload = {
      email: credentials.email || credentials.username || '',
      password: credentials.password || '',
    };
    if (!payload.email || !payload.password) {
      return { success: false, message: 'Email and password are required' };
    }
    setIsAuthenticating(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = data?.error || data?.message || 'Login failed';
        return { success: false, message };
      }
      // success shape from backend: { message, user: { id, username, email } }
      const user = data?.user || null;
      setCurrentUser(user);
      return { success: true, user };
    } catch (err) {
      return { success: false, message: err?.message || 'Network error' };
    } finally {
      setIsAuthenticating(false);
    }
  }

  function logout() {
    setCurrentUser(null);
  }

  const isAdmin = currentUser?.role === 'admin';
  const isStaff = currentUser?.role === 'staff';
  const isStudent = currentUser?.role === 'student';

  const value = useMemo(() => ({ 
    currentUser, 
    isAuthenticating, 
    loginUser, 
    logout,
    isAdmin,
    isStaff,
    isStudent
  }), [currentUser, isAuthenticating, isAdmin, isStaff, isStudent]);

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

export default AppContext;
