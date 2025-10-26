import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        // Esto oculta la pestaña "index" pero mantiene la ruta funcional para la redirección.
        name="index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Inicio',
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="torneo"
        options={{
          title: 'Torneos',
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="actividad"
        options={{
          title: 'Actividad',
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cuenta"
        options={{
          title: 'Cuenta',
          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
