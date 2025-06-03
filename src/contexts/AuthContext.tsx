import React, { createContext, useContext, useState, useEffect } from 'react';

// User roles
export type UserRole = 'admin' | 'doctor' | 'patient';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Mock users for development
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@healthcare.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    profileImage: 'https://i.pravatar.cc/150?u=admin',
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    email: 'doctor@healthcare.com',
    password: 'doctor123',
    role: 'doctor' as UserRole,
    profileImage: 'https://i.pravatar.cc/150?u=doctor',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'patient@healthcare.com',
    password: 'patient123',
    role: 'patient' as UserRole,
    profileImage: 'https://i.pravatar.cc/150?u=patient',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userExists = MOCK_USERS.some(u => u.email === email);
    
    if (userExists) {
      setIsLoading(false);
      throw new Error('User already exists');
    }
    
    // In a real app, this would create a new user in the database
    // For now, we'll just create a new user object
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role,
      profileImage: `https://i.pravatar.cc/150?u=${email}`,
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);