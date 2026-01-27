import { Colors } from '@/constants/theme';
import LocationService from '@/services/location.service';
import StorageService, { SavedLocation } from '@/services/storage.service';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LocationItem = ({ 
  location, 
  isSelected, 
  onSelect, 
  onDelete 
}: { 
  location: SavedLocation; 
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) => (
  <TouchableOpacity 
    style={[styles.locationCard, isSelected && styles.selectedCard]} 
    onPress={onSelect}
  >
    <View style={styles.locationInfo}>
      <FontAwesome6 name="location-dot" size={20} color={isSelected ? Colors.light.main : '#666'} />
      <View style={styles.locationDetails}>
        <Text style={[styles.locationName, isSelected && styles.selectedText]}>
          {location.name || location.city}
        </Text>
        {location.country && (
          <Text style={styles.locationCountry}>{location.country}</Text>
        )}
      </View>
    </View>
    {isSelected && (
      <View style={styles.selectedBadge}>
        <Text style={styles.selectedBadgeText}>Actual</Text>
      </View>
    )}
    <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>×</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const LocationsScreen = () => {
  const router = useRouter();
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [currentLocation, setCurrentLocation] = useState<SavedLocation | null>(null);
  const [loading, setLoading] = useState(false);

  const loadLocations = async () => {
    try {
      const savedLocations = await StorageService.getSavedLocations();
      const savedLocation = await StorageService.getSavedLocation();
      
      setLocations(savedLocations);
      setCurrentLocation(savedLocation);
    } catch (error) {
      console.error('Error cargando ubicaciones:', error);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleAddCurrentLocation = async () => {
    setLoading(true);
    try {
      const result = await LocationService.GetCurrentPosition();
      
      if (result && result.city) {
        const newLocation: SavedLocation = {
          city: result.city,
          country: result.country || '',
          name: result.city,
          id: Date.now().toString(),
        };

        // Agregar a la lista de ubicaciones
        const updatedLocations = [...locations, newLocation];
        await StorageService.saveLocations(updatedLocations);
        
        // Guardar como ubicación actual
        await StorageService.saveLocation(newLocation);
        
        await loadLocations();
        Alert.alert('Éxito', 'Ubicación agregada correctamente');
      } else {
        Alert.alert('Error', result?.error || 'No se pudo obtener la ubicación');
      }
    } catch (error) {
      console.error('Error agregando ubicación:', error);
      Alert.alert('Error', 'No se pudo agregar la ubicación');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = async (location: SavedLocation) => {
    try {
      await StorageService.saveLocation(location);
      setCurrentLocation(location);
      Alert.alert('Éxito', 'Ubicación actualizada');
      // Regresar a la pantalla anterior después de un breve delay
      setTimeout(() => {
        router.back();
      }, 500);
    } catch (error) {
      console.error('Error seleccionando ubicación:', error);
      Alert.alert('Error', 'No se pudo actualizar la ubicación');
    }
  };

  const handleDeleteLocation = (locationId: string) => {
    Alert.alert(
      'Eliminar ubicación',
      '¿Estás seguro de que deseas eliminar esta ubicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedLocations = locations.filter(loc => loc.id !== locationId);
              await StorageService.saveLocations(updatedLocations);
              
              // Si la ubicación eliminada era la actual, limpiar la ubicación actual
              if (currentLocation?.id === locationId) {
                await StorageService.removeSavedLocation();
                setCurrentLocation(null);
              }
              
              await loadLocations();
            } catch (error) {
              console.error('Error eliminando ubicación:', error);
              Alert.alert('Error', 'No se pudo eliminar la ubicación');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Ubicaciones' }} />
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Ubicaciones guardadas</Text>
        
        {locations.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome6 name="location-dot" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No tienes ubicaciones guardadas</Text>
            <Text style={styles.emptyStateSubtext}>
              Agrega tu ubicación actual para comenzar
            </Text>
          </View>
        ) : (
          locations.map((location) => (
            <LocationItem
              key={location.id}
              location={location}
              isSelected={currentLocation?.id === location.id}
              onSelect={() => handleSelectLocation(location)}
              onDelete={() => handleDeleteLocation(location.id!)}
            />
          ))
        )}

        <TouchableOpacity 
          style={[styles.addButton, loading && styles.addButtonDisabled]} 
          onPress={handleAddCurrentLocation}
          disabled={loading}
        >
          <FontAwesome6 name="plus" size={20} color={Colors.light.main} />
          <Text style={styles.addButtonText}>
            {loading ? 'Obteniendo ubicación...' : 'Agregar ubicación actual'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    marginTop: 16,
  },
  locationCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: Colors.light.main,
    backgroundColor: '#E8F5E9',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationDetails: {
    marginLeft: 12,
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedText: {
    color: Colors.light.main,
    fontWeight: '600',
  },
  locationCountry: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  selectedBadge: {
    backgroundColor: Colors.light.main,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  selectedBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 24,
    color: '#999',
    fontWeight: '300',
  },
  addButton: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    color: Colors.light.main,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default LocationsScreen;

