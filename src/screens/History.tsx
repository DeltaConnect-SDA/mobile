import { Text, View, ScrollView, RefreshControl } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '@/constants/colors';
import { Empty, Notification } from '@/constants/illustrations';
import { getToken } from '../context/AuthProvider';
import { publicAPI } from 'Api/backend';
import { Loader, ReportCard } from '@/components';

const Tab = createMaterialTopTabNavigator();

interface EmptyStateProps {
  title: string;
  description: string;
  illustration?: string | 'Empty';
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
      {!props.illustration || props.illustration === 'Empty' ? (
        <Empty />
      ) : props.illustration === 'Notification' ? (
        <Notification />
      ) : null}
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleData = async () => {
    try {
      const complaints = await publicAPI.get('user/complaints', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setLoading(false);
      const { data } = complaints.data;

      setData(data);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  if (!loading && !data) {
    <ScrollView style={{ paddingTop: 32, paddingHorizontal: 20, minHeight: '100%' }}>
      <EmptyState
        title="Belum ada Laporan"
        description="Kamu belum memiliki laporan untuk ditampilkan."
      />
    </ScrollView>;
  }
  return (
    <ScrollView
      style={{ paddingTop: 32, paddingHorizontal: 20, minHeight: '100%' }}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={handleData} />}>
      <View style={{ marginBottom: 100 }}>
        {!loading ? (
          data.map((complaint) => (
            <ReportCard
              blurHash={complaint?.ComplaintImages[0].placeholder}
              title={complaint?.title}
              category={complaint?.category.title}
              cover={complaint?.ComplaintImages[0].path}
              id={complaint?.id}
              place={complaint?.village}
              status={complaint?.status.title}
              statusColor={complaint?.status.color}
              time={complaint?.createdAt}
              key={complaint?.id}
            />
          ))
        ) : (
          <>
            <ReportCard
              blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
              title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
              category="Loading"
              cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
              id={1}
              place="Loading"
              status="Loading"
              statusColor={Colors.LINE_STROKE}
              time="loading"
              loading
            />
            <ReportCard
              blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
              title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
              category="Loading"
              cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
              id={1}
              place="Loading"
              status="Loading"
              statusColor={Colors.LINE_STROKE}
              time="loading"
              loading
            />
            <ReportCard
              blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
              title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
              category="Loading"
              cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
              id={1}
              place="Loading"
              status="Loading"
              statusColor={Colors.LINE_STROKE}
              time="loading"
              loading
            />
            <ReportCard
              blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
              title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
              category="Loading"
              cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
              id={1}
              place="Loading"
              status="Loading"
              statusColor={Colors.LINE_STROKE}
              time="loading"
              loading
            />
          </>
        )}
      </View>
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
