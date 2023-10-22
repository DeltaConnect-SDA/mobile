import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import TopNav from '@/components/TopNav';
import { Colors } from '@/constants/colors';
import { Input } from '@/components/atom/';
import { Button } from '@/components/atom';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { scale } from 'react-native-size-matters';
import { Keyboard } from 'react-native';
import { useAuth } from '@/context/AuthProvider';
import { authAPI } from 'Api/backend';
import { Error } from '@/components/atom/Input';
import { Loader } from '@/components';

type State = {
  email: string;
  password: string;
};

const Login = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState<State>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>();
  const { authState, authenticate } = useAuth();

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    if (!inputs.email) {
      handleError('Email harus diisi!', 'email');
      valid = false;
    } else if (!inputs.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      handleError('Format email tidak valid!', 'email');
      valid = false;
    }

    if (!inputs.password) {
      handleError('Password harus diisi!', 'password');
      valid = false;
    } else if (inputs.password.length < 8) {
      handleError('Password harus 8 karakter atau lebih!', 'password');
      valid = false;
    }

    if (valid) {
      setLoading(true);
      doLogin();
    }
  };

  const doLogin = () => {
    authAPI
      .post('/login', {
        email: inputs.email.trim(),
        password: inputs.password,
      })
      .then(async (res) => {
        setLoading(false);
        const result = res.data;
        const { data, success } = result;

        if (success) {
          console.log(data);

          if (data[0].user.UserDetail.isPhoneVerified) {
            await authenticate(data[1].access_token, data[0].user.id, 'true');
            navigation.navigate('Success', {
              title: 'Selamat Datang Kembali!',
              description: 'Selamat datang! Nikmati kembali kemudahan dengan DeltaConnect.',
              toRoute: 'BottomNav',
              cta: 'Selesai',
            });
          } else {
            navigation.navigate('RegisterPhoneVerification', {
              inputs: { phone: data[0].user.phone, email: inputs.email },
              creds: { token: data[1].access_token, userId: data[0].user.id },
            });
          }
        } else {
          handleError(result.message, 'general');
        }
      })
      .catch((error) => {
        setLoading(false);

        if (error?.response?.status === 400 || error?.response?.status === 404) {
          handleError(error.response?.data?.message, 'general');
        } else {
          console.error('Login error:', error);
        }
      });
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  return (
    <>
      <Loader visible={loading} />
      <ScrollView style={styles.container}>
        <TopNav title="Kembali" onPress={() => navigation.goBack()} />
        <Text style={styles.heading}>Selamat Datang!</Text>
        <Text style={styles.textBody}>Masuk untuk memulai kemudahan!</Text>
        {errors?.general && <Error title={errors?.general} />}
        <View style={styles.InputWrapper}>
          <Input
            enterKeyHint="next"
            title="Email"
            placeholder="Masukkan email anda!"
            type="Email"
            onChangeText={(text) => handleOnChange(text, 'email')}
            error={errors?.email}
            onFocus={() => handleError(null, 'email')}
          />
          <Input
            title="Password"
            placeholder="Masukkan minimal 8 karakter password!"
            type="Password"
            onChangeText={(text) => handleOnChange(text, 'password')}
            error={errors?.password}
            onFocus={() => handleError(null, 'password')}
          />
        </View>
        <Button
          title="Lupa Password?"
          type="Text"
          size="Md"
          style={{ marginBottom: 20, marginTop: 10 }}
        />
        <Button onPress={() => validate()} title="Masuk Sekarang" type="Primary" size="Lg" />
        <View style={[styles.bottomText, { marginBottom: 100 }]}>
          <Text style={{ fontFamily: 'Poppins-Regular', fontSize: scale(11.5) }}>
            Belum punya akun?{' '}
          </Text>
          <Button
            onPress={() => navigation.navigate('Register')}
            title="Daftar Sekarang!"
            type="Text"
            size="Md"
          />
        </View>
      </ScrollView>
    </>
  );
};

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
