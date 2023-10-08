import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/colors';
import { Done, Process, Waiting } from '@/constants/icons';

const { width: screenWidth } = Dimensions.get('window');

type ProgressStepProps = {
  status: string;
};

const ProgressStep = (props: ProgressStepProps) => {
  const [status, setStatus] = useState<String>(props.status);

  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.iconContainer, { backgroundColor: Colors.SECONDARY_GREEN }]}>
          <Waiting color={Colors.PRIMARY_GREEN} />
          <Text
            style={{
              position: 'absolute',
              width: 100,
              bottom: -25,
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              fontSize: 13,
              color: Colors.PRIMARY_GREEN,
            }}>
            Menunggu
          </Text>
        </View>
        <View
          style={{
            width: screenWidth / 3.8,
            height: 5,
            backgroundColor:
              status == 'Proses' || status == 'Selesai'
                ? Colors.SECONDARY_GREEN
                : Colors.LINE_STROKE,
          }}
        />
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                status === 'Proses' || status === 'Selesai'
                  ? Colors.SECONDARY_GREEN
                  : Colors.LINE_STROKE,
            },
          ]}>
          <Process
            color={status === 'Proses' || status === 'Selesai' ? Colors.PRIMARY_GREEN : Colors.GRAY}
          />
          <Text
            style={{
              position: 'absolute',
              width: 100,
              bottom: -25,
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              fontSize: 13,
              color:
                status === 'Proses' || status === 'Selesai' ? Colors.PRIMARY_GREEN : Colors.GRAY,
            }}>
            Proses
          </Text>
        </View>
        <View
          style={{
            width: screenWidth / 3.8,
            height: 5,
            backgroundColor: status === 'Selesai' ? Colors.SECONDARY_GREEN : Colors.LINE_STROKE,
          }}
        />
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: status === 'Selesai' ? Colors.SECONDARY_GREEN : Colors.LINE_STROKE },
          ]}>
          <Done color={status === 'Selesai' ? Colors.PRIMARY_GREEN : Colors.GRAY} />
          <Text
            style={{
              position: 'absolute',
              width: 100,
              bottom: -25,
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              fontSize: 13,
              color: status === 'Selesai' ? Colors.PRIMARY_GREEN : Colors.GRAY,
            }}>
            Selesai
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressStep;

const styles = StyleSheet.create({
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 28,
  },
});
