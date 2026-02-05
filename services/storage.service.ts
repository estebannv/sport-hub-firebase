import AsyncStorage from '@react-native-async-storage/async-storage';

enum Keys {
  Location,
  Token,
};

const StorageService = {

  async Set(key: Keys, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key.toString(), JSON.stringify(value));
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

  async ClearStorage(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log('Storage cleared');
    } catch (error) {
      console.error('Error limpiando storage:', error);
      throw error;
    }
  },

  async ClearItem(key: Keys): Promise<void> {
    try {
      await AsyncStorage.removeItem(key.toString());
    } catch (error) {
      console.error('Error eliminando item:', error);
      throw error;
    }
  },

};

export { Keys, StorageService };

