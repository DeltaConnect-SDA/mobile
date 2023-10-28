import { createContext, useContext, useState } from 'react';

interface NotificationProps {
  notificationState?: { badge: number | null };
  setBadge?: (count: number) => any;
}

export const NotificationContext = createContext<NotificationProps>({});

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }: any) => {
  const [notificationState, setNotificationState] = useState<{
    badge: number | null;
  }>({
    badge: null,
  });

  const setBadge = (count: number) => {
    setNotificationState({ badge: count });
  };

  const value = {
    setBadge,
    notificationState,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
