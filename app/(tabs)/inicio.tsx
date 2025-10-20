import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import * as Location from 'expo-location';

// --- DATOS DE EJEMPLO ---
const sportsCategories = [
  { id: '1', name: 'Fútbol', icon: '⚽' },
  { id: '2', name: 'Basket', icon: '🏀' },
  { id: '3', name: 'Tenis', icon: '🎾' },
  { id: '4', name: 'Pádel', icon: '🏸' },
  { id: '5', name: 'Gym', icon: '🏋️' },
  { id: '6', name: 'Boxeo', icon: '🥊' },
];

const featuredCenters = [
  { id: '1', name: 'Super Padel Center', rating: 4.9, reviews: 500, deliveryTime: 15, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
  { id: '2', name: 'Gimnasio Rock Solid', rating: 4.7, reviews: 230, deliveryTime: 20, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
];

const popularCenters = [
  { id: '3', name: 'Estadio de Fútbol Local', rating: 4.8, reviews: 800, deliveryTime: 30, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
  { id: '4', name: 'Club de Tenis Abierto', rating: 4.6, reviews: 150, deliveryTime: 25, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
];

// --- COMPONENTES DE LA PANTALLA ---
const CategoryItem = ({ item }: { item: { name: string, icon: string } }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={styles.categoryIconContainer}>
      <Text style={styles.categoryIcon}>{item.icon}</Text>
    </View>
    <Text style={styles.categoryName}>{item.name}</Text>
  </TouchableOpacity>
);

// MODIFICADO: CenterCard ahora es un enlace
const CenterCard = ({ item }: { item: { id: string, name: string, rating: number, reviews: number, deliveryTime: number, image: string } }) => (
  <Link href={`/center/${item.id}`} asChild>
    <TouchableOpacity style={styles.centerCard}>
      <Image source={{ uri: item.image }} style={styles.centerImage} />
      <View style={styles.centerInfo}>
        <Text style={styles.centerName}>{item.name}</Text>
        <Text style={styles.centerDetails}>⭐️ {item.rating} ({item.reviews}+) • {item.deliveryTime} min</Text>
      </View>
    </TouchableOpacity>
  </Link>
);

const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.sectionArrow}>→</Text>
    </TouchableOpacity>
  </View>
);

// --- PANTALLA PRINCIPAL ---
const HomeScreen = () => {
  const [address, setAddress] = useState('Buscando ubicación...');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddress('Permiso de ubicación denegado');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        let geocode = await Location.reverseGeocodeAsync(location.coords);
        
        if (geocode && geocode.length > 0) {
          const { street, city } = geocode[0];
          setAddress(`${street}, ${city}`);
        } else {
          setAddress('Dirección no encontrada');
        }
      } catch (error) {
        setAddress('No se pudo obtener la ubicación');
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Barra superior de ubicación */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationText} numberOfLines={1}>{address} ▼</Text>
        </TouchableOpacity>
        <View style={styles.topIcons}>
          <TouchableOpacity>
            <Text style={styles.topIcon}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.topIcon}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Barra de búsqueda (botón) */}
      <Link href="/search" asChild>
        <TouchableOpacity style={styles.searchBarContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchBarPlaceholder}>Buscar canchas, gimnasios...</Text>
        </TouchableOpacity>
      </Link>

      {/* 3. Categorías de deportes */}
      <FlatList
        data={sportsCategories}
        renderItem={({ item }) => <CategoryItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />

      {/* 4. Sección "Destacados" */}
      <SectionHeader title="Destacados en tu zona" />
      <FlatList
        data={featuredCenters}
        renderItem={({ item }) => <CenterCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.centersList}
      />

      {/* 5. Sección "Populares" */}
      <SectionHeader title="Populares esta semana" />
       <FlatList
        data={popularCenters}
        renderItem={({ item }) => <CenterCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.centersList}
      />

    </ScrollView>
  );
};

// --- ESTILOS (sin cambios) ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  locationButton: {
    flex: 1,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topIcons: {
    flexDirection: 'row',
  },
  topIcon: {
    fontSize: 24,
    marginLeft: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchBarPlaceholder: {
    fontSize: 16,
    color: '#8e8e93',
  },
  categoriesList: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionArrow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  centersList: {
    paddingLeft: 16,
    paddingRight: 8,
    marginBottom: 20,
  },
  centerCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  centerImage: {
    width: '100%',
    height: 140,
  },
  centerInfo: {
    padding: 12,
  },
  centerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  centerDetails: {
    fontSize: 13,
    color: '#666',
  },
});

export default HomeScreen;
