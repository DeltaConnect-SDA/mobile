import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ComplaintDetail, Login, Onboarding } from '@/screens';
import { BottomTabNavigation } from '@/navigations';
import 'react-native-gesture-handler';
import { Colors } from '@/constants/colors';
import TimeAgo from 'javascript-time-ago';
import id from 'javascript-time-ago/locale/id';

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
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="BottomNav">
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="ComplaintDetail"
          component={ComplaintDetail}
          options={{
            title: 'Detail Laporan',
            animation: 'simple_push',
          }}
        />
        <Stack.Screen
          name="BottomNav"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
