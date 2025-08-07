import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      toast({
        title: 'Error loading users',
        description: 'Could not fetch users from the server.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <UserContext.Provider value={{ users, loading, deleteUser, refreshUsers: loadUsers }}>
      {children}
    </UserContext.Provider>
  );
};
