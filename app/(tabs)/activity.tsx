import { GlobalStyle } from '@/constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const reservationsData = [
  {
    id: '1',
    centerName: 'Centro Deportivo A',
    location: 'Calle Falsa 123, Ciudad',
    date: '28 de Julio, 2024',
    time: '6:00 pm',
    price: '$15,000',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=500&q=80',
  },
  {
    id: '2',
    centerName: 'Gimnasio Moderno',
    location: 'Avenida Siempre Viva 742',
    date: '29 de Julio, 2024',
    time: '09:00 am',
    price: '$5,000',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80',
  },
  {
    id: '3',
    centerName: 'Piscina Municipal',
    location: 'Boulevard de los Sueños Rotos',
    date: '15 de Junio, 2024',
    time: '2:30 pm',
    price: '$10,000',
    status: 'past',
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=500&q=80',
  },
];

const ReservationCard = ({ item }: { item: any }) => (
  <View>
    <Link href={{ pathname: `/reservations/${item.id}`, params: { ...item } }} asChild>
      <TouchableOpacity>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>⚽</Text>
          <View>
            <Text style={styles.cardTitle}>{item.centerName}</Text>
            <Text style={styles.cardDetail}>{item.date} • {item.time}</Text>
            <Text style={styles.cardDetail}>{item.location}</Text>
            <Text style={styles.cardDetail}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
    <View style={styles.hr}></View>
  </View>

);

const ActivityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Actividad</Text>
        <FontAwesome name="filter" size={24} color="black" />
      </View>

      <FlatList
        data={reservationsData}
        renderItem={({ item }) => <ReservationCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
  //General
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: GlobalStyle.PaddingHorizontal,
  },
  hr: {
    height: 1,
    backgroundColor: '#e2e2e2ff',
    marginVertical: 15,
  },
  //General
  //Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  topBarTitle: {
    fontSize: GlobalStyle.TitleFontSize,
    fontWeight: 'bold',
  },
  //Top Bar
  //Card
  cardHeader: {
    flexDirection: 'row',
    gap: 25,
  },
  cardIcon: {
    fontSize: 35,
    alignSelf: 'center',
    backgroundColor: '#ecececff',
    padding: 15,
    borderRadius: GlobalStyle.BorderRadius
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDetail: {
    color: '#333',
    marginBottom: 4,
  },
  //Card
});

export default ActivityScreen;
