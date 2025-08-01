
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useToast } from '@/components/ui/use-toast';
// import { useAuth } from '@/contexts/AuthContext';

// const DeviceContext = createContext();

// export const useDevices = () => useContext(DeviceContext);

// export const DeviceProvider = ({ children }) => {
//   const [devices, setDevices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     if (currentUser) {
//       loadDevices();
//     } else {
//       setDevices([]);
//     }
//   }, [currentUser]);

//   const loadDevices = () => {
//     setLoading(true);
//     try {
//       const savedDevices = JSON.parse(localStorage.getItem('devices') || '[]');
//       setDevices(savedDevices);
//     } catch (error) {
//       console.error('Error loading devices:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load devices",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveDevices = (updatedDevices) => {
//     localStorage.setItem('devices', JSON.stringify(updatedDevices));
//     setDevices(updatedDevices);
//   };

//   const addDevice = (device) => {
//     try {
//       const newDevice = {
//         ...device,
//         id: Date.now().toString(),
//         createdBy: currentUser.id,
//         createdAt: new Date().toISOString(),
//       };
      
//       const updatedDevices = [...devices, newDevice];
//       saveDevices(updatedDevices);
      
//       toast({
//         title: "Device added",
//         description: `${device.name} has been added successfully`,
//       });
      
//       return newDevice;
//     } catch (error) {
//       console.error('Error adding device:', error);
//       toast({
//         title: "Error",
//         description: "Failed to add device",
//         variant: "destructive",
//       });
//       return null;
//     }
//   };

//   const updateDevice = (id, updatedDevice) => {
//     try {
//       const deviceIndex = devices.findIndex(device => device.id === id);
      
//       if (deviceIndex === -1) {
//         toast({
//           title: "Error",
//           description: "Device not found",
//           variant: "destructive",
//         });
//         return false;
//       }
      
//       const updatedDevices = [...devices];
//       updatedDevices[deviceIndex] = {
//         ...updatedDevices[deviceIndex],
//         ...updatedDevice,
//         updatedAt: new Date().toISOString(),
//       };
      
//       saveDevices(updatedDevices);
      
//       toast({
//         title: "Device updated",
//         description: `${updatedDevice.name} has been updated successfully`,
//       });
      
//       return true;
//     } catch (error) {
//       console.error('Error updating device:', error);
//       toast({
//         title: "Error",
//         description: "Failed to update device",
//         variant: "destructive",
//       });
//       return false;
//     }
//   };

//   const deleteDevice = (id) => {
//     try {
//       const device = devices.find(device => device.id === id);
      
//       if (!device) {
//         toast({
//           title: "Error",
//           description: "Device not found",
//           variant: "destructive",
//         });
//         return false;
//       }
      
//       const updatedDevices = devices.filter(device => device.id !== id);
//       saveDevices(updatedDevices);
      
//       toast({
//         title: "Device deleted",
//         description: `${device.name} has been deleted successfully`,
//       });
      
//       return true;
//     } catch (error) {
//       console.error('Error deleting device:', error);
//       toast({
//         title: "Error",
//         description: "Failed to delete device",
//         variant: "destructive",
//       });
//       return false;
//     }
//   };

//   const getDevice = (id) => {
//     return devices.find(device => device.id === id) || null;
//   };

//   const value = {
//     devices,
//     loading,
//     addDevice,
//     updateDevice,
//     deleteDevice,
//     getDevice,
//     refreshDevices: loadDevices,
//   };

//   return (
//     <DeviceContext.Provider value={value}>
//       {children}
//     </DeviceContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import axios from '@/lib/axios'; // Ensure this is set up with your baseURL and interceptors

const DeviceContext = createContext();
export const useDevices = () => useContext(DeviceContext);

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadDevices();
    } else {
      setDevices([]);
    }
  }, [currentUser]);

  const loadDevices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/devices?user_id=${currentUser.id}`);
      setDevices(response.data);
    } catch (error) {
      console.error('Error loading devices:', error);
      toast({
        title: 'Error',
        description: 'Failed to load devices from server',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addDevice = async (device) => {
    try {
      const response = await axios.post('/devices', {
        ...device,
        user_id: currentUser.id,
      });

      const newDevice = response.data;
      setDevices((prev) => [...prev, newDevice]);

      toast({
        title: 'Device added',
        description: `${newDevice.model} added successfully.`,
      });

      return newDevice;
    } catch (error) {
      console.error('Error adding device:', error);
      toast({
        title: 'Error',
        description: 'Failed to add device',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateDevice = async (id, updatedDevice) => {
    try {
      const response = await axios.patch(`/devices/${id}`, updatedDevice);
      const updated = response.data;

      setDevices((prev) =>
        prev.map((device) => (device.id === id ? updated : device))
      );

      toast({
        title: 'Device updated',
        description: `${updated.model} updated successfully.`,
      });

      return true;
    } catch (error) {
      console.error('Error updating device:', error);
      toast({
        title: 'Error',
        description: 'Failed to update device',
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteDevice = async (id) => {
    try {
      await axios.delete(`/devices/${id}`);
      setDevices((prev) => prev.filter((device) => device.id !== id));

      toast({
        title: 'Device deleted',
        description: 'Device removed successfully.',
      });

      return true;
    } catch (error) {
      console.error('Error deleting device:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete device',
        variant: 'destructive',
      });
      return false;
    }
  };

  const getDevice = (id) => {
    return devices.find((device) => device.id === id) || null;
  };

  return (
    <DeviceContext.Provider
      value={{
        devices,
        loading,
        addDevice,
        updateDevice,
        deleteDevice,
        getDevice,
        refreshDevices: loadDevices,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
