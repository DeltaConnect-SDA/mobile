import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import React, { Component } from 'react';
import { Image } from 'expo-image';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { CameraFilled, Cancel, ChevronDown, Close, LiveLocation, Notes } from '@/constants/icons';
import { Input, Loader } from '@/components';
import * as ExpoLocation from 'expo-location';
import { mapAPI, publicAPI } from 'Api/backend';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Location } from '@/constants/illustrations';
import { Button } from '@/components/atom';
import { Linking, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { moderateScale } from 'react-native-size-matters';
import { Error, InputLabel } from '@/components/atom/Input';
import { createComplaint } from '@/services';
import { StackActions } from '@react-navigation/native';

type Props = {
  route: any;
  navigation: any;
};

type State = {
  granted: boolean;
  loading: boolean;
  locationReady: boolean;
  photos: any;
  location: object;
  errorMessage: any;
  village: string;
  lat: string;
  long: string;
  address: string;
  title: string;
  GPSaddress: string;
  detail_location: string;
  description: string;
  categoryId: any;
  priorityId: number;
  categories: any;
  categoryOpen: any;
  categoryLoading: boolean;
  priorities: any;
  priorityOpen: any;
  priorityLoading: boolean;
  storeLoading: boolean;
};

DropDownPicker.setLanguage('ID');
export default class AddComplaintDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      photos: props.route.params.photo,
      location: null,
      errorMessage: null,
      address: null,
      title: null,
      GPSaddress: null,
      detail_location: null,
      description: null,
      categoryId: null,
      priorityId: null,
      granted: false,
      loading: true,
      locationReady: false,
      village: null,
      lat: null,
      long: null,
      categories: [],
      categoryOpen: false,
      categoryLoading: true,
      priorities: [],
      priorityOpen: false,
      priorityLoading: true,
      storeLoading: false,
    };
  }

  getLocation = async () => {
    let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ loading: false });
      this.setState({ granted: false });
      console.error('Permission to access location was denied!');
      return;
    }
    this.setState({ granted: true });
    this.setState({ loading: false });
    let location = await ExpoLocation.getCurrentPositionAsync();
    console.log('location');
    console.log(location);

    const { latitude, longitude } = location.coords;

    if (location.mocked) {
      this.setState((prevState) => ({
        errorMessage: { ...prevState.errorMessage, GPSaddress: 'Anda menggunakan lokasi palsu!' },
      }));
    } else {
      await mapAPI
        .get('', {
          params: {
            latlng: `${latitude},${longitude}`,
          },
        })
        .then((res) => {
          const results = res.data.results;
          this.setState({
            GPSaddress: results[0].formatted_address,
            lat: latitude.toString(),
            long: longitude.toString(),
            village: results[0].address_components[1].short_name,
          });
          this.setState((prevState) => ({
            errorMessage: { ...prevState.errorMessage, GPSaddress: '' },
          }));
          this.setState({ locationReady: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  getPriorities = async () => {
    try {
      const response = await publicAPI.get('v1/priorities');
      const { data } = response.data;
      this.setState({ categoryLoading: false });
      const priorities = data.map((priority) => ({
        label: priority.title,
        value: priority.id.toString(),
        labelStyle: {
          color: Colors[`PRIMARY_${priority.color}`],
        },
      }));

      this.setState({ priorities });
    } catch (error) {
      this.setState({ priorityLoading: false });
      console.error('An error occurred while fetching priorities:', error.response.data);
    }
  };
  getCategories = async () => {
    try {
      const response = await publicAPI.get('v1/categories');
      const { data } = response.data;
      this.setState({ categoryLoading: false });
      const categories = data.map((category) => ({
        label: category.title,
        value: category.id.toString(),
      }));

      this.setState({ categories });
    } catch (error) {
      this.setState({ categoryLoading: false });
      console.error('An error occurred while fetching categories:', error.response.data);
    }
  };

  validate = async () => {
    Keyboard.dismiss();
    let valid = true;

    // Photos
    if (this.state.photos.length == 0) {
      valid = false;
      console.log('invalid1');
      this.setState((prevState) => ({
        errorMessage: { ...prevState.errorMessage, photos: 'Harus ada foto bukti!' },
      }));
    }

    // Title
    if (!this.state.title) {
      valid = false;
      console.log('invalid2');
      this.setState((prevState) => ({
        errorMessage: { ...prevState.errorMessage, title: 'Judul harus diisi!' },
      }));
    } else if (this.state.title.length < 4) {
      valid = false;
      console.log('invalid3');
      this.setState((prevState) => ({
        errorMessage: { ...prevState.errorMessage, title: 'Judul harus lebih dari 4 karakter!' },
      }));
    }

    // GPS
    if (!this.state.locationReady) {
      valid = false;
      console.log('invalid4');
      this.setState((prevState) => ({
        errorMessage: { ...prevState.errorMessage, GPSaddress: 'Lokasi GPS belum ditemukan' },
      }));
    }

    // Detail lokasi
    if (!this.state.detail_location) {
      valid = false;
      console.log('invalid5');
      this.setState((prevState) => ({
        errorMessage: { ...prevState.errorMessage, detail_location: 'Detail lokasi harus diisi!' },
      }));
    } else if (this.state.detail_location.length < 4) {
      valid = false;
      console.log('invalid6');
      this.setState((prevState) => ({
        errorMessage: {
          ...prevState.errorMessage,
          detail_location: 'Detail lokasi harus lebih dari 4 karakter!',
        },
      }));
    }

    // Deskripsi
    if (!this.state.description) {
      valid = false;
      console.log('invalid7');
      this.setState((prevState) => ({
        errorMessage: { ...prevState.errorMessage, description: 'Deskripsi harus diisi!' },
      }));
    } else if (this.state.description.length < 70) {
      valid = false;
      console.log('invalid8');
      this.setState((prevState) => ({
        errorMessage: {
          ...prevState.errorMessage,
          description: 'Deskripsi harus lebih dari 70 karakter!',
        },
      }));
    }

    // Kategori
    if (!this.state.categoryId) {
      valid = false;
      console.log('invalid9');
      this.setState((prevState) => ({
        errorMessage: { ...prevState.errorMessage, category: 'Kategori harus diisi!' },
      }));
    }

    // Urgensi
    if (!this.state.priorityId) {
      valid = false;
      console.log('invalid10');
      this.setState((prevState) => ({
        errorMessage: { ...prevState.errorMessage, priority: 'Urgensi harus diisi!' },
      }));
    }
    if (valid) {
      this.setState({ storeLoading: true });
      try {
        const res = await createComplaint(
          {
            title: this.state.title,
            categoryId: this.state.categoryId,
            description: this.state.description,
            detail_location: this.state.detail_location,
            GPSaddress: this.state.GPSaddress,
            lat: this.state.lat,
            long: this.state.long,
            priorityId: this.state.priorityId,
            village: this.state.village,
          },
          this.state.photos
        );

        const { success } = res.data;

        if (success) {
          this.setState({ storeLoading: false });
          this.props.navigation.navigate('Success', {
            title: 'Laporan Dikirim!',
            description:
              'Selamat! Laporanmu kami terima dan segera kami ko-ordinasikan dengan pihak terkait!',
            toRoute: 'Riwayat',
            cta: 'Selesai',
            illustration: 'send',
          });
        }
      } catch (err) {
        this.setState({ storeLoading: false });
        console.log(err.response);
        if (err.response.status === 401) {
          Alert.alert(
            'Error', // judul
            err.response.data.message, // pesan
            [
              {
                text: 'OK',
                onPress: async () => {
                  this.props.navigation.dispatch(StackActions.replace('BottomNav'));
                },
              },
            ]
          );
        }
        console.error('Create complaint error:', JSON.stringify(err.message));
      }
    }
  };

  handleError = (message, input) => {
    this.setState((prevState) => ({
      errorMessage: { ...prevState.errorMessage, [input]: message },
    }));
  };

  UNSAFE_componentWillMount(): void {
    this.getLocation();
  }

  componentDidMount(): void {
    this.getLocation();
    this.getCategories();
    this.getPriorities();
    console.log(this.state.photos);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.route.params.photo !== prevProps.route.params.photo) {
      this.setState({
        photos: this.props.route.params.photo,
      });
      console.log(this.state.photos);
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
    if (!this.state.loading) {
      if (!this.state.granted) {
        return (
          <View style={styles.emptyState}>
            <StatusBar style="light" />
            <Location />
            <Text style={styles.emptyStateHeading}>Akses Lokasi Tidak Diizinkan</Text>
            <Text style={styles.emptyStateText}>
              Mohon maaf, kami tidak memiliki izin untuk mengakses lokasi ponsel anda!
            </Text>
            <Button
              type="Primary"
              size="Sm"
              title="Berikan izin"
              onPress={async () => Linking.openSettings()}
            />
          </View>
        );
      } else {
        return (
          <>
            {this.state.storeLoading && <Loader visible />}
            <ScrollView style={{ backgroundColor: 'white' }}>
              <View style={styles.container}>
                {/* Bukti Foto */}
                <View style={{ gap: 10, paddingBottom: 20 }}>
                  <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: scale(14) }}>
                    Bukti Foto
                  </Text>
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
                  {this.state.photos.length == 0 && this.state.errorMessage?.photos ? (
                    <Error title={this.state.errorMessage?.photos} />
                  ) : null}
                </View>

                {/* Judul */}
                <View>
                  <Input
                    onChangeText={(text) => this.setState({ title: text })}
                    maxLength={70}
                    title="Judul"
                    type="Text"
                    placeholder="Tambahkan judul laporan"
                    error={this.state.errorMessage?.title}
                    onFocus={() => this.handleError('', 'title')}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: scale(11.5),
                      color: Colors.GRAY,
                      marginTop: 5,
                      alignSelf: 'flex-end',
                    }}>
                    {this.state.title?.length || 0} /70 karakter
                  </Text>
                </View>

                {/* Lokasi GPS */}
                <View>
                  <Input
                    icon={<LiveLocation />}
                    multiline={true}
                    editable={false}
                    textAlign="left"
                    color={Colors.GRAY}
                    value={this.state.GPSaddress}
                    title="Lokasi GPS"
                    type="Text"
                    placeholder="Lokasi ditambahkan otomatis"
                  />
                  {!this.state.locationReady && (
                    <Button
                      type="Text"
                      size="Md"
                      title="Dapatkan Lokasi"
                      onPress={() => this.getLocation()}
                    />
                  )}
                  {!this.state.locationReady && this.state.errorMessage?.GPSaddress ? (
                    <Error title={this.state.errorMessage?.GPSaddress} />
                  ) : null}
                </View>

                {/* Detail Lokasi */}
                <View>
                  <Input
                    maxLength={200}
                    onChangeText={(text) => this.setState({ detail_location: text })}
                    icon={<Notes color={Colors.TEXT} />}
                    title="Detail Lokasi"
                    type="Text"
                    placeholder="Tambahkan Detail Lokasi"
                    error={this.state.errorMessage?.detail_location}
                    onFocus={() => this.handleError('', 'detail_location')}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: scale(11.5),
                      color: Colors.GRAY,
                      marginTop: 5,
                      alignSelf: 'flex-end',
                    }}>
                    {this.state.detail_location?.length || 0} /600 karakter
                  </Text>
                </View>

                {/* Deskripsi */}
                <View>
                  <Input
                    onChangeText={(text) => this.setState({ description: text })}
                    maxLength={1200}
                    multiline
                    textAlign="left"
                    title="Deskripsi"
                    type="Text"
                    style={{
                      height: 'auto',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      textAlignVertical: this.state.description ? 'top' : 'center',
                    }}
                    placeholder="Tambahkan deskripsi"
                    error={this.state.errorMessage?.description}
                    onFocus={() => this.handleError('', 'description')}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: scale(11.5),
                      color: Colors.GRAY,
                      marginTop: 5,
                      alignSelf: 'flex-end',
                    }}>
                    {this.state.description?.length || 0} /1200 karakter
                  </Text>
                </View>

                {/* Kategori */}
                <View>
                  <InputLabel title="Kategori" />
                  <DropDownPicker
                    loading={this.state.categoryLoading}
                    searchable={true}
                    searchContainerStyle={{
                      borderColor: Colors.LINE_STROKE,
                    }}
                    searchTextInputStyle={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: scale(11.5),
                      color: Colors.TEXT,
                      borderColor: Colors.LINE_STROKE,
                    }}
                    searchPlaceholderTextColor={Colors.GRAY}
                    modalContentContainerStyle={{
                      backgroundColor: 'white',
                    }}
                    listItemContainerStyle={{
                      paddingHorizontal: 20,
                      height: 'auto',
                    }}
                    listItemLabelStyle={{
                      padding: 20,
                      fontFamily: 'Poppins-Medium',
                      fontSize: scale(11.5),
                      color: Colors.TEXT,
                    }}
                    selectedItemLabelStyle={{
                      backgroundColor: Colors.LIGHT_GRAY,
                    }}
                    listMode="MODAL"
                    modalProps={{
                      animationType: 'slide',
                    }}
                    ArrowDownIconComponent={({ style }) => <ChevronDown style={style} />}
                    modalTitle="Pilih Kategori"
                    placeholder="Pilih Kategori"
                    style={{
                      borderWidth: 0,
                      backgroundColor: Colors.LIGHT_GRAY,
                      paddingHorizontal: moderateScale(18),
                      paddingVertical: moderateScale(18),
                      borderRadius: 14,
                    }}
                    textStyle={{
                      color: Colors.TEXT,
                      fontFamily: 'Poppins-Medium',
                      fontSize: scale(11.5),
                    }}
                    CloseIconComponent={({ style }) => <Close style={style} />}
                    open={this.state.categoryOpen}
                    value={this.state.categoryId}
                    items={this.state.categories}
                    setOpen={(open) =>
                      this.setState({
                        categoryOpen: open,
                      })
                    }
                    setValue={(callback) =>
                      this.setState((prevState) => ({
                        categoryId: callback(prevState),
                      }))
                    }
                    setItems={(callback) => this.setState((items) => ({ categories: items }))}
                  />
                  {!this.state.categoryId && this.state.errorMessage?.category ? (
                    <Error title={this.state.errorMessage?.category} />
                  ) : null}
                </View>

                {/* Urgensi */}
                <View>
                  <InputLabel title="Urgensi" />
                  <DropDownPicker
                    loading={this.state.priorityLoading}
                    listMode="SCROLLVIEW"
                    ArrowDownIconComponent={({ style }) => <ChevronDown style={style} />}
                    placeholder="Pilih Urgensi"
                    style={{
                      borderWidth: 0,
                      backgroundColor: Colors.LIGHT_GRAY,
                      paddingHorizontal: moderateScale(18),
                      paddingVertical: moderateScale(18),
                      borderRadius: 14,
                    }}
                    dropDownContainerStyle={{
                      borderColor: Colors.LIGHT_GRAY,
                    }}
                    textStyle={{
                      color: Colors.TEXT,
                      fontFamily: 'Poppins-Medium',
                      fontSize: scale(11.5),
                    }}
                    CloseIconComponent={({ style }) => <Close style={style} />}
                    open={this.state.priorityOpen}
                    value={this.state.priorityId}
                    items={this.state.priorities}
                    setOpen={(open) =>
                      this.setState({
                        priorityOpen: open,
                      })
                    }
                    setValue={(callback) =>
                      this.setState((prevState) => ({
                        priorityId: callback(prevState),
                      }))
                    }
                    setItems={(callback) => this.setState((items) => ({ priorities: items }))}
                  />
                  {!this.state.priorityId && this.state.errorMessage?.priority ? (
                    <Error title={this.state.errorMessage?.priority} />
                  ) : null}
                </View>
                <Button
                  type="Primary"
                  size="Lg"
                  title="Kirim Laporan"
                  onPress={() => this.validate()}
                />
              </View>
            </ScrollView>
          </>
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
