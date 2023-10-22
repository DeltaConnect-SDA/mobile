import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ComplaintDetail,
  Complaints,
  Login,
  Onboarding,
  Register,
  RegisterPasswordStep,
  RegisterPhoneVerification,
  RegisterSendEmail,
} from '@/screens';
import { BottomTabNavigation } from '@/navigations';
import 'react-native-gesture-handler';
import SaveOutline from 'assets/icons/SaveOutline.svg';
import { Colors } from '@/constants/colors';
import TimeAgo from 'javascript-time-ago';
import id from 'javascript-time-ago/locale/id';
import Test from '@/components/test';
import SuccessState from '@/screens/SuccessState';
import AddComplaintDetails from '@/screens/complaint/AddComplaintDetails';
import Camera from '@/screens/complaint/Camera';
import { AuthProvider, useAuth } from '@/context/AuthProvider';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { SaveFilled } from '@/constants/icons';
import Saved from '@/screens/Saved';
import { scale } from 'react-native-size-matters';

TimeAgo.addDefaultLocale(id);

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.BACKGROUND,
  },
};

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync(); // prevent splash screen from auto-hiding

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    const loadApp = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      } // hide the splash screen after tasks are done
    };

    loadApp();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState } = useAuth();
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar translucent={false} backgroundColor="transparent" style="auto" />
      <Stack.Navigator initialRouteName="BottomNav">
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
        {!authState?.authenticated ? (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen
              name="RegisterPasswordStep"
              component={RegisterPasswordStep}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="RegisterSendEmail"
              component={RegisterSendEmail}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Success"
              component={SuccessState}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Camera"
              component={Camera}
              options={{
                headerStyle: { backgroundColor: '#000000' },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="AddComplaintDetails"
              component={AddComplaintDetails}
              options={{ title: 'Lapor Masalah', animation: 'slide_from_right' }}
            />
          </>
        )}
        <Stack.Screen
          name="ComplaintDetail"
          component={ComplaintDetail}
          options={{
            title: 'Detail Laporan',
            animation: 'simple_push',
          }}
        />
        <Stack.Screen
          name="LaporanMasyarakat"
          component={Complaints}
          options={{
            title: 'Laporan Masyarakat',
            animation: 'simple_push',
          }}
        />
        <Stack.Screen
          name="UsulanMasyarakat"
          component={Test}
          options={{
            title: 'Detail Laporan',
            animation: 'simple_push',
          }}
        />
        <Stack.Screen
          name="SemuaInformasi"
          component={Test}
          options={{
            title: 'Semua Informasi',
            animation: 'simple_push',
          }}
        />
        <Stack.Screen
          name="Disimpan"
          component={Saved}
          options={{
            title: 'Disimpan',
            animation: 'simple_push',
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: 'white',
              paddingHorizontal: scale(18),
              paddingVertical: scale(30),
            },
          }}
        />
        <Stack.Screen
          name="BottomNav"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterPhoneVerification"
          component={RegisterPhoneVerification}
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
