import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useRef, useState } from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  ComplaintDetail,
  ComplaintStatus,
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
import { Colors } from '@/constants/colors';
import TimeAgo from 'javascript-time-ago';
import id from 'javascript-time-ago/locale/id';
import Test from '@/components/test';
import SuccessState from '@/screens/SuccessState';
import AddComplaintDetails from '@/screens/complaint/AddComplaintDetails';
import Camera from '@/screens/complaint/Camera';
import { AuthProvider, getToken, useAuth } from '@/context/AuthProvider';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { Platform } from 'react-native';
import Saved from '@/screens/Saved';
import { scale } from 'react-native-size-matters';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { authAPI } from 'Api/backend';
import * as SecureStore from 'expo-secure-store';
import { NotificationProvider } from '@/context/NotificationProvider';

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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
      <NotificationProvider>
        <PushNotification />
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
            name="ComplaintStatus"
            component={ComplaintStatus}
            options={{
              title: 'Status Laporan',
              animation: 'simple_push',
              headerShadowVisible: false,
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
      </NotificationProvider>
    </NavigationContainer>
  );
};

function PushNotification() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { authState } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<any>(false);

  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync(navigation).then(async (token) => {
      if (authState.authenticated && token != (await SecureStore.getItemAsync('deviceToken'))) {
        console.log('store');
        await authAPI.post('/device', {
          userId: authState.userId,
          DeviceToken: token,
          DeviceType: Platform.OS,
        });
      }
      console.log('same');
      await SecureStore.setItemAsync('deviceToken', token);
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        const {
          notification: {
            request: {
              content: {
                data: { type, id, route },
              },
            },
          },
        } = response;

        // When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
        if (type) {
          if (type === 'complaint') {
            navigation.navigate(route, { complaintId: id });
          }
        }
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <></>;
}

async function registerForPushNotificationsAsync(navigation) {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log('existingStatus', existingStatus);
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      console.log('finalStatus', finalStatus);
      return;
    }

    // Project ID can be found in app.json | app.config.js; extra > eas > projectId
    // token = (await Notifications.getExpoPushTokenAsync({ projectId: "YOUR_PROJECT_ID" })).data;
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: '5f0d2680-2056-4bde-b0e8-bbbdb09c310b',
      })
    ).data;
    // (await Notifications.getExpoPushTokenAsync()).data;

    // The token should be sent to the server so that it can be used to send push notifications to the device
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      showBadge: true,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 100, 250],
      lightColor: '#219653',
    });
  }

  return token;
}
