import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Loader, TopNav } from '@/components';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/atom';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { authAPI } from 'Api/backend';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import { useAuth } from '@/context/AuthProvider';

const CELL_COUNT = 4;

const RegisterPhoneVerification = ({ route, navigation }) => {
  const { authenticate } = useAuth();
  const { inputs, creds } = route.params;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>();
  const [ready, setReady] = useState<boolean>(false);
  const refTimer = useRef<CountDownTimer>();

  function filterPhoneNumber(phoneNumber) {
    // Menghilangkan spasi dan karakter non-digit dari nomor telepon
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Jika nomor diawali dengan '0', hapus '0' dan tambahkan '62'
    if (phoneNumber.startsWith('0')) {
      phoneNumber = '62' + phoneNumber.slice(1);
    }

    // Jika nomor diawali dengan '+', hilangkan '+'
    if (phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.slice(1);
    }

    // Jika nomor tidak diawali dengan '62', tambahkan '62'
    if (!phoneNumber.startsWith('62')) {
      phoneNumber = '62' + phoneNumber;
    }

    return phoneNumber;
  }
  const requestOTP = async () => {
    setReady(false);
    refTimer.current.resetTimer();
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.post('/verify/phone/request', {
        phone: filterPhoneNumber(inputs.phone),
        email: inputs.email,
      });

      if (response.data.success) {
        setLoading(false);
        console.log('OTP requested successfully');
      } else {
        console.log('Failed to request OTP');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);

      console.error(
        'An error occurred while requesting OTP:',
        JSON.stringify(error.response.data.message)
      );
      if (error.response.data.code === 429) {
        setReady(true);
      }
      setError(error.response.data.message);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      console.log(value);
      const response = await authAPI.get('/verify/phone', {
        params: { phone: filterPhoneNumber(inputs.phone), code: value },
      });

      if (response.data.success) {
        await authenticate(creds.token, creds.userId, 'true');
        console.log('OTP verified successfully');
        navigation.navigate('Success', {
          title: 'Pendaftaran Berhasil!',
          description: 'Selamat! Kamu berhak menikmati berbagai kemudahan di sini!',
          toRoute: 'BottomNav',
          cta: 'Selesai',
        });
      } else {
        console.log('Failed to verify OTP');
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('An error occurred while verifying OTP:', error.response);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    requestOTP();
  }, []);
  return (
    <>
      <Loader visible={loading} />
      <ScrollView style={styles.container}>
        <TopNav title="Kembali" onPress={() => navigation.goBack()} />
        <Text style={styles.heading}>Verifikasi Nomor HP!</Text>
        <Text style={styles.textBody}>Masukkan 4 digit kode verifikasi nomor mu!</Text>
        <Text style={styles.error}>{error}</Text>
        <View style={styles.IllustrationtWrapper}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoFocus={true}
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <View
            style={{
              display: !ready ? 'flex' : 'none',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={{ fontSize: scale(14), color: Colors.TEXT, fontWeight: '500' }}>
              Kirim ulang dalam:
            </Text>
            <CountDownTimer
              ref={refTimer}
              timestamp={120}
              timerCallback={(flag) => setReady(flag)}
              textStyle={{
                fontSize: scale(14),
                color: Colors.PRIMARY_GREEN,
                fontWeight: '500',
                letterSpacing: 0.25,
              }}
            />
          </View>
          {ready && (
            <Button
              onPress={() => requestOTP()}
              title="Kirim Ulang"
              size="Sm"
              type="Text"
              // style={{ marginTop: 20 }}
            />
          )}
          <Button
            onPress={() => verifyOTP()}
            title="Lanjutkan"
            type="Primary"
            size="Lg"
            style={{ marginTop: 20 }}
          />
          <View style={[styles.bottomText, { marginBottom: 100 }]}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: scale(11.5) }}>
              Sudah punya akun?{' '}
            </Text>
            <Button
              onPress={() => navigation.navigate('Login')}
              title="Masuk Sekarang!"
              type="Text"
              size="Md"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterPhoneVerification;

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  heading: {
    color: Colors.TEXT,
    fontFamily: 'Poppins-Bold',
    fontSize: scale(21.5),
    marginTop: 52,
  },
  textBody: {
    color: Colors.GRAY,
    fontFamily: 'Poppins-Regular',
    fontSize: scale(13.5),
  },
  IllustrationtWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  codeFiledRoot: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: moderateScale(40),
  },
  cell: {
    width: scale(50),
    aspectRatio: 1 / 1,
    backgroundColor: Colors.LINE_STROKE,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderRadius: 14,
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(12),
  },
  focusCell: {
    borderColor: Colors.PRIMARY_GREEN,
    borderWidth: 1,
  },
  bottomText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(32),
    textAlign: 'center',
  },
  error: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(11),
    color: Colors.PRIMARY_RED,
    marginBottom: verticalScale(100),
    textAlign: 'center',
  },
});
