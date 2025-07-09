'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourses: string[];
  completedCourses: string[];
  aqiData?: {
    beforeAQI: number;
    currentAQI: number;
    location: string;
    lastUpdated: Date;
  };
  incomeData?: {
    monthlyRevenue: number;
    totalEarnings: number;
    lastUpdated: Date;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string, confirmPassword: string }) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      
      try {
        // Check if user is logged in
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user profile from profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              id: session.user.id,
              name: profile.name || session.user.user_metadata?.name || '',
              email: profile.email || session.user.email || '',
              role: profile.role || 'student',
              enrolledCourses: profile.enrolledCourses || [],
              completedCourses: profile.completedCourses || [],
              aqiData: profile.aqi_data,
              incomeData: profile.income_data
            });
          }
        }
      } catch (error) {
        console.error('Error getting user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getUser();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile from profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              id: session.user.id,
              name: profile.name || session.user.user_metadata?.name || '',
              email: profile.email || session.user.email || '',
              role: profile.role || 'student',
              enrolledCourses: profile.enrolledCourses || [],
              completedCourses: profile.completedCourses || [],
              aqiData: profile.aqi_data,
              incomeData: profile.income_data
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success('Logged in successfully!');
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string, confirmPassword: string }): Promise<void> => {
    setIsLoading(true);
    
    try {
      if (userData.password !== userData.confirmPassword) {
        toast.error('Passwords do not match');
        throw new Error('Passwords do not match');
      }

      const { data, error } = await supabase.auth.signUp({
        email: userData.email || '',
        password: userData.password,
        options: {
          data: {
            name: userData.name,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success('Registration successful! Please check your email for verification.');
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    if (!user) {
      toast.error('You must be logged in to update your profile');
      throw new Error('Not authenticated');
    }
    
    try {
      // Update auth metadata if name is provided
      if (userData.name) {
        await supabase.auth.updateUser({
          data: { name: userData.name }
        });
      }
      
      // Update profile in the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name || user.name,
          avatar_url: userData.avatar_url || user.avatar_url,
          // Only update other fields if they are provided
          ...(userData.role && { role: userData.role }),
          ...(userData.enrolledCourses && { enrolledCourses: userData.enrolledCourses }),
          ...(userData.completedCourses && { completedCourses: userData.completedCourses }),
          ...(userData.aqiData && { aqi_data: userData.aqiData }),
          ...(userData.incomeData && { income_data: userData.incomeData })
        })
        .eq('id', user.id);
      
      if (error) {
        toast.error('Failed to update profile');
        throw error;
      }
      
      // Update local user state
      setUser({ ...user, ...userData });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}