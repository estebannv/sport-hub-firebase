import LocationService from '@/services/location.service';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/home/Card';
import { CategoryCarousel } from '../../components/home/CategoryCarousel';
import { Colors, GlobalStyle } from '../../constants/theme';

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
  { id: '3', name: 'Gimnasio Rock Solid', rating: 4.7, reviews: 230, deliveryTime: 20, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
];

const HomeScreen = () => {

  const [city, setCity] = useState('Buscando ubicación...');
  const [country, setCountry] = useState('');

  const LoadLocation = async () => {

    const result = await LocationService.GetCurrentPosition();

    if (result) {
      setCity(result.city || 'Ubicación no encontrada');
      setCountry(result.country || '');
    }

  };

  useEffect(() => {
    LoadLocation();
  }, []);

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar style='dark'/>

      <ScrollView stickyHeaderIndices={[1]}>

        <View style={styles.topBar}>
          <Link href="/home" asChild>
            <Text style={styles.topBarTitle}>SportHub</Text>
          </Link>
          <TouchableOpacity style={styles.topBarLocationContainer}>
            <FontAwesome6 style={styles.topBarIcon} name="location-dot" color={Colors.light.main} />
            <View>
              <Text style={styles.topBarLocationDetail}>{city}</Text>
              {/* {country != '' ? <Text style={styles.topBarLocationDetailBottom}>{country}</Text> : null} */}
            </View>
            <Entypo name="chevron-small-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Link href="/search" asChild>
          <View style={styles.searchBarBackground}>
            <View style={styles.searchBarContainer}>
              <Ionicons style={styles.searchIcon} name="search-sharp" size={24} color="black" />
              <Text style={styles.searchBarPlaceholder}>Buscar canchas, centros deportivos...</Text>
            </View>
          </View>

        </Link>

        <FlatList
          data={sportsCategories}
          renderItem={({ item }) => <CategoryCarousel item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredCategories}
        />

        <Text style={styles.sectionTitle}>Destacados en tu zona</Text>
        <FlatList
          data={featuredCenters}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredCenters}
        />

        <Text style={styles.sectionTitle}>Destacados en tu zona</Text>
        <FlatList
          data={featuredCenters}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredCenters}
        />

        <Text style={styles.sectionTitle}>Destacados en tu zona</Text>
        <FlatList
          data={featuredCenters}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredCenters}
        />

        <Text style={styles.sectionTitle}>Destacados en tu zona</Text>
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
  },
  //General
  //Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: GlobalStyle.PaddingHorizontal,
    marginVertical: 7
  },
  topBarTitle: {
    fontSize: GlobalStyle.LabelFontSize,
    fontWeight: 'bold',
  },
  topBarLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  topBarLocationDetail: {
    fontSize: 15,
    fontWeight: '600',
    maxWidth: 90
  },
  topBarLocationDetailBottom: {
    fontSize: 13,
    fontWeight: '400',
  },
  topBarIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  //Top bar
  //Search bar
  searchBarBackground: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    marginHorizontal: GlobalStyle.PaddingHorizontal,
  },
  searchIcon: {
    fontSize: 21.5,
    marginRight: 10,
  },
  searchBarPlaceholder: {
    fontSize: GlobalStyle.LabelFontSize,
    color: '#8e8e93',
  },
  //Search bar
  //Categories list
  featuredCenters: {
    paddingLeft: GlobalStyle.PaddingHorizontal,
    backgroundColor: 'white'
  },
  featuredCategories: {
    backgroundColor: 'white'
  },
  //Categories list
  sectionTitle: {
      fontSize: 19,
      fontWeight: '700',
      paddingHorizontal: GlobalStyle.PaddingHorizontal,
      paddingBottom: 12,
      backgroundColor: 'white'
    },
});

export default HomeScreen;
