import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/colors';
import { ChevronRight } from '@/constants/icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type FeedHeaderProps = {
  title: string;
  description: string;
  ctaTitle: string;
  ctaRoute: string;
  color: Colors;
};

const FeedHeader: React.FC<FeedHeaderProps> = ({
  title,
  description,
  ctaTitle,
  ctaRoute,
  color,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles().container}>
      <View
        style={{
          gap: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles(color).box}></View>
        <View>
          <Text style={styles().title}>{title}</Text>
          <Text style={styles().description}>{description}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(ctaRoute)} style={styles().ctaContainer}>
        <Text style={styles(color).ctaTitle}>{ctaTitle}</Text>
        <ChevronRight color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default FeedHeader;

const styles = (props?: any) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 20,
      paddingVertical: 32,
    },
    box: {
      backgroundColor: props,
      borderTopEndRadius: 5,
      borderBottomEndRadius: 5,
      width: 15,
      height: 48,
    },
    title: {
      color: Colors.TEXT,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
    },
    description: {
      color: Colors.GRAY,
      fontFamily: 'Poppins-Regular',
      fontSize: 13,
    },
    ctaContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 10,
      gap: 8,
      paddingTop: 5,
      paddingBottom: 3,
      borderColor: Colors.LINE_STROKE,
      borderWidth: 1,
      borderRadius: 10,
    },
    ctaTitle: {
      color: props,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 14,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontStyle: 'normal',
    },
  });
