import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../axios';;
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, User } from 'lucide-react';

const departments = ['Operations', 'Accounts', 'IT', 'HR', 'Admin'];

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    department: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isEditMode) {
      api
        .get(`/users/${id}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          console.error('Fetch user failed:', err);
          toast({
            title: 'Error',
            description: 'Unable to load user.',
            variant: 'destructive',
          });
          navigate('/users');
        });
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, department: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     if (isEditMode) {
  //       await api.put(`/users/${id}`, formData);
  //       toast({
  //         title: 'User updated successfully',
  //       });
  //     } else {
  //       await api.post('/users', formData);
  //       toast({
  //         title: 'User created successfully',
  //       });
  //     }
  //     navigate('/users');
  //   } catch (error) {
  //     const msg =
  //       error.response?.data?.errors?.[0] || 'An error occurred while saving.';
  //     toast({
  //       title: 'Error saving user',
  //       description: msg,
  //       variant: 'destructive',
  //     });
  //     console.error('Error saving:', msg);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await api.put(`/users/${id}`, formData);
        toast({
          title: 'User updated successfully',
        });
      } else {
        await api.post('/users', formData);
        toast({
          title: 'User created successfully',
        });
      }
  
      // 🔥 refresh user list immediately
      if (typeof fetchUsers === "function") {
        await fetchUsers();  
      }
  
      navigate('/users');
    } catch (error) {
      const msg =
        error.response?.data?.errors?.[0] || 'An error occurred while saving.';
      toast({
        title: 'Error saving user',
        description: msg,
        variant: 'destructive',
      });
      console.error('Error saving:', msg);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/users')}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">
          {isEditMode ? 'Edit User' : 'Add New User'}
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>
                {isEditMode ? 'User Details' : 'New User Information'}
              </CardTitle>
            </div>
            <CardDescription>
              {isEditMode
                ? 'Update the user’s information'
                : 'Fill in user details'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dep) => (
                        <SelectItem key={dep} value={dep}>
                          {dep}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate('/users')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting
                  ? 'Saving...'
                  : isEditMode
                  ? 'Update User'
                  : 'Save User'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserForm;
