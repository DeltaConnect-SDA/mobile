import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import React, { useState } from 'react';
import SnapCarousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const ENTRIES1 = [
  {
    illustration: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/ads/ads1.jpg',
    index: 3,
  },
  {
    illustration: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/ads/ads2.jpg',
    index: 2,
  },
  {
    illustration: 'https://r2.deltaconnect.yukebrillianth.my.id/assets/ads/ads3.jpg',
    index: 1,
  },
];

const renderItem: any = ({ item, index }, parallaxProps) => {
  return (
    <View
      style={{
        width: screenWidth - 40,
        aspectRatio: 1.82 / 1,
      }}>
      <ParallaxImage
        source={{ uri: item.illustration }}
        containerStyle={{
          flex: 1,
          marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
          backgroundColor: 'white',
          borderRadius: 8,
        }}
        style={{
          ...StyleSheet.absoluteFillObject,
          resizeMode: 'contain',
        }}
        dimensions={{
          width: screenWidth - 40,
        }}
        parallaxFactor={0.1}
        {...parallaxProps}
      />
    </View>
  );
};

export function CarouselPagination({ activeSlide }) {
  return (
    <Pagination
      containerStyle={{ position: 'absolute', bottom: 0, marginHorizontal: 'auto' }}
      dotsLength={ENTRIES1.length}
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
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
}

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <SnapCarousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 40}
        data={ENTRIES1}
        renderItem={renderItem}
        hasParallaxImages={true}
        loop={true}
        loopClonesPerSide={2}
        containerCustomStyle={{ gap: 0 }}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={3000}
        fadingEdgeLength={10}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <CarouselPagination activeSlide={activeSlide} />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
