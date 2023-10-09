import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
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
  const [activeSlide, setActiveSlide] = useState<number>(0);
  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        containerStyle={{ position: 'absolute', bottom: 0, marginHorizontal: 'auto' }}
        dotsLength={photos.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: -4,
          backgroundColor: 'white',
        }}
        inactiveDotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
        }}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.9}
      />
    </View>
  );
};

export default ComplaintPhotos;

const styles = StyleSheet.create({});
