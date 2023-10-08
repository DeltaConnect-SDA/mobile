import { StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { Image } from 'expo-image';

const { width: screenWidth } = Dimensions.get('window');

type ComplaintPhoto = {
  url: string;
  blurHash: string;
};

type ComplaintPhotosProps = {
  photos: ComplaintPhoto[];
};

const renderItem = ({ item }) => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{ aspectRatio: 3 / 4, height: screenWidth }}
        contentFit="cover"
        source={{
          uri: item.url,
          headers: { Accept: 'image/*' },
        }}
        placeholder={item.blurHash}
      />
    </View>
  );
};

const ComplaintPhotos = ({ photos }: ComplaintPhotosProps) => {
  return (
    <View>
      <Carousel
        layout="default"
        data={photos}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        sliderHeight={screenWidth}
        bounces={false}
        bouncesZoom={false}
        zoomScale={0}
        autoplay={false}
      />
    </View>
  );
};

export default ComplaintPhotos;

const styles = StyleSheet.create({});
