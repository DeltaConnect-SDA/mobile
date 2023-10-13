import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Image } from 'expo-image';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { CameraFilled, Cancel, LiveLocation, Notes } from '@/constants/icons';
import { Input } from '@/components';
import * as Location from 'expo-location';
import { mapAPI } from 'Api/backend';

type Props = {
  route: any;
  navigation: any;
};

type State = {
  photos: any;
  location: object;
  errorMessage: string;
  address: string;
  judul: string;
  lokasiGPS: string;
  detailLokasi: string;
  deskripsi: string;
  kategori: string;
  skalaPrioritas: string;
};

export default class AddComplaintDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      photos: props.route.params.photo,
      location: null,
      errorMessage: null,
      address: null,
      judul: '',
      lokasiGPS: '',
      detailLokasi: '',
      deskripsi: '',
      kategori: '',
      skalaPrioritas: '',
    };
  }

  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied!');
      return;
    }
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    console.log(location);
    const { latitude, longitude } = location.coords;

    await mapAPI
      .get('', {
        params: {
          latlng: `${latitude},${longitude}`,
        },
      })
      .then((res) => {
        const results = res.data.results;
        this.setState({
          address: results[0].formatted_address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    if (!location) {
      console.log('Lokasi tidak ditemukan atau anda menggunakan Fake GPS!');
    } else if (location.mocked) {
      console.log('menggunakan lokasi palsu');
    }
  };

  componentDidMount(): void {
    this.getLocation();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.route.params.photo !== prevProps.route.params.photo) {
      this.setState({
        photos: this.props.route.params.photo,
      });
    }
  }

  deletePhoto = (index) => {
    let photos = [...this.state.photos];
    photos.splice(index, 1);
    this.setState({ photos });
  };

  render() {
    let renderAddMore;
    if (this.state.photos.length < 4) {
      renderAddMore = (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Camera', { photos: this.state.photos, retake: true })
          }
          style={{
            width: scale(70),
            aspectRatio: 1 / 1,
            borderRadius: 12,
            backgroundColor: Colors.LIGHT_GRAY,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CameraFilled color={Colors.TEXT} width={32} height={32} />
        </TouchableOpacity>
      );
    }
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.container}>
          <View style={{ gap: 10, paddingBottom: 20 }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: scale(14) }}>Bukti Foto</Text>
            <View
              style={[
                styles.photosContainer,
                this.state.photos.length < 4 && { justifyContent: 'flex-start', gap: 10 },
              ]}>
              {this.state.photos.map((photo, key) => (
                <View key={key}>
                  <Image
                    source={photo.uri}
                    contentFit="cover"
                    style={{ width: scale(70), aspectRatio: 1 / 1, borderRadius: 12 }}
                  />
                  <TouchableOpacity
                    onPress={() => this.deletePhoto(key)}
                    style={{
                      right: 0,
                      position: 'absolute',
                      borderRadius: 100,
                    }}>
                    <Cancel color={'white'} />
                  </TouchableOpacity>
                </View>
              ))}
              {renderAddMore}
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: scale(11.5),
                color: Colors.GRAY,
                alignSelf: 'flex-end',
              }}>
              {this.state.photos.length}/4 foto
            </Text>
          </View>

          {/* Judul */}
          <View>
            <Input
              onChangeText={(text) => this.setState({ judul: text })}
              maxLength={70}
              title="Judul"
              type="Text"
              placeholder="Tambahkan judul laporan"
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: scale(11.5),
                color: Colors.GRAY,
                marginTop: 5,
                alignSelf: 'flex-end',
              }}>
              {this.state.judul.length} /70 karakter
            </Text>
          </View>

          {/* Lokasi GPS */}
          <View>
            <Input
              icon={<LiveLocation />}
              onChangeText={(text) => this.setState({ lokasiGPS: text })}
              multiline={true}
              editable={false}
              textAlign="left"
              color={Colors.GRAY}
              value={this.state.address}
              title="Lokasi GPS"
              type="Text"
              placeholder="Lokasi ditambahkan otomatis"
            />
          </View>

          {/* Detail Lokasi */}
          <View>
            <Input
              maxLength={600}
              onChangeText={(text) => this.setState({ detailLokasi: text })}
              icon={<Notes color={Colors.TEXT} />}
              title="Detail Lokasi"
              type="Text"
              placeholder="Tambahkan Detail Lokasi"
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: scale(11.5),
                color: Colors.GRAY,
                marginTop: 5,
                alignSelf: 'flex-end',
              }}>
              {this.state.detailLokasi.length} /600 karakter
            </Text>
          </View>

          {/* Deskripsi */}
          <View>
            <Input
              onChangeText={(text) => this.setState({ deskripsi: text })}
              maxLength={1200}
              multiline
              scrollEnabled={false}
              title="Deskripsi"
              type="Text"
              style={{ height: 'auto' }}
              placeholder="Tambahkan deskripsi"
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: scale(11.5),
                color: Colors.GRAY,
                marginTop: 5,
                alignSelf: 'flex-end',
              }}>
              {this.state.deskripsi.length} /1200 karakter
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: verticalScale(18),
  },
  photosContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
