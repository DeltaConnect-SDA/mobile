import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import UserAvatar from '@muhzi/react-native-user-avatar';
import { Colors } from '@/constants/colors';
import { AlertFilled, Verified } from '@/constants/icons';
import { Carousel, InfoFeed, MainMenu, SuggestionFeed } from '@/components';
import ReportFeed from '@/components/Home/Feed/ReportFeed';
import { scale, moderateScale } from 'react-native-size-matters';
import { useAuth } from '@/context/AuthProvider';
import { authAPI, publicAPI } from 'Api/backend';
import { Skeleton } from 'moti/skeleton';
import { Button } from '@/components/atom';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type HomeProps = {};

type HomeState = {
  complaintCount: number;
  refreshing: boolean;
};

export const TopBar = ({ refreshing }) => {
  const { authState } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const getUserProfile = async () => {
    authAPI
      .get('profile', {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        const result = res.data;
        const { firstName, lastName, UserDetail } = result;
        setData({ firstName, lastName, UserDetail });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    if (authState.token) {
      getUserProfile();
    } else setLoading(false);
  }, [authState.token]);

  useEffect(() => {
    if (refreshing && authState.token) {
      getUserProfile();
    }
  }, [refreshing, authState.token]);

  if (authState?.authenticated) {
    return (
      <View style={styles.topBarContainer}>
        <View style={styles.topBarProfile}>
          <Skeleton colorMode="light" show={loading} radius="round">
            <UserAvatar
              userName={!loading ? data?.firstName + ' ' + data?.LastName : 'Guest'}
              size={48}
              fontSize={18}
              // src="https://pub-de80d0c9acec4ada87a412796cb5a13f.r2.dev/profile/7d75dbdcfca17e31cd16b5b3adda06611dec175347ca553da64c52960daa5325.jpg"
              backgroundColor={Colors.PRIMARY_GREEN}
              active
            />
          </Skeleton>
          <View style={styles.topBarText}>
            <Skeleton colorMode="light" show={loading}>
              <Text style={styles.topBarGreetings}>Selamat datang,</Text>
            </Skeleton>
            {loading && <View style={{ paddingVertical: 5 }} />}
            <Skeleton colorMode="light" show={loading}>
              <Text style={styles.topBarUsername}>{!loading ? data?.firstName : ''}!</Text>
            </Skeleton>
          </View>
        </View>
        {data?.UserDetail?.isVerified ? (
          <Skeleton colorMode="light" show={loading}>
            <View style={styles.verifiedBadge}>
              <Verified color={Colors.PRIMARY_GREEN} />
            </View>
          </Skeleton>
        ) : (
          <Skeleton colorMode="light" show={loading}>
            <View style={[styles.verifiedBadge, { backgroundColor: Colors.SECONDARY_RED }]}>
              <Verified color={Colors.PRIMARY_RED} />
            </View>
          </Skeleton>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.topBarContainer}>
        <View style={styles.topBarProfile}>
          <Skeleton colorMode="light" show={loading} radius="round">
            <UserAvatar
              userName="Tamu"
              size={48}
              fontSize={18}
              backgroundColor={Colors.PRIMARY_GREEN}
              active
            />
          </Skeleton>
          <View style={styles.topBarText}>
            <Skeleton colorMode="light" show={loading}>
              <Text style={styles.topBarGreetings}>Selamat datang,</Text>
            </Skeleton>
            {loading && <View style={{ paddingVertical: 5 }} />}
            <Skeleton colorMode="light" show={loading}>
              <Text style={styles.topBarUsername}>Tamu!</Text>
            </Skeleton>
          </View>
        </View>
        <Button
          type="Secondary"
          size="Sm"
          title="Masuk"
          onPress={() => navigation.navigate('Onboarding')}
        />
      </View>
    );
  }
};
export class Home extends Component<HomeProps, HomeState> {
  constructor(props) {
    super(props);
    this.state = { complaintCount: 0, refreshing: false };
  }

  async __handleComplaintCount() {
    try {
      const response = await publicAPI.get('complaints/count/day');
      const { data, success } = response.data;
      if (success) {
        this.setState({ complaintCount: data, refreshing: false });
      }
    } catch (error) {
      console.error(error.request, 'handle-complaint-count');
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.__handleComplaintCount();
  };

  componentDidMount(): void {
    this.__handleComplaintCount();
  }
  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
        }>
        {/* Top Bar */}
        <TopBar refreshing={this.state.refreshing} />

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
                allowFontScaling={false}
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: Colors.GRAY,
                  fontSize: scale(11),
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
                allowFontScaling={false}
                style={{
                  color: Colors.PRIMARY_ORANGE,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: scale(11),
                  lineHeight: 21,
                }}>
                {this.state.complaintCount} Laporan
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
          <ReportFeed refreshing={this.state.refreshing} />
          <SuggestionFeed refreshing={this.state.refreshing}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
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
    paddingBottom: moderateScale(50),
  },
});

export default Home;
