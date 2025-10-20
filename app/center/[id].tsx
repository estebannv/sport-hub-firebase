import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';

// --- DATOS DE EJEMPLO ACTUALIZADOS ---
const MOCK_CENTERS_DATA = {
  '1': {
    id: '1',
    name: 'Super Padel Center',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80',
    location: 'Calle de los Deportes, 123',
    cost: '$$$',
    hours: '08:00 - 22:00',
    rating: 4.9,
    arrivalTime: '15 min',
    // Estructura de deportes actualizada
    sports: [
      {
        id: 'sport_1',
        name: 'Fútbol',
        variants: [
          { id: 'var_1a', type: 'Fútbol 5', details: 'Cancha sintética para 10 jugadores' },
          { id: 'var_1b', type: 'Fútbol 7', details: 'Cancha de pasto para 14 jugadores' },
          { id: 'var_1c', type: 'Fútbol 11', details: 'Estadio reglamentario' },
        ],
      },
      {
        id: 'sport_2',
        name: 'Pádel',
        variants: [
          { id: 'var_2a', type: 'Cancha Standard', details: 'Para 4 jugadores' },
        ],
      },
    ],
  },
  // Aquí se podrían añadir los datos para los otros IDs (2, 3, 4, etc.)
};

const CenterDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const center = MOCK_CENTERS_DATA[id as keyof typeof MOCK_CENTERS_DATA];

  if (!center) {
    return (
      <View style={styles.container}><Text>Centro no encontrado.</Text></View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen options={{ title: center.name, headerShown: false }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Image source={{ uri: center.image }} style={styles.headerImage} />

        <View style={styles.container}>
          <Text style={styles.centerName}>{center.name}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.rating}>⭐️ {center.rating}</Text>
            <Text style={styles.arrivalTime}>• 🕒 {center.arrivalTime}</Text>
            <TouchableOpacity style={styles.favoriteButton}>
                <Text style={styles.favoriteText}>♡ Agregar a favoritos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsSection}>
            <Text style={styles.detailText}>📍 {center.location}</Text>
            <Text style={styles.detailText}>⏰ {center.hours}</Text>
            <Text style={styles.detailText}>💸 Costo: {center.cost}</Text>
          </View>

          {/* Lógica de renderizado actualizada para las variantes */}
          {center.sports.map(sport => (
            <View key={sport.id}>
              <Text style={styles.sportsHeader}>{sport.name}</Text>
              {sport.variants.map(variant => (
                <View key={variant.id} style={styles.sportCard}>
                  <View>
                    <Text style={styles.sportName}>{variant.type}</Text>
                    <Text style={styles.sportDetails}>{variant.details}</Text>
                  </View>
                  <TouchableOpacity style={styles.selectButton}>
                      <Text style={styles.selectButtonText}>Seleccionar</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.reserveButton}>
        <Text style={styles.reserveButtonText}>Reservar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  centerName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    color: '#555',
  },
  arrivalTime: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  favoriteButton: {
    marginLeft: 'auto',
    borderColor: '#FFC107',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  favoriteText: {
      color: '#FFC107',
      fontWeight: 'bold'
  },
  detailsSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  sportsHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 12,
  },
  sportCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sportName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sportDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  selectButton: {
      backgroundColor: '#E8F5E9',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
  },
  selectButtonText: {
      color: '#4CAF50',
      fontWeight: 'bold',
  },
  reserveButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CenterDetailScreen;
