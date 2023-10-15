import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/colors';
import FeedHeader from './FeedHeader';
import ReportCard from '../../Card/Report';
import { useNavigation } from '@react-navigation/native';
import { publicAPI } from 'Api/backend';
import { Loader } from '@/components/atom';
import { Skeleton } from 'moti/skeleton';

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
    status: 'Dibatalkan',
    statusColor: 'RED',
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleData = async () => {
    try {
      const complaints = await publicAPI.get('v1/complaint/latest');
      setLoading(false);
      const { data } = complaints.data;
      console.log(data);

      setData(data);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
    }
  };

  useEffect(() => {
    handleData();
  }, []);
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
          </>
        )}
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
