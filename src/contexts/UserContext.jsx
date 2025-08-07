import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();



  return (
    <UserContext.Provider value={{ users, loading, deleteUser, refreshUsers: loadUsers }}>
      {children}
    </UserContext.Provider>
  );
};
