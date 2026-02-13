import { CommonService, IParameter } from '@/services/common.service';
import LocationService, { ILocation } from '@/services/location.service';
import { Keys, StorageService } from '@/services/storage.service';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/home/Card';
import { CategoryCarousel } from '../../components/home/carousel-category.component';
import { Colors, GlobalStyle } from '../../constants/theme';

const featuredCenters = [
  { id: '1', name: 'Super Padel Center', rating: 4.9, reviews: 500, deliveryTime: 15, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
  { id: '2', name: 'Gimnasio Rock Solid', rating: 4.7, reviews: 230, deliveryTime: 20, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
  { id: '3', name: 'Gimnasio Rock Solid', rating: 4.7, reviews: 230, deliveryTime: 20, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80' },
];

const HomeScreen = () => {

  const router = useRouter();
  const [categories, setCategories] = useState<IParameter[]>([]);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<string>('');

  const LoadCategories = async () => {
    const result = await CommonService.Parameters('categories');
    setCategories(result?.Data || []);
  };

  const LoadLocation = async () => {

    var locationsResponse = await LocationService.GetLocations();

    if (locationsResponse?.Data?.length == 0) {

      var location = await StorageService.Get<ILocation>(Keys.Location);

      console.log('Location', location);

      if (location) {
        setCity(location.City);
        setCountry(location.Country);
        await LocationService.SaveLocation(location);

      } else {

        var result = await LocationService.AskUserLocation();

        if (result) {
          await LocationService.SaveLocation(result);
          setCity(result.City);
          setCountry(result.Country);
        }
      }
    } else {
      setCity(locationsResponse.Data[0].City);
      setCountry(locationsResponse.Data[0].Country);
    }

  };

  useEffect(() => {
    LoadLocation();
    LoadCategories();
  }, []);

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar style='dark'/>

      <ScrollView stickyHeaderIndices={[1]}>

        <View style={styles.topBar}>
          <Link href="/home" asChild>
            <Text style={styles.topBarTitle}>SportHub</Text>
          </Link>
          <TouchableOpacity 
            style={styles.topBarLocationContainer}
            onPress={() => router.push('/locations' as any)}
          >
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
          data={categories}
          renderItem={({ item }) => <CategoryCarousel item={item} />}
          keyExtractor={(item) => item._id}
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
