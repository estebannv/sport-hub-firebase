import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

// Datos de ejemplo para las reservaciones
const reservationsData = [
  {
    id: '1',
    centerName: 'Centro Deportivo A',
    location: 'Calle Falsa 123, Ciudad',
    time: '2024-07-28 18:00',
    price: '$15.00',
  },
  {
    id: '2',
    centerName: 'Gimnasio Moderno',
    location: 'Avenida Siempre Viva 742',
    time: '2024-07-29 09:00',
    price: '$25.00',
  },
  {
    id: '3',
    centerName: 'Piscina Municipal',
    location: 'Boulevard de los Sueños Rotos',
    time: '2024-08-01 15:30',
    price: '$10.00',
  },
];

const ActivityScreen = () => {

  const renderReservation = ({ item }: { item: { id: string, centerName: string, location: string, time: string, price: string } }) => (
    <View style={styles.reservationCard}>
      <Text style={styles.centerName}>{item.centerName}</Text>
      <Text style={styles.detailText}>Ubicación: {item.location}</Text>
      <Text style={styles.detailText}>Hora: {item.time}</Text>
      <Text style={styles.priceText}>Precio: {item.price}</Text>
      <Link href={{ pathname: `/reservations/${item.id}`, params: { ...item } }} asChild>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Más detalles</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Reservaciones</Text>
      <FlatList
        data={reservationsData}
        renderItem={renderReservation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  reservationCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  centerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#4CAF50',
  },
  detailsButton: {
    marginTop: 12,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ActivityScreen;
