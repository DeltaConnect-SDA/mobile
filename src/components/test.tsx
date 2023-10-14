import {
  StatusBar as RNStatusBar,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Button } from './atom';
import { HomeOutline } from '@/constants/icons';
import InfoFeed from './Home/Feed/InfoFeed';
import ReportFeed from './Home/Feed/ReportFeed';
import { Login } from '@/screens';

const Test = () => {
  return (
    <Login />
    // <ScrollView>
    //   <View style={styles.container}>
    //     <Button title="Daftar Sekarang!" size="Sm" type="Secondary" />
    //     <Button title="Daftar Sekarang!" size="Md" type="Primary" />
    //     <Button title="Daftar Sekarang!" size="Lg" type="Primary" />
    //     <Button title="Daftar Sekarang!" size="Sm" type="Primary" />
    //     <Text>okokok</Text>
    //   </View>
    //   <InfoFeed />
    //   <ReportFeed />
    // </ScrollView>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    paddingTop: (Platform.OS === 'android' ? RNStatusBar.currentHeight : 0) + 32,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
});
