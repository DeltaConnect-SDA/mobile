import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import {
  Camera as ExpoCamera,
  CameraType,
  requestCameraPermissionsAsync,
  getCameraPermissionsAsync,
  FlashMode,
} from 'expo-camera';
import { CameraFilled, CameraFlip, FlashFilled, FlashOutline, Torch } from '@/constants/icons';
import { Colors } from '@/constants/colors';

type Props = {};

interface State {
  granted: boolean;
  type: CameraType;
  flash: FlashMode;
  isLoading: boolean;
}

export class Camera extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { granted: false, type: CameraType.back, flash: FlashMode.off, isLoading: true };
  }

  async componentDidMount() {
    const { granted } = await requestCameraPermissionsAsync();
    console.log(granted);

    if (granted === true) {
      this.setState({ granted: true });
      this.setState({ isLoading: false });
    } else {
      Alert.alert(
        'Perizinan dibutuhkan!',
        'Anda harus mengizinkan penggunaan kamera untuk melapor.',
        [{ text: 'Baik' }]
      );
      this.setState({ isLoading: false });
      this.setState({ granted: false });
    }
  }

  render() {
    if (!this.state.isLoading) {
      if (!this.state.granted) {
        return <Text>wah parah</Text>;
      } else {
        return (
          <View style={styles.container}>
            <ExpoCamera
              style={styles.camera}
              type={this.state.type}
              flashMode={this.state.flash}
              ratio="4:3"></ExpoCamera>
            <View style={styles.controllerContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    type: this.state.type === CameraType.back ? CameraType.front : CameraType.back,
                  })
                }
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
                  this.setState({
                    flash:
                      this.state.flash === FlashMode.off
                        ? FlashMode.on
                        : this.state.flash === FlashMode.torch
                        ? FlashMode.off
                        : FlashMode.torch,
                  })
                }
                style={{ backgroundColor: '#606060', padding: 20, borderRadius: 100 }}>
                {this.state.flash === FlashMode.off ? (
                  <FlashOutline />
                ) : this.state.flash === FlashMode.on ? (
                  <FlashFilled />
                ) : this.state.flash === FlashMode.torch ? (
                  <Torch />
                ) : (
                  <FlashOutline />
                )}
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    } else {
      return (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 10,
          }}>
          <ActivityIndicator size="large" color={Colors.PRIMARY_GREEN} />
          <Text>Tunggu Sebentar.....</Text>
        </View>
      );
    }
  }
}
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
