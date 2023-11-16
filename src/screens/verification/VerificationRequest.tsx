import { Keyboard, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Input } from '@/components';
import { Button, Loader } from '@/components/atom';
import { publicAPI } from 'Api/backend';
import { useAuth } from '@/context/AuthProvider';
import { StackActions } from '@react-navigation/native';

const VerificationRequest = ({ navigation }) => {
  const [nik, setNIK] = useState<string>(null);
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { authState } = useAuth();

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!nik) {
      setError('NIK harus diisi!');
      valid = false;
    } else if (nik.length != 16) {
      setError('NIK harus 16 Digit!');
      valid = false;
    }

    if (valid) {
      handleVerify();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      await publicAPI.post(
        'users/verifications',
        {
          idNumber: nik,
        },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      );
      setIsLoading(false);
      navigation.dispatch(
        StackActions.replace('Success', {
          title: 'Verifikasi Penduduk Berhasil!',
          description: 'Mohon untuk menunggu proses verifikasi penduduk!',
          toRoute: 'BottomNav',
          cta: 'Kembali ke Beranda',
        })
      );
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  return (
    <View style={styles.container}>
      {isLoading && <Loader visible />}
      <View style={styles.contentContainer}>
        <View style={styles.InputWrapper}>
          <Input
            enterKeyHint="next"
            title="NIK Sidoarjo"
            placeholder="Masukkan NIK"
            type="Number"
            onChangeText={(text) => setNIK(text)}
            error={error}
            onFocus={() => setError(null)}
            style={{ marginBottom: 20 }}
          />
          <Button onPress={() => validate()} title="Verifikasi Sekarang" type="Primary" size="Md" />
        </View>
      </View>
    </View>
  );
};

export default VerificationRequest;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: moderateScale(30),
    height: '100%',
  },
  contentContainer: {
    display: 'flex',
    paddingHorizontal: scale(20),
  },
  InputWrapper: {
    display: 'flex',
    gap: 20,
  },
});
