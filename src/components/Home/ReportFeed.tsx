import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/colors';
import FeedHeader from './FeedHeader';
import ReportCard from '../Card/Report';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: 1,
    title: 'Mohon perbaiki saluran air depan SMAN 1 TAMAN',
    cover: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg',
    category: 'Drainase',
    burHash: 'LPEyPa~V-ps.RMxuofW=x[NFRjWB',
    time: '2023-10-08T11:24:09.319Z',
    status: 'Menunggu',
    statusColor: 'ORANGE',
    place: 'Jemundo',
  },
  {
    id: 2,
    title: 'Pohon tumbang di pasar wage menyebabkan kemacetan yang sangat parah',
    cover: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report2.jpg',
    category: 'Pohon',
    burHash: 'LkF~XF%NMxbH?wx]RPofbxt7j[t7',
    time: '2023-10-08T11:20:09.319Z',
    status: 'Proses',
    statusColor: 'TOSCA',
    place: 'Wage',
  },
  {
    id: 3,
    title: 'Lampu jalan di jalan raya kletek mati, sudah 1 minggu belum ada tindak lanjut.',
    cover: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report3.jpg',
    category: 'Lampu Jalan',
    burHash: 'LWJ]0^-nE0J6_N?FD%Ip^+V=bJog',
    time: '2023-10-08T11:17:09.319Z',
    status: 'Proses',
    statusColor: 'TOSCA',
    place: 'Kletek',
  },
];

const ReportFeed = () => {
  return (
    <View style={styles.container}>
      <FeedHeader
        title="Laporan Masyarakat"
        description="Semua laporan masyarakat"
        ctaTitle="Semua"
        ctaRoute="Onboarding"
        color={Colors.PRIMARY_ORANGE}
      />
      <View style={styles.cardContainer}>
        {data.map((item) => (
          <ReportCard
            id={item.id}
            title={item.title}
            category={item.category}
            cover={item.cover}
            time={item.time}
            blurHash={item.burHash}
            status={item.status}
            statusColor={item.statusColor}
            place={item.place}
            key={item.id.toString()}
          />
        ))}
      </View>
    </View>
  );
};

export default ReportFeed;

const styles = StyleSheet.create({
  container: {},
  cardContainer: {
    paddingHorizontal: 20,
  },
});
