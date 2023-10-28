import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AnimatedGallery from '@akumzy/react-native-animated-gallery';
import { Loader } from '@/components';

const StatusGallery = ({ route }) => {
  const { images } = route.params;
  console.log(images);
  const imageUrls = images.map((item) => {
    return {
      ...item,
      url: item.path,
      path: undefined,
    };
  });
  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <AnimatedGallery
        imageUrls={imageUrls}
        renderLoader={<Loader />}
        disablefullScreen={false}
        thumbBorderWidth={3}
        thumbBorderColor={'white'}
        spacing={8}
        imageSize={90}
        backgroundColor={'#0000'}
        onEndReached={() => {
          console.log('yay! end reached');
        }}
        invertThumbDirection={false}
        invertGalleryDirection={false}
      />
    </View>
  );
};

export default StatusGallery;

const styles = StyleSheet.create({});
