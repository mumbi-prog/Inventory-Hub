
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from '@/App';
// import '@/index.css';
// import { AuthProvider } from '@/contexts/AuthContext';
// import { DeviceProvider } from '@/contexts/DeviceContext';
// import { Toaster } from '@/components/ui/toaster';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <DeviceProvider>
//           <App />
//           <Toaster />
//         </DeviceProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );




import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { DeviceProvider } from '@/contexts/DeviceContext';
import { UserProvider } from '@/contexts/UserContext';
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider> 
          <DeviceProvider>
            <App />
            <Toaster />
          </DeviceProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
