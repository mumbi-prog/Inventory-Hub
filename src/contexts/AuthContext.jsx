import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get('/current_admin');
        setAdmin(res.data.admin);
      } catch (err) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    setAdmin(res.data.admin);
    return true;
  };

  const register = async (email, password, name) => {
    const res = await api.post('/signup', {
      admin: { name, email, password, password_confirmation: password },
    });
    setAdmin(res.data.admin);
    return true;
  };

  const logout = async () => {
    await api.delete('/logout');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

