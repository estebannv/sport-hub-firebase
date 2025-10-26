import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// --- PANTALLA PRINCIPAL DE ACTIVIDAD ---
const ActivityScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Torneos</Text>
        
      </View>
    </SafeAreaView>
  );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default ActivityScreen;
