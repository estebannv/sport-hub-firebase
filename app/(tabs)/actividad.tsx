import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- DATOS DE EJEMPLO MEJORADOS ---
// Añadimos un estado ('upcoming' o 'past') y una URL de imagen para un diseño más rico.
const reservationsData = [
  {
    id: '1',
    centerName: 'Centro Deportivo A',
    location: 'Calle Falsa 123, Ciudad',
    date: '28 de Julio, 2024',
    time: '18:00',
    price: '$15.00',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=500&q=80',
  },
  {
    id: '2',
    centerName: 'Gimnasio Moderno',
    location: 'Avenida Siempre Viva 742',
    date: '29 de Julio, 2024',
    time: '09:00',
    price: '$25.00',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80',
  },
  {
    id: '3',
    centerName: 'Piscina Municipal',
    location: 'Boulevard de los Sueños Rotos',
    date: '15 de Junio, 2024',
    time: '15:30',
    price: '$10.00',
    status: 'past',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=500&q=80',
  },
];

// --- COMPONENTE PARA LA TARJETA DE RESERVACIÓN ---
const ReservationCard = ({ item }: { item: any }) => (
  <Link href={{ pathname: `/reservations/${item.id}`, params: { ...item } }} asChild>
    <TouchableOpacity style={styles.reservationCard}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardInfo}>
            <Text style={styles.cardCenterName}>{item.centerName}</Text>
            <Text style={styles.cardDate}>{item.date} a las {item.time}</Text>
            <Text style={styles.cardLocation}>{item.location}</Text>
            <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>{item.price}</Text>
                <Text style={styles.cardDetailsLink}>Ver detalles</Text>
            </View>
        </View>
    </TouchableOpacity>
  </Link>
);

// --- PANTALLA PRINCIPAL DE ACTIVIDAD ---
const ActivityScreen = () => {
  const [currentView, setCurrentView] = useState('upcoming'); // 'upcoming' o 'past'

  const filteredData = reservationsData.filter(item => item.status === currentView);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Actividad</Text>
        
        {/* 1. Filtro de Próximas / Anteriores */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, currentView === 'upcoming' && styles.filterButtonActive]}
            onPress={() => setCurrentView('upcoming')}
          >
            <Text style={[styles.filterText, currentView === 'upcoming' && styles.filterTextActive]}>Próximas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, currentView === 'past' && styles.filterButtonActive]}
            onPress={() => setCurrentView('past')}
          >
            <Text style={[styles.filterText, currentView === 'past' && styles.filterTextActive]}>Anteriores</Text>
          </TouchableOpacity>
        </View>

        {/* 2. Lista de Reservaciones */}
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <ReservationCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
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
  // Estilos del filtro
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    marginHorizontal: 40,
    marginBottom: 20,
    overflow: 'hidden',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  filterTextActive: {
    color: 'white',
  },
  // Estilos de la lista
  listContainer: {
    paddingHorizontal: 16,
  },
  // Estilos de la tarjeta de reservación
  reservationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden', // Para que la imagen respete los bordes
  },
  cardImage: {
      width: '100%',
      height: 120,
  },
  cardInfo: {
      padding: 16,
  },
  cardCenterName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDate: {
      fontSize: 14,
      color: '#333',
      marginBottom: 4,
  },
  cardLocation: {
      fontSize: 14,
      color: '#666',
      marginBottom: 12,
  },
  cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
      paddingTop: 12,
      marginTop: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardDetailsLink: {
      fontSize: 14,
      fontWeight: '600',
      color: '#007AFF',
  }
});

export default ActivityScreen;
