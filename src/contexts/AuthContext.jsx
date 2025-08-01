
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


import React, { createContext, useContext, useState } from 'react';
import api from '@/lib/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminId, setAdminId] = useState(localStorage.getItem('admin_id') || null);

  // const login = async (email, password) => {
  //   const res = await api.post('/login', { email, password });
  //   const id = res.data.admin.id;
  //   setAdminId(id);
  //   localStorage.setItem('admin_id', id);
  //   api.defaults.headers.common['Authorization'] = id;
  //   return true;
  // };

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
  
    console.log('Login response:', res.data); // 👈 Add this line to inspect the response
  
    const id = res.data.admin.id; // This line will break if res.data.admin is undefined
    setAdminId(id);
    localStorage.setItem('admin_id', id);
    api.defaults.headers.common['Authorization'] = id;
    return true;
  };
  

  const register = async (email, password, name) => {
    const res = await api.post('/signup', {
      admin: { name, email, password }
    });
    const id = res.data.id;
    setAdminId(id);
    localStorage.setItem('admin_id', id);
    api.defaults.headers.common['Authorization'] = id;
    return true;
  };

  const logout = () => {
    setAdminId(null);
    localStorage.removeItem('admin_id');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ adminId, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

