import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevices } from '@/contexts/DeviceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Laptop,
  PlusCircle,
  Search,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
} from 'lucide-react';
import { format, isAfter, subMonths } from 'date-fns';

const DeviceList = () => {
  const { devices, loading, deleteDevice } = useDevices();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);

  const handleDeleteClick = (device) => {
    setDeviceToDelete(device);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deviceToDelete) {
      deleteDevice(deviceToDelete.id);
    }
    setDeleteDialogOpen(false);
    setDeviceToDelete(null);
  };

  const filteredDevices = devices.filter((device) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (device.name ?? '').toLowerCase().includes(searchLower) ||
      (device.serialNumber ?? '').toLowerCase().includes(searchLower) ||
      (device.assignedTo ?? '').toLowerCase().includes(searchLower) ||
      (device.department ?? '').toLowerCase().includes(searchLower) ||
      (device.status ?? '').toLowerCase().includes(searchLower)
    );
  });

  const getStatusIcon = (device) => {
    const now = new Date();
    const threeMonthsAgo = subMonths(now, 3);
    const lastCheckup = device.lastCheckupDate ? new Date(device.lastCheckupDate) : null;
    const needsCheckup = !lastCheckup || isAfter(threeMonthsAgo, lastCheckup);

    if (needsCheckup) {
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    } else if (device.assignedTo && device.assignedTo.trim() !== '') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else {
      return <Clock className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Devices</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search device/ user"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Link to="/devices/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredDevices.length > 0 ? (
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredDevices.map((device) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          {getStatusIcon(device)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg flex items-center">
                            {device.name}
                          </h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            S/N: {device.serialNumber || 'N/A'}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mt-2">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Status: </span>
                              <span>{device.status || 'Active'}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Assigned to: </span>
                              <span>{device.assignedTo || 'Unassigned'}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Department: </span>
                              <span>{device.department || 'N/A'}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Last checkup: </span>
                              <span>
                                {device.lastCheckupDate
                                  ? format(new Date(device.lastCheckupDate), 'MMM d, yyyy')
                                  : 'Never'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                        <Link to={`/devices/edit/${device.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteClick(device)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">No devices found</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Laptop className="h-12 w-12 text-muted-foreground mb-4" />
            {searchTerm ? (
              <p className="text-muted-foreground text-center mb-4">
                No device/user matches your search criteria.
              </p>
            ) : (
              <p className="text-muted-foreground text-center mb-4">
                No devices found. Start by adding your first device.
              </p>
            )}
            <Link to="/devices/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Device
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Do you wish to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeviceList;

