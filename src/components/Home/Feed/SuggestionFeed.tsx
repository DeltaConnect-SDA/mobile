import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FeedHeader from './FeedHeader';
import { Colors } from '@/constants/colors';
import SuggestionCard from '@/components/Card/Suggestion';
import { publicAPI } from 'Api/backend';

// const data = [
//   {
//     id: 1,
//     ref_id: 'DC-SG-231103-00001',
//     title: 'Bangun taman hiburan rakyat',
//     categoryId: 1,
//     priorityId: 1,
//     description:
//       'Hiburan rakyat dapat menambah pemasukan daerah terutama bagi umkm dan pedagang makanan.',
//     location: 'Wilayah kecamatan Taman',
//     isVerified: false,
//     total_feedback: null,
//     total_score: null,
//     statusId: 1,
//     upVoteTotal: 483,
//     downVoteTotal: 27,
//     assignToId: null,
//     userId: '1101241c-bc22-4619-ac52-ce2addd1a0fa',
//     createdAt: '2023-11-03T10:10:05.048Z',
//     updatedAt: '2023-11-03T10:10:05.048Z',
//     category: {
//       id: 1,
//       title: 'Pohon',
//     },
//     priority: {
//       id: 1,
//       title: '!!! Tinggi',
//       color: 'RED',
//     },
//     status: {
//       id: 1,
//       title: 'Menunggu',
//       color: 'ORANGE',
//     },
//     SuggestionComments: [],
//   },
//   {
//     id: 1,
//     ref_id: 'DC-SG-231103-00001',
//     title: 'Bangun taman hiburan rakyat',
//     categoryId: 1,
//     priorityId: 1,
//     description:
//       'Hiburan rakyat dapat menambah pemasukan daerah terutama bagi umkm dan pedagang makanan.',
//     location: 'Wilayah kecamatan Taman',
//     isVerified: false,
//     total_feedback: null,
//     total_score: null,
//     statusId: 1,
//     upVoteTotal: 483,
//     downVoteTotal: 27,
//     assignToId: null,
//     userId: '1101241c-bc22-4619-ac52-ce2addd1a0fa',
//     createdAt: '2023-11-03T10:10:05.048Z',
//     updatedAt: '2023-11-03T10:10:05.048Z',
//     category: {
//       id: 1,
//       title: 'Pohon',
//     },
//     priority: {
//       id: 1,
//       title: '!!! Tinggi',
//       color: 'RED',
//     },
//     status: {
//       id: 1,
//       title: 'Menunggu',
//       color: 'ORANGE',
//     },
//     SuggestionComments: [],
//   },
// ];

const SuggestionFeed = ({ refreshing }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleData = async () => {
    try {
      const suggestions = await publicAPI.get('suggestions/latest');
      setLoading(false);
      const { data } = suggestions.data;

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
        title="Usulan Masyarakat"
        description="Usulan Teratas"
        ctaTitle="Semua"
        ctaRoute="UsulanMasyarakat"
        color={Colors.PRIMARY_ORANGE}
      />
      <View style={styles.cardContainer}>
        {!loading ? (
          data.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              id={suggestion.id}
              title={suggestion.title}
              category={suggestion.category.title}
              time={suggestion.createdAt}
              location={suggestion.location}
              status={suggestion.status.title}
              statusColor={suggestion.status.color}
              downVote={suggestion.downVoteTotal}
              upVote={suggestion.upVoteTotal}
            />
          ))
        ) : (
          <>
            <SuggestionCard
              title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
              category="Loading"
              id={1}
              location="Loading"
              status="Loading"
              statusColor={Colors.LINE_STROKE}
              time="loading"
              downVote={123}
              upVote={123}
              loading
            />
            <SuggestionCard
              title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
              category="Loading"
              id={1}
              location="Loading"
              status="Loading"
              statusColor={Colors.LINE_STROKE}
              time="loading"
              downVote={123}
              upVote={123}
              loading
            />
            <SuggestionCard
              title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
              category="Loading"
              id={1}
              location="Loading"
              status="Loading"
              statusColor={Colors.LINE_STROKE}
              time="loading"
              downVote={123}
              upVote={123}
              loading
            />
          </>
        )}
      </View>
    </View>
  );
};

export default SuggestionFeed;

const styles = StyleSheet.create({
  container: {},
  cardContainer: {
    paddingHorizontal: 20,
  },
});
