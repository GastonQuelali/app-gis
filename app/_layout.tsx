import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

import { useTheme, ThemeContextProvider } from '@/hooks/use-theme';

function AppContent() {
  const { theme, isDark } = useTheme();

  return (
    <NavThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1, backgroundColor: theme.background.primary }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: 'Login' }} />
          <Stack.Screen name="password" options={{ title: 'Password' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </View>
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Medium': Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
}
