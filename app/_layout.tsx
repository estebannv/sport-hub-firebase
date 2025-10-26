import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerBackTitle: 'Atrás',
        }}>

        <Stack.Screen 
          name="reservations" 
          options={{ 
            presentation: 'modal',
            headerShown: false, 
          }} 
        />
        
        <Stack.Screen 
          name="search" 
          options={{ 
            presentation: 'modal',
            headerShown: false, 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
