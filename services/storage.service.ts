import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SAVED_LOCATION: '@sport_hub:saved_location',
  HAS_ASKED_LOCATION: '@sport_hub:has_asked_location',
};

export interface SavedLocation {
  city: string;
  country: string;
  id?: string;
  name?: string;
}

export const StorageService = {
  // Guardar ubicación
  async saveLocation(location: SavedLocation): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SAVED_LOCATION, JSON.stringify(location));
    } catch (error) {
      console.error('Error guardando ubicación:', error);
      throw error;
    }
  },

  // Cargar ubicación guardada
  async getSavedLocation(): Promise<SavedLocation | null> {
    try {
      const locationJson = await AsyncStorage.getItem(STORAGE_KEYS.SAVED_LOCATION);
      if (locationJson) {
        return JSON.parse(locationJson);
      }
      return null;
    } catch (error) {
      console.error('Error cargando ubicación:', error);
      return null;
    }
  },

  // Eliminar ubicación guardada
  async removeSavedLocation(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SAVED_LOCATION);
    } catch (error) {
      console.error('Error eliminando ubicación:', error);
      throw error;
    }
  },

  // Verificar si ya se pidió la ubicación
  async hasAskedLocation(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.HAS_ASKED_LOCATION);
      return value === 'true';
    } catch (error) {
      console.error('Error verificando si se pidió ubicación:', error);
      return false;
    }
  },

  // Marcar que ya se pidió la ubicación
  async setHasAskedLocation(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HAS_ASKED_LOCATION, 'true');
    } catch (error) {
      console.error('Error marcando que se pidió ubicación:', error);
      throw error;
    }
  },

  // Guardar múltiples ubicaciones (para la pantalla de ubicaciones)
  async saveLocations(locations: SavedLocation[]): Promise<void> {
    try {
      await AsyncStorage.setItem('@sport_hub:saved_locations', JSON.stringify(locations));
    } catch (error) {
      console.error('Error guardando ubicaciones:', error);
      throw error;
    }
  },

  // Cargar múltiples ubicaciones guardadas
  async getSavedLocations(): Promise<SavedLocation[]> {
    try {
      const locationsJson = await AsyncStorage.getItem('@sport_hub:saved_locations');
      if (locationsJson) {
        return JSON.parse(locationsJson);
      }
      return [];
    } catch (error) {
      console.error('Error cargando ubicaciones:', error);
      return [];
    }
  },
};

export default StorageService;

