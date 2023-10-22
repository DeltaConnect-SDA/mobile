import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ComplaintPhotos, ProgressStep } from '@/components';
import { Colors } from '@/constants/colors';
import { Button, Input } from '@/components/atom';
import { scale, verticalScale } from 'react-native-size-matters';
import { publicAPI } from 'Api/backend';
import { useAuth } from '@/context/AuthProvider';
import { Cancel, SaveFilled } from '@/constants/icons';
import SaveOutline from 'assets/icons/SaveOutline.svg';
import { saveComplaint, unSaveComplaint } from '@/services';
import { Status } from '@/constants/status';
import { Rating } from '@kolking/react-native-rating';
import UserAvatar from '@muhzi/react-native-user-avatar';
import { StackActions } from '@react-navigation/native';

const SaveButton = ({ navigation, saved, handleSave }) => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => handleSave(saved)}>
        {saved ? <SaveFilled /> : <SaveOutline />}
      </TouchableOpacity>
    ),
  });
};

const ComplaintDetail = ({ route, navigation }) => {
  const { complaintId } = route.params;
  const [readMore, setReadMore] = useState<Boolean>(false);
  const [complaint, setComplaint] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [saved, setSaved] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState(null);
  const [ratingError, setRatingError] = useState(null);
  const { authState } = useAuth();

  const handleData = async () => {
    if (authState.authenticated) {
      try {
        const complaint = await publicAPI.get(`v1/complaints/${complaintId}/auth`, {
          headers: { Authorization: `Bearer ${authState.token}` },
        });

        const { data } = complaint.data;
        console.log(data);

        setComplaint(data);
        setIsLoading(false);

        if (data.ComplaintSaved.length !== 0) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      } catch (err) {
        setIsLoading(false);

        if (err.response?.status === 404) {
          navigation.goBack();
        }
        console.error(err?.response || err, 'catch fetch');
      }
    } else {
      try {
        const complaint = await publicAPI.get(`v1/complaints/${complaintId}`);
        setIsLoading(false);
        const { data } = complaint.data;
        setComplaint(data);
      } catch (err) {
        setIsLoading(false);

        if (err.response?.status === 404) {
          navigation.goBack();
        }
        console.error(err?.response || err, 'catch fetch');
      }
    }
  };

  const handleSave = async (prevSaved) => {
    if (authState.authenticated) {
      setSaved(!saved);
      if (saved) {
        setSaved(false);
        try {
          await unSaveComplaint(complaint.id);
        } catch (err) {
          console.error(err.response, 'catch save');

          setSaved(true);
        }
      } else {
        try {
          await saveComplaint(complaint.id);
        } catch (err) {
          console.error(err.response, 'catch save');
          setSaved(false);
        }
      }
    } else {
      navigation.navigate('Onboarding');
    }
  };

  const handleChangeRating = useCallback((value: number) => setRating(Math.round(value)), [rating]);

  const validateRating = () => {
    let valid = true;

    if (isLoading) {
      valid = false;
    }

    if (rating === 0) {
      valid = false;
    }

    if (!ratingText) {
      valid = false;
      setRatingError('Mohon berikan penilaian dahulu!');
    } else if (ratingText.length < 8) {
      valid = false;
      setRatingError('Penilaian minimal 8 karakter!');
    }

    if (valid) {
      handleRateComplaint();
    }
  };

  const handleCancelComplaint = async () => {
    if (authState.authenticated) {
      setIsLoading(true);
      try {
        await publicAPI.patch(
          `v1/complaints/${complaintId}/cancel`,
          {},
          {
            headers: { Authorization: `Bearer ${authState.token}` },
          }
        );

        navigation.navigate('Riwayat');
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        if (err.response?.status === 404) {
          navigation.goBack();
        }
        console.error(err?.response || err, 'catch fetch');
      }
    }
  };

  const handleRateComplaint = async () => {
    setIsLoading(true);
    try {
      const response = await publicAPI.post(
        `v1/complaints/${complaintId}/rating`,
        {
          rate: rating,
          rateText: ratingText,
        },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      );
      setIsLoading(false);
      navigation.dispatch(
        StackActions.replace('ComplaintDetail', {
          complaintId,
        })
      );
    } catch (err) {
      console.log(err.response);
      setIsLoading(false);
    }
    console.log('rating : ', rating, 'text : ', ratingText);
  };

  const onTextLayout = useCallback((e) => {
    setNumberOfLines(e.nativeEvent?.lines.length);
  }, []);

  useLayoutEffect(() => {
    SaveButton({ navigation, saved, handleSave });
  }, [navigation, saved, complaint]);

  useEffect(() => {
    handleData();
  }, [complaintId]);

  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleData} />}>
      {isLoading && !complaint?.status ? (
        <ActivityIndicator style={{ marginTop: 100 }} size={'large'} color={Colors.PRIMARY_GREEN} />
      ) : (
        <>
          <ComplaintPhotos photos={complaint.ComplaintImages || []} />
          <View style={styles().container}>
            {/* Title Section */}
            <View style={styles().titleSection}>
              <View
                style={[
                  styles(complaint?.status?.color).statusContainer,
                  { borderRadius: complaint?.status?.title && 8 },
                ]}>
                <Text style={styles(complaint?.status?.color).status}>
                  {complaint?.status?.title}
                </Text>
              </View>
              <Text numberOfLines={3} style={styles().title}>
                {complaint?.title}
              </Text>
            </View>

            {/* Detail Section */}
            <View style={styles().detailsSection}>
              <Text style={styles().heading}>Detail Laporan</Text>
              <View style={styles().detailContent}>
                {/* Kategori */}
                <View style={styles().row}>
                  <View style={styles().cell}>
                    <Text
                      style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                      Kategori
                    </Text>
                  </View>
                  <View style={styles().cellValue}>
                    <View style={styles().categoryContainer}>
                      <Text style={styles().category}>{complaint.category?.title}</Text>
                    </View>
                  </View>
                </View>

                {/* Tanggal */}
                <View style={styles().row}>
                  <View style={styles().cell}>
                    <Text
                      style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                      Tanggal
                    </Text>
                  </View>
                  <View style={styles().cellValue}>
                    <View>
                      <Text style={styles().detailValueText}>
                        {new Date(complaint?.createdAt).toLocaleDateString('id')}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Nomor referensi */}
                <View style={styles().row}>
                  <View style={styles().cell}>
                    <Text
                      style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                      Nomor
                    </Text>
                  </View>
                  <View style={styles().cellValue}>
                    <View>
                      <Text style={styles().detailValueText}>{complaint?.ref_id}</Text>
                    </View>
                  </View>
                </View>

                {/* Skala prioritas */}
                <View style={styles().row}>
                  <View style={styles().cell}>
                    <Text
                      style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                      Skala Prioritas
                    </Text>
                  </View>
                  <View style={styles().cellValue}>
                    <View
                      style={[
                        styles(complaint.priority?.color).priorityContainer,
                        { borderRadius: complaint.priority?.title && 8 },
                      ]}>
                      <Text style={styles(complaint.priority?.color).priority}>
                        {complaint.priority?.title}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Lokasi */}
                <View style={styles().row}>
                  <View style={styles().cell}>
                    <Text
                      style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                      Lokasi
                    </Text>
                  </View>
                  <View style={styles().cellValue}>
                    <View>
                      <Text style={styles().detailValueText}>{complaint?.GPSaddress}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Description Section */}
            <View style={styles().descriptionSection}>
              <Text style={styles().heading}>Deskripsi Laporan</Text>
              <View>
                <Text
                  onTextLayout={onTextLayout}
                  numberOfLines={!readMore ? 3 : undefined}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: scale(12.5),
                    lineHeight: scale(20),
                    color: Colors.TEXT,
                  }}>
                  {complaint?.description}
                </Text>
                {numberOfLines >= 3 && (
                  <Button
                    onPress={() => setReadMore(!readMore)}
                    type="Text"
                    size="Md"
                    style={{ marginTop: 5 }}
                    title={!readMore ? 'Baca selengkapnya' : 'Lebih sedikit'}
                  />
                )}
              </View>
            </View>

            {/* Status Section */}
            <View style={styles().descriptionSection}>
              <Text style={styles().heading}>Status Laporan</Text>
              <View style={{ gap: 48, marginTop: 18 }}>
                <ProgressStep status={complaint?.status?.title} />
                <Button
                  type="Outline"
                  size="Md"
                  title="Lihat Detail Status"
                  onPress={() => navigation.navigate('Beranda')}
                />
              </View>
            </View>

            {/* Action Section */}
            {complaint?.user?.id === authState.userId && authState.authenticated ? (
              complaint?.status?.id !== Status.CANCELED &&
              complaint?.status?.id !== Status.COMPLETE ? (
                <View style={styles().descriptionSection}>
                  <Text style={styles().heading}>Aksi</Text>
                  <View style={{ gap: 48, marginTop: 18 }}>
                    <Button
                      color={Colors.PRIMARY_RED}
                      backgroundColor={Colors.PRIMARY_RED}
                      type="Primary"
                      size="Md"
                      title="Batalkan Laporan"
                      onPress={() => handleCancelComplaint()}
                    />
                  </View>
                </View>
              ) : null
            ) : null}

            {complaint?.user?.id === authState.userId &&
            complaint?.status?.id === Status.COMPLETE &&
            complaint?.ComplaintFeedBack.length === 0 ? (
              <View style={styles().descriptionSection}>
                <Text style={styles().heading}>Berikan Penilaian</Text>
                <View style={{ gap: 48, marginTop: 18, alignItems: 'center' }}>
                  <Rating
                    fillColor={Colors.PRIMARY_YELLOW}
                    baseColor={Colors.LINE_STROKE}
                    size={40}
                    rating={rating}
                    onChange={handleChangeRating}
                  />
                </View>
                <Input
                  onChangeText={(text) => setRatingText(text)}
                  title=""
                  maxLength={300}
                  multiline
                  textAlign="left"
                  type="Text"
                  style={{
                    height: 'auto',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    textAlignVertical: ratingText ? 'top' : 'center',
                  }}
                  placeholder="Masukkan penilaian mu.."
                  onFocus={() => setRatingError(null)}
                  error={ratingError}
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: scale(11.5),
                    color: Colors.GRAY,
                    marginTop: 5,
                    alignSelf: 'flex-end',
                  }}>
                  {ratingText?.length || 0} /300 karakter
                </Text>
                <Button
                  onPress={() => validateRating()}
                  type={isLoading ? 'Disabled' : 'Primary'}
                  title="Kirim Penilaian"
                  size="Lg"
                  style={{ marginTop: verticalScale(16) }}
                />
              </View>
            ) : complaint?.status?.id === Status.COMPLETE ? (
              <View style={[styles().descriptionSection, { borderBottomWidth: 0 }]}>
                <Text style={styles().heading}>Penilaian Pelapor</Text>
                <View
                  style={{
                    marginTop: 18,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 10,
                  }}>
                  <UserAvatar
                    userName={
                      !isLoading
                        ? complaint?.user?.firstName + ' ' + complaint?.user?.LastName
                        : 'Guest'
                    }
                    size={48}
                    fontSize={18}
                    backgroundColor={Colors.PRIMARY_GREEN}
                  />
                  <View style={{ alignItems: 'flex-start', flex: 1, flexWrap: 'wrap' }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold' }}>
                      {complaint?.user?.firstName + ' ' + complaint?.user?.LastName}
                    </Text>
                    <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                      <Rating
                        fillColor={Colors.PRIMARY_YELLOW}
                        baseColor={Colors.LINE_STROKE}
                        size={20}
                        rating={complaint?.ComplaintFeedBack[0]?.feedackScore}
                        disabled
                      />
                      <Text style={{ fontFamily: 'Poppins-medium' }}>
                        (
                        {(
                          Math.round(complaint?.ComplaintFeedBack[0]?.feedackScore * 100) / 100
                        ).toFixed(1)}
                        )
                      </Text>
                    </View>
                    <Text style={{ marginTop: 20 }}>
                      {complaint?.ComplaintFeedBack[0]?.feedbackNote}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </>
      )}
    </ScrollView>
  );
};
export default ComplaintDetail;

