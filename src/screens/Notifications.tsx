import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  RefreshControl,
  Dimensions,
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { Colors } from '@/constants/colors';
import TimeAgo from 'javascript-time-ago';
import { Laporan } from '@/constants/icons';
import { getNotifications, readNotification } from '@/services';
import { EmptyState } from './History';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ExpoNotifications from 'expo-notifications';
import { useNotification } from '@/context/NotificationProvider';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Laporanmu Diteruskan!',
    type: 'report',
    description: 'Laporan DC-SDA-170923-00027 diteruskan ke dinas pekerjaan umum',
    time: '2023-10-07T17:54:09.319Z',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Laporanmu Selesai!',
    type: 'report',
    description:
      'Laporan DC-SDA-170923-00020 telah selesai ditindaklanjuti oleh Dinas Lingkungan Hidup dan Kebersihan',
    time: '2023-10-06T10:56:29.457Z',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Laporanmu Ditolak!',
    type: 'report',
    description: 'Laporan DC-SDA-170923-00012 ditolak karena duplikasi dengan laporan sebelumnya.',
    time: '2023-10-05T10:56:29.457Z',
  },
];

interface ItemProps {
  title: string;
  description: string;
  time: string;
  type: string;
  id: number;
  route: string;
  param: string;
}

export const Item = ({ title, description, time, type, id, route, param }: ItemProps) => {
  const [clippedText, setClippedText] = useState(String);
  const timeAgo = new TimeAgo('id');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { notificationState, setBadge } = useNotification();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#EEEEEE' : 'white',
        },
        styles.item,
      ]}
      onPress={async () => {
        console.log('route:', route, 'complaintId:', param, type);
        setBadge(notificationState.badge ? notificationState.badge - 1 : null);
        if (type === 'complaint') {
          await navigation.navigate(route, { complaintId: param });
        }
        readNotification(id);
      }}>
      <View>
        <View style={styles.itemType}>
          <Text>{type === 'complaint' ? <Laporan /> : ''}</Text>
        </View>
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text numberOfLines={3} style={styles.itemDescription}>
          {description}
        </Text>
        <Text style={styles.itemTime}>{timeAgo.format(new Date(time))}</Text>
      </View>
    </Pressable>
  );
};

export class Notifications extends Component {
  state = {
    notifications: [],
    isLoading: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isLoading: true,
    };
  }

  async __handleNotification() {
    console.log('refresh');

    try {
      const res = await getNotifications();
      const notifications = res.data;
      this.setState({
        notifications,
        isLoading: false,
      });
    } catch (err) {}
  }

  componentDidMount(): void {
    this.__handleNotification();
  }
  render() {
    ExpoNotifications.addNotificationReceivedListener(() => this.__handleNotification());
    return (
      <View>
        <FlatList
          contentContainerStyle={
            this.state.notifications.length === 0 && {
              height: SCREEN_HEIGHT - 170,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 'auto',
            }
          }
          ListEmptyComponent={
            <EmptyState
              illustration="Notification"
              title="Belum Ada Notifikasi."
              description="Anda belum memiliki notifikasi yang belum dibaca."
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => this.__handleNotification()}
            />
          }
          data={this.state.notifications}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              description={item.content}
              type={item.type}
              route={item.route}
              param={item.param}
              time={item.createdAt}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: '100%',
    padding: 20,
    borderColor: Colors.LINE_STROKE,
    borderBottomWidth: 1,
    gap: 10,
  },
  itemType: {
    backgroundColor: Colors.SECONDARY_ORANGE,
    padding: 12,
    borderRadius: 12,
  },
  itemTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.TEXT,
  },
  itemDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.TEXT,
  },
  itemTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.GRAY,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
});

export default Notifications;
