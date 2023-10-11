import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Input, TopNav } from '@/components';
import { scale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/atom';
import { useEffect } from 'react';

type State = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | number;
};

const Register = ({ route, navigation }) => {
  const params = route.params;
  const [inputs, setInputs] = useState<State>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [errors, setErrors] = useState<any>();

  useEffect(() => {
    if (params?.errors) {
      params.errors.map((err, key) => {
        return setErrors((prevState) => ({ ...prevState, [err.field]: err.error[0] }));
      });
    }
  }, [params?.errors]);

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

    if (!inputs.firstName) {
      handleError('Nama depan harus diisi!', 'firstName');
      valid = false;
    } else if (inputs.firstName.length < 3) {
      handleError('Nama depan minimal 3 karakter!', 'firstName');
      valid = false;
    } else if (inputs.firstName.length > 20) {
      handleError('Nama depan maksimal 20 karakter!', 'firstName');
      valid = false;
    }

    if (!inputs.lastName) {
      handleError('Nama belakang harus diisi!', 'lastName');
      valid = false;
    } else if (inputs.lastName.length < 3) {
      handleError('Nama belakang minimal 3 karakter!', 'lastName');
      valid = false;
    } else if (inputs.lastName.length > 50) {
      handleError('Nama belakang maksimal 50 karakter!', 'lastName');
      valid = false;
    }

    if (!inputs.phone) {
      handleError('Nomor HP harus diisi!', 'phone');
      valid = false;
    }

    if (valid) {
      navigation.navigate('RegisterPasswordStep', { inputs });
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

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  return (
    <ScrollView style={styles.container}>
      <TopNav title="Kembali" onPress={() => navigation.goBack()} />
      <Text style={styles.heading}>Mulai Sekarang!</Text>
      <Text style={styles.textBody}>Daftar dan mulai menikmati kemudahan!!</Text>
      <View style={styles.InputWrapper}>
        <Input
          enterKeyHint="next"
          title="Nama Depan"
          placeholder="Contoh: Yuke"
          type="Text"
          onChangeText={(text) => handleOnChange(text, 'firstName')}
          error={errors?.firstName}
          onFocus={() => handleError(null, 'firstName')}
        />
        <Input
          title="Nama Belakang"
          placeholder="Contoh: Brilliant Hestiavin"
          type="Text"
          onChangeText={(text) => handleOnChange(text, 'lastName')}
          error={errors?.lastName}
          onFocus={() => handleError(null, 'lastName')}
        />
        <Input
          enterKeyHint="next"
          title="Email"
          placeholder="Contoh: emailanda@gmail.com"
          type="Email"
          onChangeText={(text) => handleOnChange(text, 'email')}
          error={errors?.email}
          onFocus={() => handleError(null, 'email')}
        />
        <Input
          enterKeyHint="next"
          title="Nomor Hp"
          placeholder="Contoh: 8123456789"
          type="Phone"
          onChangeText={(text) => handleOnChange(text, 'phone')}
          error={errors?.phone}
          onFocus={() => handleError(null, 'phone')}
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
          onPress={() => navigation.navigate('Login', {})}
          title="Masuk Sekarang!"
          type="Text"
          size="Md"
        />
      </View>
    </ScrollView>
  );
};

export default Register;

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
