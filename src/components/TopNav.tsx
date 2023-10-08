import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { Back } from '@/constants/icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface PropTypes extends PressableProps {
  title: string;
}

const TopNav: React.FC<PropTypes> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <Pressable onPress={() => navigation.goBack()} {...props} style={styles.container}>
      <Back width={24} height={24} />
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: Colors.TEXT,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});

export default TopNav;
