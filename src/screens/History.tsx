import { Text, View, ScrollView } from 'react-native';
import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '@/constants/colors';
import { Empty } from '@/constants/illustrations';

const Tab = createMaterialTopTabNavigator();

interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = (props: EmptyStateProps) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 100,
      }}>
      <Empty />
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 20,
          color: Colors.TEXT,
        }}>
        {props.title}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 13,
          color: Colors.GRAY,
          textAlign: 'center',
          maxWidth: 300,
        }}>
        {props.description}
      </Text>
    </View>
  );
};

export const RiwayatLaporan = () => {
  return (
    <ScrollView style={{ paddingTop: 32, paddingHorizontal: 20, minHeight: '100%' }}>
      <EmptyState
        title="Belum ada Laporan"
        description="Kamu belum memiliki laporan untuk ditampilkan."
      />
    </ScrollView>
  );
};

export const RiwayatUsulan = () => {
  return (
    <ScrollView style={{ paddingTop: 32, paddingHorizontal: 20, minHeight: '100%' }}>
      <EmptyState
        title="Belum ada Usulan"
        description="Kamu belum memiliki usulan untuk ditampilkan."
      />
    </ScrollView>
  );
};

export class History extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={() => ({
          tabBarIndicatorStyle: { backgroundColor: Colors.PRIMARY_GREEN, height: 3 },
          tabBarActiveTintColor: Colors.TEXT,
          tabBarLabelStyle: {
            textTransform: 'capitalize',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
          },
          tabBarStyle: {
            paddingTop: 6,
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 15,
            elevation: 2,
          },
        })}>
        <Tab.Screen name="Laporan Saya" component={RiwayatLaporan} />
        <Tab.Screen name="Usulan Saya" component={RiwayatUsulan} />
      </Tab.Navigator>
    );
  }
}

export default History;
