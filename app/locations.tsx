import { Colors } from '@/constants/theme';
import { ILocation, LocationService } from '@/services/location.service';
import { Keys, StorageService } from '@/services/storage.service';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LocationWithId extends ILocation {
  _id?: string;
}

const LocationItem = ({ 
  location, 
  isSelected, 
  onSelect, 
  onDelete 
}: { 
  location: LocationWithId; 
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
          {location.City}
        </Text>
        {location.Country && (
          <Text style={styles.locationCountry}>{location.Country}</Text>
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
  const [locations, setLocations] = useState<LocationWithId[]>([]);
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(null);
  const [loading, setLoading] = useState(false);

  const loadLocations = async () => {

    try {

      const locationsResponse = await LocationService.GetLocations();
      setLocations(locationsResponse?.Data || []);
      
    } catch (error) {
      console.error('Error cargando ubicaciones:', error);
      Alert.alert('Error', 'No se pudieron cargar las ubicaciones');
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleAddCurrentLocation = async () => {
    setLoading(true);
    try {
      // LoadUserLocation ya solicita permisos y guarda la ubicación
      const result = await LocationService.AskUserLocation();
      
      if (result) {
        await LocationService.SaveLocation(result);
        await loadLocations();
      }
    } catch (error: any) {
      console.error('Error agregando ubicación:', error);
      const errorMessage = error?.message || 'No se pudo agregar la ubicación';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = async (location: LocationWithId) => {
    try {
      // Guardar en almacenamiento local como ubicación actual
      await StorageService.Set(Keys.Location, location);
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

  const handleDeleteLocation = (location: LocationWithId) => {
    if (!location._id) {
      Alert.alert('Error', 'No se puede eliminar esta ubicación');
      return;
    }

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
              
              const deleteResponse = await LocationService.DeleteLocation(location._id!);

              if (deleteResponse.Successful) {
                
                if (currentLocation && 
                    currentLocation.City === location.City && 
                    currentLocation.Country === location.Country) {
                  await StorageService.ClearItem(Keys.Location);
                  setCurrentLocation(null);
                }
                
                await loadLocations();
                
              } else {
                Alert.alert('Error', deleteResponse.Message || 'No se pudo eliminar la ubicación');
              }
            } catch (error) {
              console.error('Error eliminando ubicación:', error);
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
        <Text style={styles.sectionTitle}>Ubicación guardada</Text>
        
        {locations.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome6 name="location-dot" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No tienes ubicacion guardada</Text>
            <Text style={styles.emptyStateSubtext}>
              Agrega tu ubicación actual para comenzar a usar la app
            </Text>
          </View>
        ) : (
          locations.map((location, index) => {
            const isSelected = currentLocation && 
              currentLocation.City === location.City && 
              currentLocation.Country === location.Country;
            
            return (
              <LocationItem
                key={location._id || `location-${index}`}
                location={location}
                isSelected={!!isSelected}
                onSelect={() => handleSelectLocation(location)}
                onDelete={() => handleDeleteLocation(location)}
              />
            );
          })
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

