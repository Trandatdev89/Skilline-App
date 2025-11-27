import AuthApi from '@/api/AuthApi';
import { TokenType } from '@/enums/TokenType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';



interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  logout: () => Promise<void>;
  setAuthToken: (token: string, refreshToken: string) => Promise<void>;
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
      const accessToken = await AsyncStorage.getItem('accessToken');

      if (!accessToken) {
        setIsAuthenticated(false);
        setToken(null);
        return;
      }

      try {

        const tokenRequest = {
          accessToken: accessToken,
          tokenType: TokenType.ACCESS_TOKEN
        }

        const resApi = await AuthApi.introspectToken(tokenRequest);

        if (resApi.data) {
          setIsAuthenticated(resApi.data);
        }

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

  const setAuthToken = async (newToken: string, refreshToken: string) => {
    try {

      await AsyncStorage.setItem('accessToken', newToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      setIsAuthenticated(true);
      setToken(newToken);
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
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
