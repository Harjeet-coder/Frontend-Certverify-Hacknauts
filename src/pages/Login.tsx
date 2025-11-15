import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/providers/AppProvider';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<string>('');
  const { login } = useApp();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password || !role) {
    toast.error('Please fill in all fields');
    return;
  }

  // Restrict only @citchennai.net emails
  if (!email.endsWith("@citchennai.net")) {
    toast.error("Only institutional emails (@citchennai.net) are allowed");
    return;
  }

  try {
    await login(email, password, role);
    toast.success('Login successful!');

    switch (role) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'faculty':
        navigate('/faculty/verify');
        break;
      case 'admin':
        navigate('/admin/analytics');
        break;
      default:
        navigate('/');
    }
  } catch (error) {
    toast.error('Login failed. Please try again.');
  }
};


  return (
    <div className="min-h-screen bg-[#0A1A3A] flex items-center justify-center p-4">
      
      <Card 
  className="
    w-full max-w-md 
    bg-white/[0.15]        /* lighter card */
    border border-white/20 /* lighter border */
    shadow-[0_0_25px_rgba(255,255,255,0.12)]
    backdrop-blur-md 
    rounded-xl
    transition-all 
    duration-300 
    hover:shadow-[0_0_40px_rgba(255,255,255,0.18)]
  "
>

        
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-40 h-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">CERTVERI</span>
            </div>
          </div>

          <CardTitle className="text-2xl text-center text-white">Welcome Back</CardTitle>
          <CardDescription className="text-center text-gray-300">
            Sign in to your CertVerify account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@citchennai.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder-gray-400"
              />
            </div>

<div className="space-y-2">
  <Label htmlFor="role" className="text-white">Role</Label>
  <Select value={role} onValueChange={setRole} required>
    <SelectTrigger 
      id="role"
      className="
        bg-white/10 
        border border-white/20 
        text-white 
        placeholder-gray-300 
        focus:ring-2 
        focus:ring-white/30 
        transition-all
      "
    >
      <SelectValue placeholder="Select your role" />
    </SelectTrigger>

    <SelectContent
      className="
        bg-[#1b2433]/80 
        backdrop-blur-xl 
        border border-white/20 
        text-white
      "
    >
      <SelectItem 
        value="student"
        className="hover:bg-white/10 focus:bg-white/20 cursor-pointer"
      >
        Student
      </SelectItem>

      <SelectItem 
        value="faculty"
        className="hover:bg-white/10 focus:bg-white/20 cursor-pointer"
      >
        Faculty
      </SelectItem>

      <SelectItem 
        value="admin"
        className="hover:bg-white/10 focus:bg-white/20 cursor-pointer"
      >
        Admin
      </SelectItem>
    </SelectContent>
  </Select>
</div>


            <Button type="submit" className="w-full">
              Sign In
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
