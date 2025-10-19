import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as Location from 'expo-location';

const sportsCategories = [
  { id: '1', name: 'Fútbol' },
  { id: '2', name: 'Baloncesto' },
  { id: '3', name: 'Tenis' },
  { id: '4', name: 'Béisbol' },
  { id: '5', name: 'Golf' },
  { id: '6', name: 'Ciclismo' },
];

const featuredCenters = [
  { id: '1', name: 'Centro Deportivo A' },
  { id: '2', name: 'Centro Deportivo B' },
  { id: '3', name: 'Centro Deportivo C' },
  { id: '4', name: 'Centro Deportivo D' },
];

const nearbyCenters = [
  { id: '1', name: 'Gimnasio Cercano 1' },
  { id: '2', name: 'Parque Local' },
  { id: '3', name: 'Piscina Municipal' },
  { id: '4', name: 'Cancha de Tenis Vecina' },
];

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Obteniendo ubicación...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  const renderCategory = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCenter = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity style={styles.centerItem}>
      <Text style={styles.centerItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Hola, [Nombre de Usuario]</Text>
        <Text style={styles.locationText}>{text}</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
      />
      <Text style={styles.title}>Categorías de Deportes</Text>
      <FlatList
        data={sportsCategories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.title}>Centros Deportivos Destacados</Text>
      <FlatList
        data={featuredCenters}
        renderItem={renderCenter}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.title}>Cerca de tu ubicación</Text>
      <FlatList
        data={nearbyCenters}
        renderItem={renderCenter}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    color: 'gray',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    margin: 10,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: '#f0f0f0',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  categoryItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerItem: {
    backgroundColor: '#e0e0e0',
    width: 200,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  centerItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
