import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/colors';
import { Image } from 'expo-image';
import TimeAgo from 'javascript-time-ago';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Skeleton } from 'moti/skeleton';
import { DownVote, UpVote } from '@/constants/icons';

type SuggestionCardProps = {
  id: number;
  title: string;
  category: string;
  status: string;
  statusColor: string;
  upVote: number;
  downVote: number;
  time: string;
  location: string;
  loading?: boolean;
};

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  id,
  title,
  category,
  status,
  statusColor,
  time,
  upVote,
  downVote,
  location,
  loading,
}) => {
  const timeAgo = new TimeAgo('id');
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  if (loading) {
    return (
      <TouchableOpacity style={styles().container}>
        <Skeleton colorMode="light" show>
          <View style={styles().voteContainer}>
            <View style={styles().voteButton}>
              <UpVote color={Colors.GRAY} />
              <Text style={styles().voteButtonText}>50</Text>
            </View>
            <View style={styles().voteButton}>
              <DownVote color={Colors.GRAY} />
              <Text style={styles().voteButtonText}>50</Text>
            </View>
          </View>
        </Skeleton>
        <View style={styles().textContainer}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles().categoryContainer}>
              <Skeleton colorMode="light" show>
                <Text style={styles().category}>Loading</Text>
              </Skeleton>
            </View>
          </View>
          <View style={styles().titleContainer}>
            <Skeleton colorMode="light" show>
              <Text numberOfLines={2} style={styles().title}>
                sedang dimuat.....
              </Text>
            </Skeleton>
          </View>
          <Skeleton colorMode="light" show>
            <Text style={styles().category}>Loading</Text>
          </Skeleton>
          <View style={styles().footerContainer}>
            <View style={styles(statusColor).statusContainer}>
              <Skeleton colorMode="light" show>
                <Text style={styles(statusColor).status}>Loading</Text>
              </Skeleton>
            </View>
            <Skeleton colorMode="light" show>
              <Text style={styles().time}>Loading</Text>
            </Skeleton>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SuggestionDetail', { complaintId: id })}
        style={styles().container}>
        <View style={styles().voteContainer}>
          <View style={styles().voteButton}>
            <UpVote color={Colors.GRAY} />
            <Text style={styles().voteButtonText}>{upVote}</Text>
          </View>
          <View style={styles().voteButton}>
            <DownVote color={Colors.GRAY} />
            <Text style={styles().voteButtonText}>{downVote}</Text>
          </View>
        </View>
        <View style={styles().textContainer}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles().categoryContainer}>
              <Text style={styles().category}>{category}</Text>
            </View>
          </View>
          <View style={styles().titleContainer}>
            <Text numberOfLines={2} style={styles().title}>
              {title}
            </Text>
          </View>
          <Text style={styles().category}>{location}</Text>
          <View style={styles().footerContainer}>
            <View style={styles(statusColor).statusContainer}>
              <Text style={styles(statusColor).status}>{status}</Text>
            </View>
            <Text style={styles().time}>{timeAgo.format(new Date(time))}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default SuggestionCard;

const styles = (props?: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Colors.LINE_STROKE,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 8,
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
      gap: 2,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Poppins-Medium',
      color: Colors.TEXT,
      fontSize: scale(12.5),
      flexWrap: 'wrap',
    },
    footerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    categoryContainer: {
      paddingBottom: 2,
      paddingTop: 3,
      paddingHorizontal: 9,
      backgroundColor: Colors.BACKGROUND,
      borderRadius: 8,
    },
    category: {
      fontFamily: 'Poppins-Medium',
      fontSize: scale(10.5),
      color: Colors.GRAY,
    },
    statusContainer: {
      paddingBottom: 2,
      paddingTop: 3,
      paddingHorizontal: 9,
      borderRadius: 8,
      backgroundColor: Colors[`SECONDARY_${props}`],
    },
    status: {
      fontFamily: 'Poppins-Medium',
      fontSize: scale(10.5),
      color: Colors[`PRIMARY_${props}`],
    },
    time: {
      fontFamily: 'Poppins-Regular',
      fontSize: scale(10.5),
      color: Colors.DARK_GRAY,
    },
    voteContainer: {
      flexDirection: 'column',
      gap: verticalScale(12),
    },
    voteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(5),
      backgroundColor: Colors.LIGHT_GRAY,
      paddingVertical: verticalScale(10),
      paddingHorizontal: scale(5),
      borderRadius: scale(8),
    },
    voteButtonText: {
      color: Colors.GRAY,
    },
  });
