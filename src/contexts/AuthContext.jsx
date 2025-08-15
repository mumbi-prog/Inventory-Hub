
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useToast } from '@/components/ui/use-toast';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     // Check if user is logged in from localStorage
//     const user = localStorage.getItem('currentUser');
//     if (user) {
//       setCurrentUser(JSON.parse(user));
//     }
//     setLoading(false);
//   }, []);

//   const register = (email, password, name) => {
//     // Check if user already exists
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const existingUser = users.find(user => user.email === email);
    
//     if (existingUser) {
//       toast({
//         title: "Registration failed",
//         description: "User with this email already exists",
//         variant: "destructive",
//       });
//       return false;
//     }
    
//     // Create new user
//     const newUser = { id: Date.now().toString(), email, password, name };
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));
    
//     // Auto login after registration
//     setCurrentUser(newUser);
//     localStorage.setItem('currentUser', JSON.stringify(newUser));
    
//     toast({
//       title: "Registration successful",
//       description: "Your account has been created",
//     });
    
//     return true;
//   };

//   const login = (email, password) => {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const user = users.find(user => user.email === email && user.password === password);
    
//     if (user) {
//       setCurrentUser(user);
//       localStorage.setItem('currentUser', JSON.stringify(user));
      
//       toast({
//         title: "Login successful",
//         description: `Welcome back, ${user.name}!`,
//       });
      
//       return true;
//     } else {
//       toast({
//         title: "Login failed",
//         description: "Invalid email or password",
//         variant: "destructive",
//       });
      
//       return false;
//     }
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem('currentUser');
    
//     toast({
//       title: "Logged out",
//       description: "You have been logged out successfully",
//     });
//   };

//   const value = {
//     currentUser,
//     register,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };


// src/contexts/AuthContext.jsx



// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from './../axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch current admin on mount
//   useEffect(() => {
//     const fetchAdmin = async () => {
//       try {
//         const response = await axios.get('/current_admin'); // You must have this backend route
//         setAdmin(response.data.admin);
//       } catch (error) {
//         setAdmin(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdmin();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(
//         '/login',
//         { email, password },
//         { withCredentials: true }
//       );
//       setAdmin({ email }); // Optionally: response.data.admin
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error.response?.data || error.message);
//       return false;
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.delete('/logout', { withCredentials: true });
//       setAdmin(null);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ admin, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// import React, { createContext, useContext, useEffect, useState } from 'react';
// import api from '../axios'

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCurrentAdmin = async () => {
//     try {
//       const res = await api.get('/current_admin');
//       setAdmin(res.data.admin);
//     } catch (err) {
//       setAdmin(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentAdmin();
//   }, []);

//   const login = async (email, password) => {
//     const res = await api.post('/login', { email, password });
//     setAdmin(res.data.admin);
//     return true;
//   };

//   const register = async (email, password, name) => {
//     const res = await api.post('/signup', {
//       admin: { name, email, password, password_confirmation: password },
//     });
//     setAdmin(res.data.admin);
//     return true;
//   };

//   const logout = async () => {
//     await api.delete('/logout');
//     setAdmin(null);
//   };

//   return (
//     <AuthContext.Provider value={{ admin, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentAdmin = async () => {
    try {
      const res = await api.get('/current_admin');
      setAdmin(res.data.admin);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error('Error fetching current admin:', err);
      }
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentAdmin();
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
    <AuthContext.Provider
      value={{
        admin,
        currentUser: admin,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
