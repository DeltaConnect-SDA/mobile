import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/colors';
import { Cancel, Done, Process, Waiting } from '@/constants/icons';
import { scale } from 'react-native-size-matters';

const { width: screenWidth } = Dimensions.get('window');

type ProgressStepProps = {
  status: string;
};

const ProgressStep = (props: ProgressStepProps) => {
  const [status, setStatus] = useState<String>(props.status);
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

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
              fontSize: scale(11.5),
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
              status == 'Proses' ||
              status == 'Verifikasi' ||
              status == 'Selesai' ||
              status == 'Dibatalkan'
                ? Colors.SECONDARY_GREEN
                : Colors.LINE_STROKE,
          }}
        />
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                status === 'Proses' ||
                status == 'Verifikasi' ||
                status === 'Selesai' ||
                status == 'Dibatalkan'
                  ? Colors.SECONDARY_GREEN
                  : Colors.LINE_STROKE,
            },
          ]}>
          <Process
            color={
              status === 'Proses' ||
              status == 'Verifikasi' ||
              status === 'Selesai' ||
              status == 'Dibatalkan'
                ? Colors.PRIMARY_GREEN
                : Colors.GRAY
            }
          />
          <Text
            style={{
              position: 'absolute',
              width: 100,
              bottom: -25,
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              fontSize: scale(11.5),
              color:
                status === 'Proses' ||
                status == 'Verifikasi' ||
                status === 'Selesai' ||
                status == 'Dibatalkan'
                  ? Colors.PRIMARY_GREEN
                  : Colors.GRAY,
            }}>
            Proses
          </Text>
        </View>
        <View
          style={{
            width: screenWidth / 3.8,
            height: 5,
            backgroundColor:
              status === 'Selesai'
                ? Colors.SECONDARY_GREEN
                : status === 'Dibatalkan'
                ? Colors.SECONDARY_RED
                : Colors.LINE_STROKE,
          }}
        />
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                status === 'Selesai'
                  ? Colors.SECONDARY_GREEN
                  : status === 'Dibatalkan'
                  ? Colors.SECONDARY_RED
                  : Colors.LINE_STROKE,
            },
          ]}>
          {status === 'Dibatalkan' ? (
            <Cancel color={Colors.PRIMARY_RED} />
          ) : (
            <Done color={status === 'Selesai' ? Colors.PRIMARY_GREEN : Colors.GRAY} />
          )}
          <Text
            style={{
              position: 'absolute',
              width: 100,
              bottom: -25,
              textAlign: 'center',
              fontFamily: 'Poppins-Medium',
              fontSize: scale(11.5),
              color:
                status === 'Selesai'
                  ? Colors.PRIMARY_GREEN
                  : status === 'Dibatalkan'
                  ? Colors.PRIMARY_RED
                  : Colors.GRAY,
            }}>
            {status === 'Dibatalkan' ? 'Dibatalkan' : 'Selesai'}
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
