import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { Informasi, Laporan, Saved, Usulan } from '@/constants/icons';
import { Colors } from '@/constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

export const menu = [
  {
    title: 'Laporan\nMasyarakat',
    icon: 'Laporan',
    color: 'SECONDARY_ORANGE',
    route: 'Onboarding',
  },
  {
    title: 'Usulan\nMasyarakat',
    icon: 'Usulan',
    color: 'SECONDARY_GREEN',
    route: 'Onboarding',
  },
  {
    title: 'Semua\nInformasi',
    icon: 'Informasi',
    color: 'SECONDARY_PURPLE',
    route: 'Onboarding',
  },
  {
    title: 'Disimpan',
    icon: 'Saved',
    color: 'SECONDARY_TOSCA',
    route: 'Onboarding',
  },
];

const IconComponent = ({ icon }) => {
  switch (icon) {
    case 'Laporan':
      return <Laporan width={32} height={32} />;
    case 'Usulan':
      return <Usulan width={32} height={32} />;
    case 'Informasi':
      return <Informasi width={32} height={32} />;
    case 'Saved':
      return <Saved width={32} height={32} />;
    default:
      return <Laporan width={32} height={32} />;
  }
};

type MenuItemProps = {
  title: string;
  icon: string;
  color: string;
  route: string;
};

export const MenuItem: React.FC<MenuItemProps> = ({ title, icon, color, route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route)}
      style={{
        display: 'flex',
        gap: 5,
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View
        style={{
          padding: 16,
          backgroundColor: Colors[color],
          borderRadius: 16,
        }}>
        <IconComponent icon={icon} />
      </View>
      <View>
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: scale(11),
            textAlign: 'center',
            color: Colors.GRAY,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MainMenu = () => {
  return (
    <View style={styles.container}>
      {menu.map((item, index) => (
        <MenuItem
          title={item.title}
          icon={item.icon}
          color={item.color}
          key={index}
          route={item.route}
        />
      ))}
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 16,
    width: width,
    maxWidth: '100%',
  },
});
