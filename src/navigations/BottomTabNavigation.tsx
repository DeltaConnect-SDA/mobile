import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CameraFilled,
  ChevronLeft,
  HomeFilled,
  HomeOutline,
  NotifikasiFilled,
  NotifikasiOutline,
  ProfilFilled,
  ProfilOutline,
  RiwayatFilled,
  RiwayatOutline,
} from '@/constants/icons';
import { Colors } from '@/constants/colors';
import { History, Home, Notifications, Profile } from '@/screens';
import Camera from '@/screens/complaint/Camera';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getToken, useAuth } from '@/context/AuthProvider';
import { publicAPI } from 'Api/backend';
import * as ExpoNotifications from 'expo-notifications';
import { useNotification } from '@/context/NotificationProvider';

const Tab = createBottomTabNavigator();

export class BottomTabNavigation extends Component {
  render() {
    return <Layout />;
  }
}

const Layout = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { authState } = useAuth();
  const [loading, setLoading] = useState(true);
  const { setBadge, notificationState } = useNotification();

  const token = getToken();
  const handleNotifBadge = async () => {
    try {
      const res = await publicAPI.get('users/notifications', {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      });

      const { data } = res.data;

      if (data) {
        setBadge(data.length);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  ExpoNotifications.addNotificationReceivedListener(() => {
    setBadge(notificationState.badge + 1);
  });

  useEffect(() => {
    handleNotifBadge();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Beranda') {
            iconName = focused ? <HomeFilled /> : <HomeOutline />;
          } else if (route.name === 'Riwayat') {
            iconName = focused ? <RiwayatFilled /> : <RiwayatOutline />;
          } else if (route.name === 'Laporkan') {
            iconName = <CameraFilled width={32} color={'white'} />;
          } else if (route.name === 'Notifikasi') {
            iconName = focused ? <NotifikasiFilled /> : <NotifikasiOutline />;
          } else if (route.name === 'Profil') {
            iconName = focused ? <ProfilFilled /> : <ProfilOutline />;
          }

          // You can return any component that you like here!
          return iconName;
        },
        tabBarActiveTintColor: Colors.PRIMARY_GREEN,
        tabBarInactiveTintColor: Colors.DARK_GRAY,
        tabBarStyle: {
          display: 'flex',
          height: 90,
          paddingBottom: 18,
          gap: 5,
          borderWidth: 0,
          borderColor: 'rgba(0, 0, 0, 0.00)',
          paddingTop: 10,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowRadius: 10,
          elevation: 15,
        },
        tabBarLabelStyle: { fontFamily: 'Poppins-Regular', fontSize: scale(11) },
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 22,
          color: Colors.TEXT,
        },
        headerStyle: {
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 10,
          elevation: 3,
        },
      })}>
      <Tab.Screen name="Beranda" component={Home} options={{ headerShown: false }} />
      <Tab.Screen
        name="Riwayat"
        component={History}
        listeners={
          !authState?.authenticated
            ? {
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();

                  navigation.navigate('Onboarding');
                },
              }
            : null
        }
        options={{ headerShadowVisible: false }}
      />
      <Tab.Screen
        name="Laporkan"
        listeners={
          !authState?.authenticated
            ? {
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();

                  navigation.navigate('Onboarding');
                },
              }
            : null
        }
        options={{
          tabBarIconStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.PRIMARY_GREEN,
            width: 85,
            height: 85,
            borderRadius: 150,
            position: 'absolute',
            top: '-95%',
            borderWidth: 10,
            borderColor: 'white',
          },
          tabBarItemStyle: { marginHorizontal: 15 },
          tabBarStyle: { display: 'none' },
          headerStyle: { backgroundColor: '#000000' },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          unmountOnBlur: true,
          headerTitle: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <ChevronLeft />
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 16,
                    color: 'white',
                  }}>
                  Kembali
                </Text>
              </TouchableOpacity>
            );
          },
        }}
        component={Camera}
      />
      <Tab.Screen
        name="Notifikasi"
        listeners={
          !authState?.authenticated
            ? {
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();

                  navigation.navigate('Onboarding');
                },
              }
            : null
        }
        options={
          token && {
            tabBarBadge: (!loading && notificationState.badge) || null,
            tabBarBadgeStyle: { backgroundColor: Colors.PRIMARY_RED, fontSize: 12 },
          }
        }
        component={Notifications}
      />
      <Tab.Screen
        name="Profil"
        listeners={
          !authState?.authenticated
            ? {
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();

                  navigation.navigate('Onboarding');
                },
              }
            : null
        }
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
