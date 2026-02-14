import { CategoriesProvider } from '@/contexts/CategoriesContext';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <CategoriesProvider>
        <StatusBar style="auto" />
        <Slot />
      </CategoriesProvider>
    </ThemeProvider>
  );
}
