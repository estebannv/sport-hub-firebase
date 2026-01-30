import AsyncStorage from '@react-native-async-storage/async-storage';

enum Keys {
  Location,
};

const StorageService = {

  async Set(key: Keys, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key.toString(), value);
    } catch (error) {
      console.error('Error guardando:', error);
      throw error;
    }
  },

  async Get<T>(key: Keys): Promise<T | string | null> {
    try {
      return await AsyncStorage.getItem(key.toString()) as T | string | null;
    } catch (error) {
      console.error('Error cargando:', error);
      return null;
    }
  },
};

export { Keys, StorageService };

