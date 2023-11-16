import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/colors';
import FeedHeader from './FeedHeader';
import ReportCard from '../../Card/Report';
import { publicAPI } from 'Api/backend';

const ReportFeed = ({ refreshing }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleData = async () => {
    try {
      const complaints = await publicAPI.get('complaints/latest');
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

  useEffect(() => {
    if (refreshing) {
      handleData();
    }
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <FeedHeader
        title="Laporan Masyarakat"
        description="Semua laporan masyarakat"
        ctaTitle="Semua"
        ctaRoute="LaporanMasyarakat"
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
