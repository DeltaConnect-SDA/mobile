import { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useEffect } from 'react';
import { Loader } from '@/components';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  authenticate?: (token: string) => any;
  logout?: () => any;
}

const AuthContext = createContext<AuthProps>({});
const TOKEN_KEY = 'dcses_id';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true });
      }
    };

    loadToken();
  }, []);

  const authenticate = async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthState({ token, authenticated: true });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({ token: null, authenticated: false });
  };

  const value = {
    authenticate,
    logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
