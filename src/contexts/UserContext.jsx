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

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`/users/${id}`);
//       setUsers(prev => prev.filter(user => user.id !== id));
//       toast({
//         title: 'User deleted',
//         description: 'User removed successfully.',
//       });
//     } catch (error) {
//       toast({
//         title: 'Error deleting user',
//         description: 'Could not delete user.',
//         variant: 'destructive',
//       });
//     }
//   };

async function deleteUser(id) {
    try {
      await axios.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success('User deleted.');
    } catch (err) {
      toast.error('Failed to delete user.');
      throw err;
    }
  }
  

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, deleteUser, refreshUsers: loadUsers }}>
      {children}
    </UserContext.Provider>
  );
};
