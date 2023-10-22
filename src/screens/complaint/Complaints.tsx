import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { Filter, Search, Sort } from '@/constants/icons';

const Complaints = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ gap: verticalScale(10) }}>
        <View
          style={{
            maxWidth: '100%',
            backgroundColor: 'white',
            borderColor: Colors.LINE_STROKE,
            borderWidth: 1,
            borderRadius: 14,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: scale(20),
          }}>
          <Search />
          <TextInput
            allowFontScaling={false}
            placeholder="Ketik untuk mencari laporan"
            style={{
              padding: moderateScale(18),
              flex: 1,
              fontFamily: 'Poppins-Medium',
              fontSize: scale(12.5),
              color: Colors.GRAY,
            }}
          />
        </View>
        {/* <Modal animationType="fade" visible={true} style={{ maxHeight: '30%' }}>
          <Text>dfdffd</Text>
        </Modal> */}
        <View style={{ flexDirection: 'row', gap: scale(10) }}>
          <TouchableOpacity
            style={{
              padding: moderateScale(10),
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.LINE_STROKE,
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
            }}>
            <Filter />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: scale(11.5),
                textAlignVertical: 'center',
                verticalAlign: 'middle',
              }}>
              Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: moderateScale(10),
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.LINE_STROKE,
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
            }}>
            <Sort />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: scale(11.5),
                textAlignVertical: 'center',
                verticalAlign: 'middle',
              }}>
              Urutkan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>Complaints</Text>
    </ScrollView>
  );
};

export default Complaints;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(32),
  },
});
