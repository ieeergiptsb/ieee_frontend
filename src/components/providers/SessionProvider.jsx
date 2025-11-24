"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/lib/auth';

const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  refreshUser: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within SessionProvider');
  }
  return context;
};

export default function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshUser = async () => {
    if (authService.isAuthenticated()) {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(!!userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        setIsAuthenticated(false);
        authService.removeToken();
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
