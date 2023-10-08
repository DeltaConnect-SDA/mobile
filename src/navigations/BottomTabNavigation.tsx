import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
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
import Camera from '@/screens/Camera';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export class BottomTabNavigation extends Component {
  render() {
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
              iconName = <CameraFilled width={32} />;
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
          tabBarLabelStyle: { fontFamily: 'Poppins-Regular', fontSize: 12 },
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
        <Tab.Screen name="Riwayat" component={History} options={{ headerShadowVisible: false }} />
        <Tab.Screen
          name="Laporkan"
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
            headerStyle: { backgroundColor: '#000000B2' },
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
          options={{
            tabBarBadge: 3,
            tabBarBadgeStyle: { backgroundColor: Colors.PRIMARY_RED, fontSize: 12 },
          }}
          component={Notifications}
        />
        <Tab.Screen name="Profil" component={Profile} />
      </Tab.Navigator>
    );
  }
}

export default BottomTabNavigation;
