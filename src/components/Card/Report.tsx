import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/colors';
import { Image } from 'expo-image';
import TimeAgo from 'javascript-time-ago';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';

type ReportCardProps = {
  id: number;
  title: string;
  cover: string;
  category: string;
  status: string;
  statusColor: string;
  time: string;
  blurHash: string;
  place: string;
};

const ReportCard: React.FC<ReportCardProps> = ({
  id,
  title,
  category,
  time,
  cover,
  blurHash,
  status,
  statusColor,
  place,
}) => {
  const timeAgo = new TimeAgo('id');
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ComplaintDetail', { complaintId: id })}
      style={styles().container}>
      <Image
        style={styles().image}
        source={{
          uri: cover,
          headers: { Accept: 'image/*' },
        }}
        placeholder={blurHash}
        contentFit="cover"
        transition={1000}
      />
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
        <Text style={styles().category}>{place}</Text>
        <View style={styles().footerContainer}>
          <View style={styles(statusColor).statusContainer}>
            <Text style={styles(statusColor).status}>{status}</Text>
          </View>
          <Text style={styles().time}>{timeAgo.format(new Date(time))}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportCard;

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
      gap: 10,
      marginBottom: 8,
    },
    image: {
      width: scale(105),
      aspectRatio: 1 / 1,
      backgroundColor: '#0553',
      borderRadius: 12,
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
  });
