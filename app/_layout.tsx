import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          // 1. Mostrar un encabezado en todas las pantallas por defecto.
          headerShown: true,
          // 2. Poner "Atrás" como texto del botón de retroceso en iOS.
          headerBackTitle: 'Atrás',
        }}>
        {/* 3. Ocultar el encabezado explícitamente solo para la pantalla de pestañas.*/}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* 4. Configurar el grupo de pantallas de "reservations" como un modal.*/}
        <Stack.Screen 
          name="reservations" 
          options={{ 
            presentation: 'modal',
            // El encabezado de este modal será gestionado por su propio layout.
            headerShown: false, 
          }} 
        />
        
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
