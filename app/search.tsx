import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

// Reutilizamos los datos de categorías
const sportsCategories = [
  { id: '1', name: 'Fútbol', icon: '⚽' },
  { id: '2', name: 'Basket', icon: '🏀' },
  { id: '3', name: 'Tenis', icon: '🎾' },
  { id: '4', name: 'Pádel', icon: '🏸' },
  { id: '5', name: 'Gym', icon: '🏋️' },
  { id: '6', name: 'Boxeo', icon: '🥊' },
  { id: '7', name: 'Ciclismo', icon: '🚴' },
  { id: '8', name: 'Natación', icon: '🏊' },
  { id: '9', name: 'Artes Marciales', icon: '🥋' },
];

const CategoryListItem = ({ item }: { item: { name: string, icon: string } }) => (
    <TouchableOpacity style={styles.categoryItem}>
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryArrow}>›</Text>
    </TouchableOpacity>
);

const SearchScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 1. Barra de Búsqueda y Botón de Cancelar */}
        <View style={styles.searchHeader}>
          <View style={styles.searchBarContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput 
                placeholder="Buscar canchas, gimnasios..." 
                style={styles.searchBar} 
                autoFocus={true} // El teclado se abrirá automáticamente
            />
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        {/* 2. Lista de Categorías */}
        <FlatList
            data={sportsCategories}
            renderItem={({ item }) => <CategoryListItem item={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<Text style={styles.listTitle}>Todas las categorías</Text>}
            showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40, // Un poco más pequeño para el modal
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 12,
    fontSize: 16,
    color: '#007AFF',
  },
  listTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal: 16,
      marginBottom: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
  },
  categoryArrow: {
    fontSize: 20,
    color: '#c7c7cc',
  },
});

export default SearchScreen;
