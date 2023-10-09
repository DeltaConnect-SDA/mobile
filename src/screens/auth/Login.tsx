import {
  StatusBar as RNStatusBar,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, { Component } from 'react';
import TopNav from '@/components/TopNav';
import { Colors } from '@/constants/colors';
import { Input } from '@/components/atom/';
import { Button } from '@/components/atom';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <ScrollView style={styles.container}>
      <TopNav title="Kembali" onPress={() => navigation.goBack()} />
      <Text style={styles.heading}>Selamat Datang!</Text>
      <Text style={styles.textBody}>Masuk untuk memulai kemudahan!</Text>
      <View style={styles.InputWrapper}>
        <Input
          enterKeyHint="next"
          title="Email"
          placeholder="Masukkan email anda!"
          type="Text"
          error="Email harus diisi!"
        />
        <Input
          title="Password"
          placeholder="Masukkan minimal 8 karakter password!"
          type="Password"
        />
      </View>
      <Button
        title="Lupa Password?"
        type="Text"
        size="Md"
        style={{ marginBottom: 20, marginTop: 10 }}
      />
      <Button
        onPress={() => navigation.navigate('BottomNav')}
        title="Masuk Sekarang"
        type="Primary"
        size="Lg"
      />
      <View style={[styles.bottomText, { marginBottom: 100 }]}>
        <Text>Belum punya akun? </Text>
        <Button title="Daftar Sekarang!" type="Text" size="Lg" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: (Platform.OS === 'android' ? RNStatusBar.currentHeight : 0) + 32,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  heading: {
    color: Colors.TEXT,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginTop: 52,
  },
  textBody: {
    color: Colors.GRAY,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginBottom: 20,
  },
  InputWrapper: {
    gap: 20,
    marginTop: 32,
  },
  bottomText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    textAlign: 'center',
  },
});

export default Login;
