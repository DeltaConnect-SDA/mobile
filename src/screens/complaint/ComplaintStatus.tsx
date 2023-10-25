import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { Cancel, Done, Notes, Process, Verification, Waiting } from '@/constants/icons';
import { Image } from 'expo-image';

const data = [
  {
    id: 1,
    label: 'Menunggu',
    status: 'Laporan anda menunggu respon petugas',
    notes: null,
    images: [],
    date: '2023-10-15T09:47:49.429Z',
  },
  {
    id: 2,
    label: 'Diverifikasi',
    status: 'Laporan anda sedang diverifikasi oleh petugas',
    notes: 'Mohon ditunggu.',
    images: [],
    date: '2023-10-15T09:47:49.429Z',
  },
  {
    id: 3,
    label: 'Proses',
    status: 'Laporan diteruskan ke Dinas Pekerjaan Umum',
    notes: null,
    images: [],
    date: '2023-10-15T09:47:49.429Z',
  },
  {
    id: 4,
    label: 'Proses',
    status: 'Laporan sedang ditindaklanjuti oleh Dinas Pekerjaan Umum',
    notes: null,
    images: [
      {
        path: 'https://r2.deltaconnect.yukebrillianth.my.id/complaint/DC-LP-231015-00002_image0.jpg',
        placeholder: 'T,GlYRM{t7_4Rkofx]ogRjRjofRj',
      },
    ],
    date: '2023-10-15T09:47:49.429Z',
  },
  {
    id: 5,
    label: 'Dibatalkan',
    status: 'Laporan dibatalkan oleh Dinas Pekerjaan Umum',
    notes: 'Laporan dibatalkan karena saluran air telah diperbaiki.',
    images: [
      {
        path: 'https://r2.deltaconnect.yukebrillianth.my.id/complaint/DC-LP-231015-00002_image0.jpg',
        placeholder: 'T,GlYRM{t7_4Rkofx]ogRjRjofRj',
      },
    ],
    date: '2023-10-15T09:47:49.429Z',
  },
];

const ComplaintStatus = () => {
  const getIcon = (label, index) => {
    const isLastStep = index === 0;
    const color = isLastStep ? Colors.PRIMARY_GREEN : Colors.GRAY;

    switch (label) {
      case 'Menunggu':
        return <Waiting color={color} />;
      case 'Diverifikasi':
        return <Verification color={color} />;
      case 'Proses':
        return <Process color={color} />;
      case 'Selesai':
        return <Done color={color} />;
      case 'Dibatalkan':
        return <Cancel color={isLastStep ? Colors.PRIMARY_RED : Colors.GRAY} />;
      default:
        return null;
    }
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 100 }}
      style={{
        paddingHorizontal: scale(20),
        paddingVertical: 32,
        backgroundColor: 'white',
      }}
      data={data.reverse()}
      renderItem={({ item, index }) => {
        const isLastStep = index === 0;
        const color = isLastStep
          ? item.label === 'Dibatalkan'
            ? Colors.PRIMARY_RED
            : Colors.PRIMARY_GREEN
          : Colors.GRAY;
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginBottom: 32,
              minHeight: 50,
            }}>
            <View
              style={{
                alignItems: 'center',
                marginRight: 20,
                position: 'relative',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: 28,
                  aspectRatio: 1 / 1,
                  borderRadius: 30,
                  backgroundColor:
                    0 === index
                      ? item.label === 'Dibatalkan'
                        ? Colors.SECONDARY_RED
                        : Colors.SECONDARY_GREEN
                      : Colors.LIGHT_GRAY,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white' }}>{getIcon(item.label, index)}</Text>
              </View>
              {index < data.reverse().length - 1 && (
                <View
                  style={{
                    position: 'absolute',
                    width: 5,
                    height: '120%',
                    backgroundColor: Colors.LIGHT_GRAY,
                    zIndex: -1,
                    left: 11.5,
                    top: 19,
                  }}
                />
              )}
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: scale(13.5),
                  color,
                }}>
                {item.label}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: scale(12),
                  color: Colors.TEXT,
                }}>
                {item.status}
              </Text>
              {item.images.map((image) => (
                <Image
                  key={image.path}
                  source={{ uri: image.path }}
                  style={{ width: scale(72), aspectRatio: 1 / 1, borderRadius: 8 }}
                />
              ))}
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: scale(11),
                  color: Colors.GRAY,
                }}>
                {new Date(item.date).toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              {item.notes && (
                <View
                  style={{
                    paddingVertical: verticalScale(10),
                    borderColor: Colors.LINE_STROKE,
                    borderWidth: 1,
                    paddingHorizontal: scale(10),
                    borderRadius: 10,
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Notes color={Colors.GRAY} />
                  <Text style={{ color: Colors.GRAY, flex: 1, flexWrap: 'wrap' }}>
                    {item.notes}
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      }}
    />
  );
};

export default ComplaintStatus;

const styles = StyleSheet.create({});
