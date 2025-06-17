
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDevices } from '@/contexts/DeviceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Laptop, AlertTriangle, CheckCircle, Clock, PlusCircle } from 'lucide-react';
import { format, isAfter, subMonths } from 'date-fns';

const Dashboard = () => {
  const { devices, loading } = useDevices();
  const [stats, setStats] = useState({
    total: 0,
    needsCheckup: 0,
    assigned: 0,
    unassigned: 0
  });

  useEffect(() => {
    if (!loading) {
      const now = new Date();
      const threeMonthsAgo = subMonths(now, 3);
      
      const needsCheckup = devices.filter(device => {
        const lastCheckup = device.lastCheckupDate ? new Date(device.lastCheckupDate) : null;
        return !lastCheckup || isAfter(threeMonthsAgo, lastCheckup);
      }).length;
      
      const assigned = devices.filter(device => device.assignedTo && device.assignedTo.trim() !== '').length;
      
      setStats({
        total: devices.length,
        needsCheckup,
        assigned,
        unassigned: devices.length - assigned
      });
    }
  }, [devices, loading]);

  const recentDevices = devices.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link to="/devices/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <Laptop className="mr-2 h-5 w-5 text-blue-200" />
                <CardDescription className="text-blue-100 text-[17px] font-semibold">Registered Devices</CardDescription>
              </div>
              <CardTitle className="text-3xl text-center">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-200" />
                <CardDescription className="text-blue-100 text-[17px] font-semibold">Needs Checkup</CardDescription>
              </div>
              <CardTitle className="text-3xl text-center">{stats.needsCheckup}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <CheckCircle className="mr-2 h-4 w-4 text-green-200" />
                <CardDescription className="text-blue-100 text-[17px] font-semibold">Assigned Devices</CardDescription>
              </div>
              <CardTitle className="text-3xl text-center">{stats.assigned}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <Clock className="mr-2 h-4 w-4 text-green-200" />
                <CardDescription className="text-blue-100 text-[17px] font-semibold">Unassigned Devices</CardDescription>
              </div>
              <CardTitle className="text-3xl text-center">{stats.unassigned}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recently Added</h2>
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : recentDevices.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentDevices.map((device) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="device-card"
              >
                <Link to={`/devices/edit/${device.id}`}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg font-semibold justify-between">
                        {device.name} 
                        <CardDescription>
                          S/N: {device.serialNumber || 'N/A'}
                        </CardDescription>
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">{device.status || 'Active'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Assigned To:</span>
                          <span className="font-medium">{device.assignedTo || 'Unassigned'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Added:</span>
                          <span className="font-medium">{format(new Date(device.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Laptop className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center mb-4">No devices found. Start by adding your first device.</p>
              <Link to="/devices/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Device
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
