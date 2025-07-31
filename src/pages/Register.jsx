
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Boxes } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
    
  //   if (password !== confirmPassword) {
  //     setError('Passwords do not match');
  //     return;
  //   }
    
  //   setIsLoading(true);
    
  //   try {
  //     const success = register(email, password, name);
  //     if (success) {
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     setError('Failed to create an account');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const allowedEmails = [
      'sylvia.mumbi@dakawou.com',
      'washington@dakawou.com',
      'itsupport@dakawou.com',
      'it.attachee@dakawou.com',
      'mohamed@dakawou.com'
    ];
  
    if (!allowedEmails.includes(email.toLowerCase())) {
      setError('Access Denied.');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const success = await register(email, password, name); 
      if (success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to create an account');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Boxes className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-white/50"
                />
              </div>
              {error && (
                <div className="text-sm font-medium text-destructive">{error}</div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Boxes } from 'lucide-react';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const allowedEmails = [
//     'sylvia.mumbi@dakawou.com',
//     'washington@dakawou.com',
//     'itsupport@dakawou.com',
//     'it.attachee@dakawou.com',
//     'mohamed@dakawou.com',
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!allowedEmails.includes(email.toLowerCase())) {
//       setError('Access Denied.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const success = await register(email, password, name);
//       if (success) {
//         navigate('/');
//       } else {
//         setError('Failed to create account');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setError('Something went wrong');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-indigo-500 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <Card className="glass-card">
//           <CardHeader className="space-y-1 text-center">
//             <div className="flex justify-center mb-2">
//               <div className="p-2 bg-primary/10 rounded-full">
//                 <Boxes className="h-10 w-10 text-primary" />
//               </div>
//             </div>
//             <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
//             <CardDescription>
//               Enter your info to create an admin account
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="bg-white/50"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="bg-white/50"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="bg-white/50"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <Input
//                   id="confirmPassword"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                   className="bg-white/50"
//                 />
//               </div>
//               {error && <p className="text-sm font-medium text-destructive">{error}</p>}
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? 'Creating...' : 'Create Account'}
//               </Button>
//             </form>
//           </CardContent>
//           <CardFooter className="flex justify-center">
//             <p className="text-sm">
//               Already have an account?{' '}
//               <Link to="/login" className="text-primary hover:underline">Login</Link>
//             </p>
//           </CardFooter>
//         </Card>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;
