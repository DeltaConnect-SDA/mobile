import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Input, Loader, TopNav } from '@/components';
import { scale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/atom';
import { authAPI } from 'Api/backend';

type PasswordsType = {
  password: string;
  passwordConfirm: string;
};

const RegisterPasswordStep = ({ route, navigation }) => {
  const { inputs } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [passwords, setPasswords] = useState<PasswordsType>({
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState<any>();

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!passwords.password) {
      handleError('Password harus diisi!', 'password');
      valid = false;
    } else if (passwords.password.length < 8) {
      handleError('Password harus 8 karakter atau lebih!', 'password');
      valid = false;
    }

    if (!passwords.passwordConfirm) {
      handleError('Konfirmasi Password harus diisi!', 'passwordConfirm');
      valid = false;
    } else if (passwords.password !== passwords.passwordConfirm) {
      handleError('Konfirmasi Password tidak sama!', 'passwordConfirm');
      valid = false;
    }

    if (valid) {
      setLoading(true);
      register();
    }
  };

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

  const register = () => {
    authAPI
      .post('/register', {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phone: filterPhoneNumber(inputs.phone),
        password: passwords.password,
      })
      .then((res) => {
        setLoading(false);
        const result = res.data;
        const { message, data, success } = result;

        if (!success) {
          console.log({ message, data }, 'error');
        } else {
          navigation.navigate('RegisterPhoneVerification', { inputs });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(JSON.stringify(error.response.data));
        if (error.response.data.error === 'Bad Request') {
          navigation.navigate('Register', { errors: error.response.data.message });
        } else {
          console.log(error);
        }
      });
  };

  const handleOnChange = (text, input) => {
    setPasswords((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <>
      <Loader visible={loading} />
      <ScrollView style={styles.container}>
        <TopNav title="Kembali" onPress={() => navigation.goBack()} />
        <Text style={styles.heading}>Masukkan Password!</Text>
        <Text style={styles.textBody}>Buat password yang sulit dan mudah diingat!</Text>
        <View style={styles.InputWrapper}>
          <Input
            enterKeyHint="next"
            title="Password"
            placeholder="Password minimal 8 karakter"
            type="Password"
            onChangeText={(text) => handleOnChange(text, 'password')}
            error={errors?.password}
            onFocus={() => handleError(null, 'password')}
          />
          <Input
            title="Konfirmasi Password"
            placeholder="Isikan Kembali password anda"
            type="Password"
            onChangeText={(text) => handleOnChange(text, 'passwordConfirm')}
            error={errors?.passwordConfirm}
            onFocus={() => handleError(null, 'passwordConfirm')}
          />
        </View>
        <Button
          onPress={() => validate()}
          title="Lanjutkan"
          type="Primary"
          size="Lg"
          style={{ marginTop: 32 }}
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
      </ScrollView>
    </>
  );
};

export default RegisterPasswordStep;

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
    marginBottom: 28,
  },
  InputWrapper: {
    gap: 20,
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
