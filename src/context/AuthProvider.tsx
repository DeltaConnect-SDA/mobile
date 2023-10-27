import { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { authAPI } from 'Api/backend';
import { Platform } from 'react-native';

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    userId: string | null;
    phoneVerified: string | null;
  };
  authenticate?: (token: string, userId: string, phoneVerified: string) => any;
  logout?: () => any;
}

const AuthContext = createContext<AuthProps>({});
const TOKEN_KEY = 'dcses_id';
const USER_ID_KEY = 'dcusr_id';
const PHONE_VERIFIED_KEY = 'dcpvr';

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
    phoneVerified: string | null;
  }>({
    token: null,
    authenticated: null,
    userId: null,
    phoneVerified: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userId = await SecureStore.getItemAsync(USER_ID_KEY);
      const phoneVerified = await SecureStore.getItemAsync(USER_ID_KEY);

      if (token) {
        setAuthState({ token, authenticated: true, userId, phoneVerified });
      }
    };

    loadToken();
  }, []);

  const authenticate = async (token: string, userId: string, phoneVerified: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_ID_KEY, userId);
    await SecureStore.setItemAsync(PHONE_VERIFIED_KEY, phoneVerified.toString());
    const DeviceToken = await SecureStore.getItemAsync('deviceToken');

    await authAPI.post(
      '/device',
      {
        userId,
        DeviceToken,
        DeviceType: Platform.OS,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAuthState({ token, authenticated: true, userId, phoneVerified });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    setAuthState({ token: null, authenticated: false, userId: null, phoneVerified: null });
  };

  const value = {
    authenticate,
    logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
