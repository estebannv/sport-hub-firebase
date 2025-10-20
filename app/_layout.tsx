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
          headerShown: true,
          headerBackTitle: 'Atrás',
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        <Stack.Screen 
          name="reservations" 
          options={{ 
            presentation: 'modal',
            headerShown: false, 
          }} 
        />
        
        {/* Añadimos la nueva pantalla de búsqueda como un modal sin encabezado */}
        <Stack.Screen 
          name="search" 
          options={{ 
            // presentation: 'modal',
            headerShown: false, 
          }} 
        />
        
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
