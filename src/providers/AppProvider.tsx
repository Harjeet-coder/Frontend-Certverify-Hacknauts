import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  name: string;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  apiBaseUrl: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Configure your Golang backend URL here
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  const login = async (email: string, password: string, role: string) => {
    // TODO: Replace with actual API call to your Golang backend
    // Example: const response = await axios.post(`${apiBaseUrl}/auth/login`, { email, password, role });
    
    // Mock login for now
    const mockUser: User = {
      id: '1',
      email,
      role: role as 'student' | 'faculty' | 'admin',
      name: email.split('@')[0],
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for stored user on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value: AppContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    apiBaseUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
