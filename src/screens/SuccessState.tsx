import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '@/components/atom';
import { Success } from '@/constants/illustrations';
import { Colors } from '@/constants/colors';
import { scale } from 'react-native-size-matters';

const SuccessState = ({ route, navigation }) => {
  const { title, description, toRoute, cta } = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Success width="100%" />
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.textBody}>{description}</Text>
        <Button onPress={() => navigation.navigate(toRoute)} type="Primary" size="Lg" title={cta} />
      </View>
    </ScrollView>
  );
};

export default SuccessState;

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    color: Colors.TEXT,
    fontFamily: 'Poppins-Bold',
    fontSize: scale(21),
    textAlign: 'center',
  },
  textBody: {
    color: Colors.GRAY,
    fontFamily: 'Poppins-Regular',
    fontSize: scale(13.5),
    marginBottom: 32,
    textAlign: 'center',
  },
});
