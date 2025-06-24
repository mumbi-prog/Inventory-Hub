
// import React, { useState } from 'react';
// import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { 
//   Laptop, 
//   Boxes,
//   Home, 
//   PlusCircle, 
//   LogOut, 
//   Menu, 
//   X,
//   User
// } from 'lucide-react';

// const Layout = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const navItems = [
//     { to: '/', icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
//     { to: '/devices', icon: <Laptop className="h-5 w-5" />, label: 'Devices' },
//     { to: '/devices/new', icon: <PlusCircle className="h-5 w-5" />, label: 'Add Device' },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
//       {/* Header */}
//       <header className="bg-white shadow-md z-10">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <Boxes className="h-8 w-8 text-primary" />
//             <h1 className="text-xl font-bold text-gray-800">DTL Inventory Hub</h1>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <div className="bg-primary/10 p-2 rounded-full">
//                 <User className="h-5 w-5 text-primary" />
//               </div>
//               <span className="font-medium">{currentUser?.name}</span>
//             </div>
//             <Button variant="outline" size="sm" onClick={handleLogout}>
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </Button>
//           </div>
          
//           <button 
//             className="md:hidden p-2 rounded-md hover:bg-gray-100"
//             onClick={toggleMobileMenu}
//           >
//             {isMobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="md:hidden bg-white shadow-lg z-20"
//         >
//           <div className="px-4 py-2 space-y-2">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 className={({ isActive }) => 
//                   `flex items-center space-x-2 px-4 py-2 rounded-md ${
//                     isActive 
//                       ? 'bg-primary text-white' 
//                       : 'hover:bg-gray-100'
//                   }`
//                 }
//                 onClick={closeMobileMenu}
//               >
//                 {item.icon}
//                 <span>{item.label}</span>
//               </NavLink>
//             ))}
//             <div className="pt-2 border-t border-gray-200">
//               <div className="flex items-center space-x-2 px-4 py-2">
//                 <div className="bg-primary/10 p-2 rounded-full">
//                   <User className="h-5 w-5 text-primary" />
//                 </div>
//                 <span className="font-medium">{currentUser?.name}</span>
//               </div>
//               <Button 
//                 variant="outline" 
//                 className="w-full mt-2"
//                 onClick={handleLogout}
//               >
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Main Content */}
//       <div className="flex flex-1">
//         {/* Sidebar - Desktop */}
//         <aside className="hidden md:block w-64 bg-white shadow-md">
//           <nav className="p-4 space-y-2">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 className={({ isActive }) => 
//                   `flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
//                     isActive 
//                       ? 'bg-primary text-white' 
//                       : 'hover:bg-gray-100'
//                   }`
//                 }
//               >
//                 {item.icon}
//                 <span>{item.label}</span>
//               </NavLink>
//             ))}
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-4 md:p-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Outlet />
//           </motion.div>
//         </main>
//       </div>
//       <footer className="row-start-3 col-span-2 fixed bottom-0 w-full bg-white shadow-md h-[35px] flex items-center justify-center text-sm text-muted-foreground">
//         © {new Date().getFullYear()} DTL Inventory Hub | By Sylvia Mumbi
//       </footer>

//     </div>
//   );
// };

// export default Layout;

import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Laptop,
  Boxes,
  Home,
  PlusCircle,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react';

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { to: '/', icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
    { to: '/devices', icon: <Laptop className="h-5 w-5" />, label: 'Devices' },
    { to: '/devices/new', icon: <PlusCircle className="h-5 w-5" />, label: 'Add Device' },
  ];

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr]">
      {/* Header */}
      <header className="row-start-1 col-span-2 z-10 bg-white shadow-md fixed top-0 w-full h-[64px]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center h-full">
          <div className="flex items-center space-x-2">
            <Boxes className="h-8 w-8 text-primary" />
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
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg z-20 mt-[64px]"
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-md ${
                    isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
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
              <Button variant="outline" className="w-full mt-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Sidebar */}
      <aside className="hidden md:block row-start-2 col-start-1 w-64 bg-white shadow-md fixed top-[64px] bottom-[48px] overflow-y-auto">
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
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
      <main className="row-start-2 col-start-2 ml-0 md:ml-64 mt-[64px] mb-[48px] overflow-y-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 col-span-2 fixed bottom-0 w-full bg-white shadow-md h-[48px] flex items-center justify-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} DTL Inventory Hub
      </footer>
    </div>
  );
};

export default Layout;

