import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { authAPI } from 'Api/backend';
import { useAuth } from '@/context/AuthProvider';
import { Skeleton } from 'moti/skeleton';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import UserAvatar from '@muhzi/react-native-user-avatar';
import { Colors } from '@/constants/colors';
import { Logout, Password, UserEdit, Verified } from '@/constants/icons';

const Profile = () => {
  const { authState, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const fetchProfile = async () => {
    authAPI
      .get('profile', { headers: { Authorization: `Bearer ${authState.token}` } })
      .then((res) => {
        setLoading(false);
        const result = res.data;
        setData(result);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userBasicContainer}>
          <Skeleton colorMode="light" show={loading} radius="round">
            <UserAvatar
              userName={!loading ? data?.firstName + ' ' + data?.lastName : 'Guest'}
              size={scale(58)}
              fontSize={18}
              // src="https://pub-de80d0c9acec4ada87a412796cb5a13f.r2.dev/profile/7d75dbdcfca17e31cd16b5b3adda06611dec175347ca553da64c52960daa5325.jpg"
              backgroundColor={Colors.PRIMARY_GREEN}
              active
            />
          </Skeleton>
          <View style={styles.userNameContainer}>
            <Skeleton colorMode="light" show={loading} radius="round">
              <Text style={styles.userName}>
                {loading ? '' : data?.firstName + ' ' + data?.LastName}
              </Text>
            </Skeleton>
            <Skeleton colorMode="light" show={loading} radius="round">
              <TouchableOpacity
                style={styles.badge}
                onPress={
                  !loading && data?.UserDetail.isVerified
                    ? () => console.log('sudah')
                    : () => console.log('Verifikasi')
                }>
                <Text style={styles.badgeText}>
                  {loading
                    ? ''
                    : data?.UserDetail.isVerified
                    ? 'Sudah Verifikasi'
                    : 'Verifikasi Sekarang'}
                </Text>
                <Verified
                  color={
                    !loading && data?.UserDetail.isVerified
                      ? Colors.PRIMARY_GREEN
                      : Colors.PRIMARY_RED
                  }
                />
              </TouchableOpacity>
            </Skeleton>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <UserEdit />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.menuItem}>
        <Password />
        <Text style={[styles.menuText, { color: Colors.TEXT }]}>Ubah Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          Alert.alert(
            'Konfirmasi Logout', // judul
            'Apakah Anda yakin ingin logout?', // pesan
            [
              {
                text: 'Batal',
                onPress: () => console.log('Logout dibatalkan'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: async () => logout(),
              },
            ]
          );
        }}>
        <Logout />
        <Text style={[styles.menuText, { color: Colors.PRIMARY_RED }]}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(30),
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(18),
    marginBottom: moderateScale(30),
  },
  userBasicContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  userNameContainer: {
    display: 'flex',
    gap: verticalScale(5),
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userName: {
    color: Colors.TEXT,
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(13.5),
    textAlignVertical: 'center',
  },
  badge: {
    flexDirection: 'row',
    borderColor: Colors.LINE_STROKE,
    borderWidth: 1,
    gap: scale(8),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(5),
    borderRadius: 10,
    backgroundColor: 'white',
  },
  badgeText: {
    color: Colors.TEXT,
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(11),
    textAlignVertical: 'center',
  },
  editBtn: {
    padding: moderateScale(9),
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.LINE_STROKE,
    borderWidth: 1,
  },
  menuItem: {
    backgroundColor: 'white',
    marginBottom: scale(10),
    padding: moderateScale(18),
    display: 'flex',
    flexDirection: 'row',
    gap: scale(10),
    borderColor: Colors.LINE_STROKE,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: scale(13.5),
    textAlignVertical: 'center',
  },
});
