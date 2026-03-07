import { Banner } from '@/components/home/banner/banner.componet';
import { Card } from '@/components/home/card/card.component';
import { useCategories } from '@/hooks/useCategories';
import HomeService from '@/services/home.service';
import LocationService, { ILocation } from '@/services/location.service';
import { Keys, StorageService } from '@/services/storage.service';
import UserService from '@/services/user.service';
import { BannerItem, CardItem, HomeContentRaw } from '@/types/home.type';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardPlaceholder } from '../../components/home/card/card-placeholder.component';
import { CategoryCarouselPlaceholder } from '../../components/home/category/carousel-category-placeholder.component';
import { CategoryCarousel } from '../../components/home/category/carousel-category.component';
import { Colors, GlobalStyle } from '../../constants/theme';

const HomeScreen = () => {

  const router = useRouter();
  const { categories, loadingCategories } = useCategories();
  const [homeContent, setHomeContent] = useState<HomeContentRaw[]>([]);
  const [loadingHomeContent, setLoadingHomeContent] = useState<boolean>(true);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<string>('');

  const GetUserLocation = async (): Promise<ILocation | null> => {

    var userResponse = await UserService.GetUserInformation();

    if (userResponse?.Data?.Location){
      const userLocation = userResponse.Data.Location;
      setCity(userLocation.City);
      setCountry(userLocation.Country);
      await StorageService.Set(Keys.Location, userLocation);
      return userLocation;
    }

    var location = await StorageService.Get<ILocation>(Keys.Location);

    if (location) {
      setCity(location.City);
      setCountry(location.Country);
      await LocationService.SaveLocation(location);
      return location;
    }

    var result = await LocationService.AskUserLocation();

    if (result) {
      setCity(result.City);
      setCountry(result.Country);
      await LocationService.SaveLocation(result);
      return result;
    }

    return null;
  };

  useEffect(() => {

    const InitializeHome = async () => {
      const location = await GetUserLocation();
      await GetHomeContent(location);
    };

    InitializeHome();
  }, []);

  const GetHomeContent = async (resolvedLocation?: ILocation | null) => {
    
    setLoadingHomeContent(true);

    const location = resolvedLocation || await StorageService.Get<ILocation>(Keys.Location);

    if (location) {

      const response = await HomeService.HomeContent(location.Latitude, location.Longitude);

      if (response.Successful) {
        setHomeContent(response.Data);
      }
    }

    setLoadingHomeContent(false);
  };

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

        {loadingCategories ? (
          <CategoryCarouselPlaceholder />
        ) : (
          <FlatList
            data={categories}
            renderItem={({ item }) => <CategoryCarousel item={item} />}
            keyExtractor={(item, index) => item._id ?? `category-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredCategories}
          />
        )}

        {loadingHomeContent ? (
          <CardPlaceholder />
        ) : (
          <>
            {homeContent.map((section, index) => {
              
              if (!section.component || !section.props) 
                return null;

              const { title, items } = section.props;

              return (
                <View key={`${section.component}-${index}`} style={styles.dynamicSectionContainer}>
                  {section.component === 'card' && (
                    <>
                      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
                      <FlatList
                        data={items as CardItem[]}
                        renderItem={({ item }) => <Card item={item} />}
                        keyExtractor={(item, idx) => item?.id ?? `card-${index}-${idx}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.featuredCenters}
                      />
                    </>
                  )}
                  {section.component === 'banner' && (
                    <Banner title={title} items={items as BannerItem[]} />
                  )}
                </View>
              );
            })}
          </>
        )}

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
    backgroundColor: 'white',
    paddingTop: 10,
  },
  featuredCategories: {
    backgroundColor: 'white',
  },
  //Categories list
  sectionTitle: {
      fontSize: 19,
      fontWeight: '700',
      paddingHorizontal: GlobalStyle.PaddingHorizontal,
      paddingBottom: 12,
      backgroundColor: 'white'
    },
  dynamicSectionContainer: {
    backgroundColor: 'white',
  },
});

export default HomeScreen;
