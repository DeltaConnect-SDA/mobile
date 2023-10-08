import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/colors';
import { Image } from 'expo-image';

type FeedCardProps = {
  title: string;
  cover: string;
  category: string;
  date: string;
  blurHash: string;
};

const FeedCard: React.FC<FeedCardProps> = ({ title, category, date, cover, blurHash }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: cover,
          headers: { Accept: 'image/*' },
        }}
        placeholder={blurHash}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{category}</Text>
          </View>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
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
    width: 120,
    height: 120,
    backgroundColor: '#0553',
    borderRadius: 12,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    gap: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: Colors.TEXT,
    fontSize: 14,
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
    backgroundColor: Colors.SECONDARY_PURPLE,
    borderRadius: 8,
  },
  category: {
    color: Colors.PRIMARY_PURPLE,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlignVertical: 'center',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.DARK_GRAY,
  },
});
