import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FeedHeader from './FeedHeader';
import { Colors } from '@/constants/colors';
import FeedCard from '../Card/Feed';

const data = [
  {
    id: 1,
    title: 'Kali keempat Kabupaten Sidoarjo raih penghargaan Kabupaten/Kota layak anak',
    cover: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/infoCover/info1.jpeg',
    category: 'Berita',
    burHash: 'LED+f0bW4.9F~XI.oct658oz$|x]',
    date: '22/07/2023',
  },
  {
    id: 2,
    title: 'Sidoarjo Raih Penghargaan Pemkab Berkinerja Terbaik Nasional',
    cover: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/infoCover/info2.jpg',
    category: 'Berita',
    burHash: 'LGHJ{^}@E0~X3=u4-pozv#yY?cE1',
    date: '12/09/2023',
  },
  {
    id: 3,
    title: 'Bupati Gus Muhdlor siapkan holding BLUD Rsud Sidoarjo',
    cover: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/infoCover/info3.jpeg',
    category: 'Berita',
    burHash: 'L@L#5=%Ma{R*~qofayayjZRjfkay',
    date: '12/09/2023',
  },
];

const InfoFeed = () => {
  return (
    <View style={styles.container}>
      <FeedHeader
        title="Informasi Terbaru"
        description="Semua berita dan pengumuman"
        ctaTitle="Semua"
        ctaRoute="Onboarding"
        color={Colors.PRIMARY_PURPLE}
      />
      <View style={styles.cardContainer}>
        {data.map((item) => (
          <FeedCard
            title={item.title}
            category={item.category}
            cover={item.cover}
            date={item.date}
            blurHash={item.burHash}
            key={item.id.toString()}
          />
        ))}
      </View>
    </View>
  );
};

export default InfoFeed;

const styles = StyleSheet.create({
  container: {},
  cardContainer: {
    paddingHorizontal: 20,
  },
});
