import { GlobalStyle } from '@/constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReservationCard } from '../../components/activity/ReservationCard';

const reservationsData = [
  {
    id: '1',
    centerName: 'Centro Deportivo A',
    location: 'Calle Falsa 123, Ciudad',
    date: '28 de Julio, 2024',
    time: '6:00 pm',
    price: '$15,000',
    status: 'upcoming',
    category: 'Basketball'
  },
  {
    id: '2',
    centerName: 'Gimnasio Moderno',
    location: 'Avenida Siempre Viva 742',
    date: '29 de Julio, 2024',
    time: '09:00 am',
    price: '$5,000',
    status: 'upcoming',
    category: 'Futbol'
  },
];

const ActivityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Actividad</Text>
        <FontAwesome name="filter" size={24} color="black" />
      </View>

      <FlatList
        data={reservationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReservationCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: GlobalStyle.PaddingHorizontal,
    backgroundColor: 'white',
    paddingTop: 10,
  },
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
});

export default ActivityScreen;
