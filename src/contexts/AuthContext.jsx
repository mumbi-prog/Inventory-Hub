
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const register = (email, password, name) => {
   
    
    // Create new user
    const newUser = { id: Date.now().toString(), email, password, name };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log in user after registratin
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: "Your account has been created",
    });
    
    return true;
  };


  

  

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
