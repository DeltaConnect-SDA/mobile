import { StyleSheet, Text, View, Alert, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  Camera as ExpoCamera,
  CameraType,
  requestCameraPermissionsAsync,
  getCameraPermissionsAsync,
  FlashMode,
} from 'expo-camera';
import { CameraFilled, CameraFlip, FlashFilled, FlashOutline, Torch } from '@/constants/icons';
import { Colors } from '@/constants/colors';
import { useIsFocused } from '@react-navigation/native';

type Props = {};
const Camera: React.FC = () => {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [flash, setFlash] = useState<FlashMode>(FlashMode.off);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    await requestCameraPermissionsAsync();
  };

  const getPermissions = async () => {
    const cameraPermission = await getCameraPermissionsAsync();

    return cameraPermission.granted;
  };

  console.log(getCameraPermissionsAsync());

  console.log('ok');

  if (!getPermissions()) {
    return Alert.alert(
      'Perizinan dibutuhkan!',
      'Anda harus mengizinkan penggunaan kamera untuk melapor.',
      [{ text: 'Baik' }]
    );
  } else {
    return (
      <View style={styles.container}>
        <ExpoCamera style={styles.camera} type={type} flashMode={flash} ratio="4:3"></ExpoCamera>
        <View style={styles.controllerContainer}>
          <TouchableOpacity
            onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
            style={{ backgroundColor: '#606060', padding: 20, borderRadius: 100 }}>
            <CameraFlip />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.PRIMARY_GREEN,
              width: 85,
              height: 85,
              borderRadius: 150,
              borderWidth: 10,
              borderColor: 'white',
            }}>
            <CameraFilled />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setFlash(
                flash === FlashMode.off
                  ? FlashMode.on
                  : flash === FlashMode.torch
                  ? FlashMode.off
                  : FlashMode.torch
              )
            }
            style={{ backgroundColor: '#606060', padding: 20, borderRadius: 100 }}>
            {flash === FlashMode.off ? (
              <FlashOutline />
            ) : flash === FlashMode.on ? (
              <FlashFilled />
            ) : flash === FlashMode.torch ? (
              <Torch />
            ) : (
              <FlashOutline />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  camera: {
    aspectRatio: '3/4',
  },
  controllerContainer: {
    flex: 1,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#000000B2',
    paddingBottom: Dimensions.get('window').height < 800 ? 50 : 0,
    paddingHorizontal: 20,
    height: '100%',
  },
});
