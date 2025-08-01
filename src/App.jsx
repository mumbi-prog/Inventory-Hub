
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

// Pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import DeviceList from '@/pages/DeviceList';
import DeviceForm from '@/pages/DeviceForm';
import Layout from '@/components/Layout';

const ProtectedRoute = ({ children }) => {
  const { adminId } = useAuth();
  if (!adminId) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<DeviceList />} />
          <Route path="devices/new" element={<DeviceForm />} />
          <Route path="devices/edit/:id" element={<DeviceForm />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </motion.div>
  );
};

export default App;
