
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Location from 'expo-location';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/home/Card';
import { CategoryCarousel } from '../../components/home/CategoryCarousel';
import { SectionHeader } from '../../components/home/SectionHeader';
import { GlobalStyle } from '../../constants/theme';

const Hr = () => (
  <View
    style={{
      height: 1,
      backgroundColor: '#e0e0e0',
      width: '100%',
      marginVertical: 12,
    }}
  />
);

const sportsCategories = [
  { id: '1', name: 'Fútbol', icon: '⚽' },
  { id: '2', name: 'Basket', icon: '🏀' },
  { id: '3', name: 'Tenis', icon: '🎾' },
  { id: '4', name: 'Pádel', icon: '🏸' },
  { id: '5', name: 'Gym', icon: '🏋️' },
  { id: '6', name: 'Boxeo', icon: '🥊' },
  { id: '7', name: 'Fútbol', icon: '⚽' },
  { id: '8', name: 'Basket', icon: '🏀' },
  { id: '9', name: 'Tenis', icon: '🎾' },
  { id: '10', name: 'Pádel', icon: '🏸' },
  { id: '11', name: 'Gym', icon: '🏋️' },
  { id: '12', name: 'Boxeo', icon: '🥊' },
];

const featuredCenters = [
  { id: '1', name: 'Super Padel Center', rating: 4.9, reviews: 500, deliveryTime: 15, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
  { id: '2', name: 'Gimnasio Rock Solid', rating: 4.7, reviews: 230, deliveryTime: 20, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
];

const HomeScreen = () => {

  const [address, setAddress] = useState('Buscando ubicación...');

  const GetCurrentPosition = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setAddress('Permiso de ubicación denegado');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync(location.coords);

      if (geocode && geocode.length > 0) {
        const { city } = geocode[0];
        setAddress(`${city}`);
      } else {
        setAddress('Dirección no encontrada');
      }
    } catch (error) {
      setAddress('No se pudo obtener la ubicación');
    }
  }

  useEffect(() => {
    GetCurrentPosition();
  }, []);

  return (

    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Text style={styles.locationText} numberOfLines={1}>{address}</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity>
            <Ionicons name="notifications" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Link href="/search" asChild>
        <TouchableOpacity style={styles.searchBarContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchBarPlaceholder}>Buscar canchas, centros deportivos...</Text>
        </TouchableOpacity>
      </Link>

      <FlatList
        data={sportsCategories}
        renderItem={({ item }) => <CategoryCarousel item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <SectionHeader title="Destacados en tu zona" />
      <FlatList
        data={featuredCenters}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredCenters}
      />

      <Hr />

      <SectionHeader title="Destacados en tu zona" />
      <FlatList
        data={featuredCenters}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredCenters}
      />

    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //General
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 5
  },
  //General
  //Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: GlobalStyle.PaddingHorizontal,
  },
  locationText: {
    fontSize: GlobalStyle.LabelFontSize,
    fontWeight: 'bold',
  },
  topIcon: {
    fontSize: 24,
  },
  //Top bar
  //Search bar
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 15,
    marginHorizontal: GlobalStyle.PaddingHorizontal,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchBarPlaceholder: {
    fontSize: GlobalStyle.LabelFontSize,
    color: '#8e8e93',
  },
  //Search bar
  //Categories list
  featuredCenters: {
    marginLeft: GlobalStyle.PaddingHorizontal,
  },
  //Categories list
});

export default HomeScreen;
