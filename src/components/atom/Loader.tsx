import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/colors';
import { scale, verticalScale } from 'react-native-size-matters';

const Loader = ({ visible = false }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, { height, width }]}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.PRIMARY_GREEN} />
          <Text style={{ marginRight: 10, fontFamily: 'Poppins-SemiBold', fontSize: scale(12.5) }}>
            Tunggu sebentar...
          </Text>
        </View>
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  loader: {
    height: verticalScale(70),
    backgroundColor: 'white',
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
});
