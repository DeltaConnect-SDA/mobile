import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TopNav } from '@/components';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/atom';
import { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Loader from '@/components/atom/Loader';
import { authAPI } from 'Api/backend';

const CELL_COUNT = 4;

const RegisterSendEmail = ({ route, navigation }) => {
  const { inputs } = route.params;
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const verify = () => {
    setLoading(true);
    authAPI
      .get(`/verify/email/?code=${value}&email=${inputs.email}`)
      .then((res) => {
        setLoading(false);
        const result = res.data;
        const { message, code } = result;
        console.log(result, 'result');

        console.log({ message });
        if (code != 201) {
          console.log({ message }, 'error');
        } else {
          navigation.navigate('RegisterPhoneVerification', { inputs });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.message);
      });
  };

  const resend = () => {
    authAPI
      .post('/verify/email/request', {
        email: inputs.email,
        phone: inputs.phone,
      })
      .then((res) => {
        setLoading(false);
        const result = res.data;
        const { message, code } = result;

        if (code !== 200) {
          console.log({ message });
        } else {
          console.log('ok');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <Loader visible={loading} />
      <ScrollView style={styles.container}>
        <Loader />
        <TopNav title="Kembali" onPress={() => navigation.goBack()} />
        <Text style={styles.heading}>Verifikasi Email!</Text>
        <Text style={styles.textBody}>Masukkan 4 digit kode verifikasi email mu!</Text>
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
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <Button
            onPress={() => resend()}
            title="Kirim Ulang"
            size="Sm"
            type="Text"
            style={{ marginTop: 20 }}
          />
          <Button
            onPress={() => verify()}
            title="Lanjutkan"
            type={value.length == 4 ? 'Primary' : 'Disabled'}
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

export default RegisterSendEmail;

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
    marginBottom: verticalScale(100),
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
    paddingHorizontal: 40,
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
});
