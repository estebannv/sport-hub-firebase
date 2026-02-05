import AsyncStorage from '@react-native-async-storage/async-storage';

enum Keys {
  Location,
  Token,
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

  async Get<T>(key: Keys): Promise<T | null> {

    try {

      const data = await AsyncStorage.getItem(key.toString());

      if (data == null || data === '') 
        return null;

      return JSON.parse(data) as T;
      
    } catch {
      return null;
    }
  },
};

export { Keys, StorageService };

