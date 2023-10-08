import {
  StatusBar as RNStatusBar,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, { Component } from 'react';
import { Colors } from '@/constants/colors';
import TopNav from '@/components/TopNav';
import { ConnectIllustration } from '@/constants/illustrations';
import { Button } from '@/components/atom';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Onboarding = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <ScrollView style={styles.container}>
      <TopNav title="Kembali" />
      <ConnectIllustration width="100%" />
      <Text style={styles.heading}>Mulai Terhubung!</Text>
      <Text style={styles.textBody}>
        Laporkan masalah infrastruktur & lingkungan dengan transparan dan akuntabel!
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => navigation.navigate('Login')}
          type="Primary"
          size="Lg"
          title="Masuk Sekarang"
        />
        <Button type="Outline" size="Lg" title="Buat Akun" style={{ marginBottom: 100 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: (Platform.OS === 'android' ? RNStatusBar.currentHeight : 0) + 32,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  heading: {
    color: Colors.TEXT,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  textBody: {
    color: Colors.GRAY,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginBottom: 32,
  },
  buttonsContainer: {
    gap: 10,
  },
});

export default Onboarding;
