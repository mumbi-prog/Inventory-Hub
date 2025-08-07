import React, { useState, useEffect } from 'react';
import { useUsers } from '@/contexts/UserContext';
import { Link } from 'react-router-dom';
import { Edit, Trash2, UserCircle, Search, X, PlusCircle,} from 'lucide-react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui';

const UserList = () => {
  const { users, loading, deleteUser } = useUsers();
  const [search, setSearch] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user =>
    [user.first_name, user.last_name, user.email]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name/email"
              className="pl-8"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-2.5"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Link to="/users/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading users...</div>
      ) : filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <UserCircle className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-medium">
                    {user.first_name} {user.last_name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/users/edit/${user.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleDelete(user)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">No users found</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            {search ? 'Try a different keyword.' : 'Start by adding users.'}
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserList;
