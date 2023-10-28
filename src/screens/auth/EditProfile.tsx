import { Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import UserAvatar from '@muhzi/react-native-user-avatar';
import { Colors } from '@/constants/colors';
import { Input } from '@/components';

type State = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | number;
};
const EditProfile = ({ route, navigation }) => {
  const { data } = route.params;
  const [inputs, setInputs] = useState<State>({
    email: data.email,
    firstName: data.firstName,
    lastName: data.LastName,
    phone: filterPhoneNumber(data.phone),
  });

  const [errors, setErrors] = useState<any>();

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
      console.log('ok');
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
    if (phoneNumber.startsWith('62')) {
      phoneNumber = phoneNumber.substring(2);
    }

    return phoneNumber;
  }

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => validate()}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: scale(14),
              color: Colors.PRIMARY_GREEN,
            }}>
            Simpan
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: 'center', marginBottom: verticalScale(58) }}>
          <UserAvatar
            userName={data?.firstName + ' ' + data?.LastName || 'Guest'}
            size={scale(90)}
            fontSize={scale(32)}
            backgroundColor={Colors.PRIMARY_GREEN}
          />
        </View>
        <View style={styles.InputWrapper}>
          <Input
            enterKeyHint="next"
            title="Nama Depan"
            placeholder="Contoh: Yuke"
            type="Text"
            value={inputs.firstName}
            onChangeText={(text) => handleOnChange(text, 'firstName')}
            error={errors?.firstName}
            onFocus={() => handleError(null, 'firstName')}
          />
          <Input
            title="Nama Belakang"
            placeholder="Contoh: Brilliant Hestiavin"
            type="Text"
            value={inputs.lastName}
            onChangeText={(text) => handleOnChange(text, 'lastName')}
            error={errors?.lastName}
            onFocus={() => handleError(null, 'lastName')}
          />
          <Input
            enterKeyHint="next"
            title="Email"
            placeholder="Contoh: emailanda@gmail.com"
            type="Email"
            value={inputs.email}
            onChangeText={(text) => handleOnChange(text, 'email')}
            error={errors?.email}
            onFocus={() => handleError(null, 'email')}
          />
          <Input
            enterKeyHint="next"
            title="Nomor Hp"
            placeholder="Contoh: 8123456789"
            type="Phone"
            value={inputs.phone.toString()}
            onChangeText={(text) => handleOnChange(text, 'phone')}
            error={errors?.phone}
            onFocus={() => handleError(null, 'phone')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(30),
  },
  contentContainer: {
    display: 'flex',
    paddingHorizontal: scale(20),
  },
  InputWrapper: {
    gap: 20,
  },
});
