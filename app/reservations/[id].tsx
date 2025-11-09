import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ReservationDetailsScreen = () => {

  const router = useRouter();

  const { centerName, location, time, price } = useLocalSearchParams();

  const HandlePreRegister = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Reservación</Text>
      <View style={styles.card}>
        <Text style={styles.centerName}>{centerName}</Text>
        <Text style={styles.detailText}>Ubicación: {location}</Text>
        <Text style={styles.detailText}>Hora: {time}</Text>
        <Text style={styles.priceText}>Precio: {price}</Text>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Ver Recibo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Calificar Servicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={HandlePreRegister}>
          <Text style={styles.actionButtonText}>login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  centerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 6,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#4CAF50',
    marginBottom: 20, // Espacio antes de los botones
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReservationDetailsScreen;
