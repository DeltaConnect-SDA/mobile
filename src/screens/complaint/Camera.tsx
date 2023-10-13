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
import { Pictures } from '@/constants/illustrations';
import { StatusBar } from 'expo-status-bar';
import { CommonActions, useIsFocused } from '@react-navigation/native';

type Props = {
  navigation: any;
  isFocused: any;
  route: any;
};

interface State {
  granted: boolean;
  type: CameraType;
  flash: FlashMode;
  isLoading: boolean;
  loaded?: boolean;
}

export class Camera extends Component<Props, State> {
  camera: ExpoCamera;
  photos;
  constructor(props: Props) {
    super(props);
    this.state = { granted: false, type: CameraType.back, flash: FlashMode.off, isLoading: true };
  }

  __takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({
        quality: 0.3, // Adjust this value (0.0 - 1.0) for picture quality
        skipProcessing: true, // Set to true to skip processing
        onPictureSaved: this.onPictureSaved,
      });
    }
  };

  onPictureSaved = (photo) => {
    if (this.props.route.params?.retake) {
      this.photos = [...this.props.route.params.photos, photo];
      this.props.navigation.dispatch(
        CommonActions.navigate({
          name: 'AddComplaintDetails',
          params: { photo: this.photos },
        })
      );
    } else {
      this.props.navigation.navigate('AddComplaintDetails', { photo: [photo] });
    }
  };

  async componentDidMount() {
    const { granted } = await requestCameraPermissionsAsync();

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
    this.props.navigation.addListener('focus', () => {
      this.setState({ loaded: true });
    });
    this.props.navigation.addListener('blur', () => {
      this.setState({ loaded: false });
    });
    if (!this.state.isLoading && this.state.loaded) {
      if (!this.state.granted) {
        return (
          <View style={styles.emptyState}>
            <StatusBar style="light" />
            <Pictures />
            <Text style={styles.emptyStateHeading}>Akses Kamera Tidak Diizinkan</Text>
            <Text style={styles.emptyStateText}>
              Mohon maaf, kami tidak memiliki izin untuk mengakses kamera ponsel anda!
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <StatusBar style="light" />
            <ExpoCamera
              ref={(ref) => {
                this.camera = ref;
              }}
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
                onPress={() => this.__takePicture()}
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
                <CameraFilled color={'white'} />
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
    backgroundColor: '#000000',
    paddingBottom: Dimensions.get('window').height < 800 ? 50 : 0,
    paddingHorizontal: 20,
    height: '100%',
  },
  emptyState: {
    display: 'flex',
    height: '100%',
    maxHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    paddingBottom: 100,
  },
  emptyStateHeading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.TEXT,
  },
  emptyStateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.GRAY,
    textAlign: 'center',
    maxWidth: 300,
  },
});
