import { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useEffect } from 'react';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null; userId: string | null };
  authenticate?: (token: string, userId: string) => any;
  logout?: () => any;
}

const AuthContext = createContext<AuthProps>({});
const TOKEN_KEY = 'dcses_id';
const USER_ID_KEY = 'dcusr_id';

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
    userId: string | null;
  }>({
    token: null,
    authenticated: null,
    userId: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userId = await SecureStore.getItemAsync(USER_ID_KEY);

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true, userId });
      }
    };

    loadToken();
  }, []);

  const authenticate = async (token: string, userId: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_ID_KEY, userId);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthState({ token, authenticated: true, userId });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({ token: null, authenticated: false, userId: null });
  };

  const value = {
    authenticate,
    logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
