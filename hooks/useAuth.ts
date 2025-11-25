import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthToken {
  token: string;
  expiresAt: number;
}

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  logout: () => Promise<void>;
  setAuthToken: (token: string, expiresInSeconds: number) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Kiểm tra token khi app khởi động
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const storedToken = await AsyncStorage.getItem('authToken');

      if (!storedToken) {
        // Không có token
        setIsAuthenticated(false);
        setToken(null);
        return;
      }

      try {
        const authData: AuthToken = JSON.parse(storedToken);
        const now = Date.now();

        // Kiểm tra token có hết hạn không
        if (authData.expiresAt && authData.expiresAt < now) {
          // Token đã hết hạn
          console.log('Token expired');
          await AsyncStorage.removeItem('authToken');
          setIsAuthenticated(false);
          setToken(null);
          return;
        }

        // Token còn hiệu lực
        setIsAuthenticated(true);
        setToken(authData.token);
      } catch (parseError) {
        console.error('Error parsing token:', parseError);
        await AsyncStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setToken(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const setAuthToken = async (newToken: string, expiresInSeconds: number) => {
    try {
      const expiresAt = Date.now() + expiresInSeconds * 1000;
      const authData: AuthToken = {
        token: newToken,
        expiresAt,
      };

      await AsyncStorage.setItem('authToken', JSON.stringify(authData));
      setIsAuthenticated(true);
      setToken(newToken);
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setToken(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    token,
    logout,
    setAuthToken,
  };
}
