
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Laptop, Home, PlusCircle, LogOut, Menu, X,User} from 'lucide-react';

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      <motion.nav
        className={`bg-gray-800 text-white w-64 p-4 ${isOpen ? 'block' : 'hidden'} md:block`}
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        exit={{ x: -250 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        <ul>
          <li>
            <NavLink to="/dashboard" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <Home size={20} className="mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/devices" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <Laptop size={20} className="mr-2" />
              Devices
            </NavLink>
          </li>
          <li>
            <NavLink to="/devices/new" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <PlusCircle size={20} className="mr-2" />
              Add Device
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <User size={20} className="mr-2" />
              Profile
            </NavLink>
          </li>
          <li>
            <Button variant="ghost" onClick={handleLogout} className="w-full text-left">
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </li>
        </ul>
      </motion.nav>

      <div className={`flex-1
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Laptop className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-gray-800">DTL Inventory Hub</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">{currentUser?.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg z-20"
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center space-x-2 px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-100'
                  }`
                }
                onClick={closeMobileMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2 px-4 py-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{currentUser?.name}</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white shadow-md">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
