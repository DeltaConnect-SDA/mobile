import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ComplaintPhotos, ProgressStep } from '@/components';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/atom';
import { scale } from 'react-native-size-matters';

const data = [
  {
    id: 1,
    title: 'Mohon perbaiki saluran air depan SMAN 1 TAMAN',
    photos: [
      {
        url: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg',
        blurHash: 'LcKd_5t7xuRj~qazt7WUM|ayofay',
      },
      {
        url: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/1696769817201%20(1).jpg',
        blurHash: 'LcKd_5t7xuRj~qazt7WUM|ayofay',
      },
      {
        url: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report2.jpg',
        blurHash: 'LcKd_5t7xuRj~qazt7WUM|ayofay',
      },
    ],
    category: 'Drainase',
    burHash: 'LPEyPa~V-ps.RMxuofW=x[NFRjWB',
    time: '2023-10-08T11:24:09.319Z',
    refId: 'DC-LP-170923-00027',
    status: 'Menunggu',
    statusColor: 'ORANGE',
    place: 'Jemundo',
    detail_location:
      'Jl. Raya Sawunggaling No.2, Jemundo, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257',
    priority: {
      title: '!!! Tinggi',
      color: 'RED',
    },
    description:
      'Mohon dengan hormat untuk segera menindaklanjuti perbaikan saluran air di depan SMAN 1 TAMAN. Saat ini, saluran air tersebut terlihat tersumbat, menyebabkan genangan air di sekitarnya. Keadaan ini tidak hanya mengganggu, tetapi juga berpotensi menjadi masalah keselamatan bagi para siswa yang melintas dan warga sekitar.\n\nKami memahami betapa pentingnya lingkungan yang aman dan terjaga. Oleh karena itu, perbaikan segera diperlukan untuk mengatasi masalah ini. Bila dibiarkan, genangan air dapat menyebabkan berbagai masalah, termasuk risiko kecelakaan dan kerusakan lebih lanjut pada infrastruktur sekitar.\n\nKami berharap pihak terkait dapat segera melakukan inspeksi mendalam dan menanggapi permasalahan ini dengan segera. Kontribusi dan kerjasama Anda dalam menjaga keamanan dan kenyamanan lingkungan sangat dihargai. Terima kasih atas perhatian dan respons cepatnya dalam menangani laporan ini.',
  },
  {
    id: 2,
    title: 'Pohon tumbang di pasar wage menyebabkan kemacetan yang sangat parah',
    photos: [
      {
        url: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report2.jpg',
        blurHash: 'LcKd_5t7xuRj~qazt7WUM|ayofay',
      },
      {
        url: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report3.jpg',
        blurHash: 'LcKd_5t7xuRj~qazt7WUM|ayofay',
      },
    ],
    category: 'Pohon',
    burHash: 'LPEyPa~V-ps.RMxuofW=x[NFRjWB',
    time: '2023-10-08T11:24:09.319Z',
    refId: 'DC-LP-170923-00027',
    status: 'Dibatalkan',
    statusColor: 'TOSCA',
    activity: {},
    place: 'Jemundo',
    detail_location:
      'Jl. Raya Sawunggaling No.2, Jemundo, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257',
    priority: {
      title: '!!! Tinggi',
      color: 'RED',
    },
    description:
      'Mohon dengan hormat untuk segera menindaklanjuti perbaikan saluran air di depan SMAN 1 TAMAN. Saat ini, saluran air tersebut terlihat tersumbat, menyebabkan genangan air di sekitarnya. Keadaan ini tidak hanya mengganggu, tetapi juga berpotensi menjadi masalah keselamatan bagi para siswa yang melintas dan warga sekitar.\n\nKami memahami betapa pentingnya lingkungan yang aman dan terjaga. Oleh karena itu, perbaikan segera diperlukan untuk mengatasi masalah ini. Bila dibiarkan, genangan air dapat menyebabkan berbagai masalah, termasuk risiko kecelakaan dan kerusakan lebih lanjut pada infrastruktur sekitar.\n\nKami berharap pihak terkait dapat segera melakukan inspeksi mendalam dan menanggapi permasalahan ini dengan segera. Kontribusi dan kerjasama Anda dalam menjaga keamanan dan kenyamanan lingkungan sangat dihargai. Terima kasih atas perhatian dan respons cepatnya dalam menangani laporan ini.',
  },
  {
    id: 3,
    title: 'Lampu jalan di jalan raya kletek mati, sudah 1 minggu belum ada tindak lanjut.',
    photos: [
      {
        url: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/1696769817201%20(1).jpg',
        blurHash: 'LcKd_5t7xuRj~qazt7WUM|ayofay',
      },
      {
        url: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/1696769817201%20(1).jpg',
        blurHash: 'LcKd_5t7xuRj~qazt7WUM|ayofay',
      },
    ],
    category: 'Lampu',
    burHash: 'LPEyPa~V-ps.RMxuofW=x[NFRjWB',
    time: '2023-10-08T11:24:09.319Z',
    refId: 'DC-LP-170923-00027',
    status: 'Proses',
    statusColor: 'TOSCA',
    place: 'Jemundo',
    detail_location:
      'Jl. Raya Sawunggaling No.2, Jemundo, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257',
    priority: {
      title: '!!! Tinggi',
      color: 'RED',
    },
    description:
      'Mohon dengan hormat untuk segera menindaklanjuti perbaikan saluran air di depan SMAN 1 TAMAN. Saat ini, saluran air tersebut terlihat tersumbat, menyebabkan genangan air di sekitarnya. Keadaan ini tidak hanya mengganggu, tetapi juga berpotensi menjadi masalah keselamatan bagi para siswa yang melintas dan warga sekitar.\n\nKami memahami betapa pentingnya lingkungan yang aman dan terjaga. Oleh karena itu, perbaikan segera diperlukan untuk mengatasi masalah ini. Bila dibiarkan, genangan air dapat menyebabkan berbagai masalah, termasuk risiko kecelakaan dan kerusakan lebih lanjut pada infrastruktur sekitar.\n\nKami berharap pihak terkait dapat segera melakukan inspeksi mendalam dan menanggapi permasalahan ini dengan segera. Kontribusi dan kerjasama Anda dalam menjaga keamanan dan kenyamanan lingkungan sangat dihargai. Terima kasih atas perhatian dan respons cepatnya dalam menangani laporan ini.',
  },
];

