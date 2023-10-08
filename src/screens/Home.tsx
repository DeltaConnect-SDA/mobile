import {
  Text,
  View,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { Component } from 'react';
import UserAvatar from '@muhzi/react-native-user-avatar';
import { Colors } from '@/constants/colors';
import { AlertFilled, Verified } from '@/constants/icons';
import { Carousel, InfoFeed, MainMenu } from '@/components';
import ReportFeed from '@/components/Home/ReportFeed';

type HomeProps = {};

type HomeState = {};

export class Home extends Component<HomeProps> {
  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBarContainer}>
          <View style={styles.topBarProfile}>
            <UserAvatar
              userName="Namira Nuril Almas"
              size={48}
              src="https://pub-de80d0c9acec4ada87a412796cb5a13f.r2.dev/profile/7d75dbdcfca17e31cd16b5b3adda06611dec175347ca553da64c52960daa5325.jpg"
              backgroundColor={Colors.PRIMARY_GREEN}
              active
            />
            <View style={styles.topBarText}>
              <Text style={styles.topBarGreetings}>Selamat datang,</Text>
              <Text style={styles.topBarUsername}>Namira!</Text>
            </View>
          </View>
          <View style={styles.verifiedBadge}>
            <Verified />
          </View>
        </View>

        {/* User report count card */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={styles.userReportCountCard}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <AlertFilled />
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: Colors.GRAY,
                  fontSize: 13,
                }}>
                {Dimensions.get('window').width > 360
                  ? 'Jumlah Laporan Hari Ini'
                  : 'Laporan Hari Ini'}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 6,
                borderColor: Colors.PRIMARY_ORANGE,
                borderWidth: 1,
                borderRadius: 6,
                backgroundColor: Colors.SECONDARY_ORANGE,
              }}>
              <Text
                style={{
                  color: Colors.PRIMARY_ORANGE,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 13,
                  lineHeight: 21,
                }}>
                38 Laporan
              </Text>
            </View>
          </View>
        </View>
        {/* Carousel */}
        <Carousel />

        {/* Main menu */}
        <MainMenu />
        {/* Feed section */}
        <View style={styles.feedSection}>
          {/* Info feed */}
          <InfoFeed />
          <ReportFeed />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    backgroundColor: 'white',
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 26,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  topBarProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarText: {
    marginLeft: 10,
    gap: -5,
  },
  topBarGreetings: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.GRAY,
  },
  topBarUsername: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.TEXT,
  },
  verifiedBadge: {
    backgroundColor: Colors.SECONDARY_GREEN,
    padding: 10,
    borderRadius: 12,
  },
  userReportCountCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: Colors.LINE_STROKE,
    borderRadius: 12,
  },
  feedSection: {
    backgroundColor: Colors.BACKGROUND,
    paddingBottom: 80,
  },
});

export default Home;
