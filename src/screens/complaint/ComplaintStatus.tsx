import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { Cancel, Done, Notes, Process, Verification, Waiting } from '@/constants/icons';
import { Image } from 'expo-image';
import { publicAPI } from 'Api/backend';

const ComplaintStatus = ({ route, navigation }) => {
  const { complaintId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const getIcon = (label, index) => {
    const isLastStep = index === 0;
    const color = isLastStep ? Colors.PRIMARY_GREEN : Colors.GRAY;

    switch (label) {
      case 'Menunggu':
        return <Waiting color={color} />;
      case 'Diverifikasi':
        return <Verification color={color} />;
      case 'Diteruskan':
        return <Process color={color} />;
      case 'Diproses':
        return <Process color={color} />;
      case 'Selesai':
        return <Done color={color} />;
      case 'Dibatalkan':
        return <Cancel color={isLastStep ? Colors.PRIMARY_RED : Colors.GRAY} />;
      default:
        return null;
    }
  };

  const handleData = async () => {
    try {
      const res = await publicAPI.get(`complaints/${complaintId}/status`);
      const { data } = res.data;
      console.log(data);

      setData(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleData} />}
      contentContainerStyle={{ paddingBottom: 100 }}
      style={{
        paddingHorizontal: scale(20),
        paddingVertical: 32,
        backgroundColor: 'white',
      }}
      data={data}
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
                <Text style={{ color: 'white' }}>{getIcon(item.title, index)}</Text>
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
                {item.title}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: scale(12),
                  color: Colors.TEXT,
                }}>
                {item.descripiton}
              </Text>
              {item.images.length !== 0 && (
                <View>
                  <Image
                    key={item.images[0].path}
                    source={{ uri: item.images[0].path }}
                    placeholder={item.images[0].placeholder}
                    style={{
                      width: scale(72),
                      aspectRatio: 1 / 1,
                      borderRadius: 8,
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => navigation.navigate('StatusGallery', { images: item.images })}
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: item.images.length > 1 && 'rgba(0,0,0,0.5)',
                      width: scale(72),
                      aspectRatio: 1 / 1,
                      borderRadius: 8,
                    }}>
                    {item.images.length > 1 && (
                      <Text
                        style={{
                          position: 'absolute',
                          fontFamily: 'Poppins-Medium',
                          color: 'white',
                          fontSize: scale(18),
                          right: '35%',
                          bottom: '30%',
                        }}>
                        +{item.images.length - 1}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: scale(11),
                  color: Colors.GRAY,
                }}>
                {new Date(item.createdAt).toLocaleString('id-ID', {
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