const ComplaintDetail = ({ route, navigation }) => {
  const { complaintId, otherParam } = route.params;
  const [readMore, setReadMore] = useState<Boolean>(false);
  const [complaint, setComplaint] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setComplaint(data[complaintId - 1]);
      setIsLoading(false);
    };

    fetchData();
  }, [complaintId]);

  if (isLoading || !complaint) {
    return (
      <ActivityIndicator style={{ marginTop: 100 }} size={'large'} color={Colors.PRIMARY_GREEN} />
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <ComplaintPhotos photos={complaint.photos} />
        <View style={styles().container}>
          {/* Title Section */}
          <View style={styles().titleSection}>
            <View style={styles(complaint.statusColor).statusContainer}>
              <Text style={styles(complaint.statusColor).status}>{complaint.status}</Text>
            </View>
            <Text numberOfLines={3} style={styles().title}>
              {complaint.title}
            </Text>
          </View>

          {/* Detail Section */}
          <View style={styles().detailsSection}>
            <Text style={styles().heading}>Detail Laporan</Text>
            <View style={styles().detailContent}>
              {/* Kategori */}
              <View style={styles().row}>
                <View style={styles().cell}>
                  <Text style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                    Kategori
                  </Text>
                </View>
                <View style={styles().cellValue}>
                  <View style={styles().categoryContainer}>
                    <Text style={styles().category}>{complaint.category}</Text>
                  </View>
                </View>
              </View>

              {/* Tanggal */}
              <View style={styles().row}>
                <View style={styles().cell}>
                  <Text style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                    Tanggal
                  </Text>
                </View>
                <View style={styles().cellValue}>
                  <View>
                    <Text style={styles().detailValueText}>
                      {new Date(complaint.time).toLocaleDateString('id')}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Nomor referensi */}
              <View style={styles().row}>
                <View style={styles().cell}>
                  <Text style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                    Nomor
                  </Text>
                </View>
                <View style={styles().cellValue}>
                  <View>
                    <Text style={styles().detailValueText}>{complaint.refId}</Text>
                  </View>
                </View>
              </View>

              {/* Skala prioritas */}
              <View style={styles().row}>
                <View style={styles().cell}>
                  <Text style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                    Skala Prioritas
                  </Text>
                </View>
                <View style={styles().cellValue}>
                  <View style={styles(complaint.priority.color).priorityContainer}>
                    <Text style={styles(complaint.priority.color).priority}>
                      {complaint.priority.title}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Lokasi */}
              <View style={styles().row}>
                <View style={styles().cell}>
                  <Text style={{ color: Colors.GRAY, fontFamily: 'Poppins-Medium', fontSize: 13 }}>
                    Lokasi
                  </Text>
                </View>
                <View style={styles().cellValue}>
                  <View>
                    <Text style={styles().detailValueText}>{complaint.detail_location}</Text>
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
                numberOfLines={!readMore ? 5 : undefined}
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: scale(12.5),
                  lineHeight: scale(20),
                  color: Colors.TEXT,
                }}>
                {complaint.description}
              </Text>
              <Button
                onPress={() => setReadMore(!readMore)}
                type="Text"
                size="Md"
                style={{ marginTop: 5 }}
                title={!readMore ? 'Baca selengkapnya' : 'Lebih sedikit'}
              />
            </View>
          </View>

          {/* Status Section */}
          <View style={styles().descriptionSection}>
            <Text style={styles().heading}>Status Laporan</Text>
            <View style={{ gap: 48, marginTop: 18 }}>
              <ProgressStep status={complaint.status} />
              <Button
                type="Outline"
                size="Md"
                title="Lihat Detail Status"
                onPress={() => navigation.navigate('Beranda')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
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