const styles = (props?: any) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      paddingVertical: 20,
    },
    heading: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: scale(14),
      color: Colors.TEXT,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    cell: {
      display: 'flex',
      paddingVertical: 8,
      alignItems: 'flex-start',
      flex: 1,
      flexWrap: 'wrap',
      borderColor: Colors.LINE_STROKE,
      borderTopWidth: 1,
    },
    cellValue: {
      display: 'flex',
      paddingVertical: 8,
      alignItems: 'flex-start',
      flex: 2,
      borderColor: Colors.LINE_STROKE,
      borderTopWidth: 1,
    },
    titleSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 5,
      borderColor: Colors.LINE_STROKE,
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    statusContainer: {
      paddingBottom: 2,
      paddingTop: 3,
      paddingHorizontal: 9,
      borderRadius: 8,
      backgroundColor: Colors[`SECONDARY_${props}`],
    },
    status: {
      fontFamily: 'Poppins-Medium',
      fontSize: scale(10.5),
      color: Colors[`PRIMARY_${props}`],
    },
    categoryContainer: {
      paddingBottom: 2,
      paddingTop: 3,
      paddingHorizontal: 9,
      backgroundColor: Colors.BACKGROUND,
      borderRadius: 8,
    },
    category: {
      fontFamily: 'Poppins-Medium',
      fontSize: scale(10.5),
      color: Colors.GRAY,
    },
    title: {
      fontFamily: 'Poppins-Medium',
      fontSize: scale(16),
    },
    detailsSection: {
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'flex-start',
      gap: 5,
      borderColor: Colors.LINE_STROKE,
      borderBottomWidth: 1,
      padding: 20,
      paddingBottom: 40,
    },
    detailContent: {
      marginTop: 18,
    },
    detailValueText: {
      fontFamily: 'Poppins-Medium',
      fontSize: scale(12.5),
      color: Colors.TEXT,
    },
    priorityContainer: {
      paddingBottom: 2,
      paddingTop: 3,
      paddingHorizontal: 9,
      borderRadius: 8,
      backgroundColor: Colors[`SECONDARY_${props}`],
    },
    priority: {
      fontFamily: 'Poppins-Medium',
      fontSize: scale(10.5),
      color: Colors[`PRIMARY_${props}`],
    },
    descriptionSection: {
      gap: 5,
      borderColor: Colors.LINE_STROKE,
      borderBottomWidth: 1,
      padding: 20,
      paddingBottom: 40,
    },
  });
