import { createContext, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { publicAPI } from 'Api/backend';

interface NotificationProps {
  notificationState?: {
    badge: number | null;
  };
  getNotification?: () => any;
}

const NotificationContext = createContext<NotificationProps>({});
// const TOKEN_KEY = 'dcses_id';

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }: any) => {
  const [notificationState, setNotificationState] = useState<{
    badge: number | null;
  }>({
    badge: null,
  });

  useEffect(() => {}, []);

  const getNotification = async () => {
    publicAPI.get('/users/notifications');
  };

  const value = {
    getNotification,
    notificationState,
  };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
