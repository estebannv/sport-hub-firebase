import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { ApiResponse } from '../types/api-response.type';
import { LocationType } from '../types/location.type';
import { HandleResponse } from '../utils/api-response.utils';
import { getAuthHeaders } from '../utils/auth-headers.utils';
import { Keys, StorageService } from './storage.service';

const api = `${Constants.expoConfig?.extra?.apiUrl}/location`;

export interface ILocation {
  City: string;
  Country: string;
  Latitude: number;
  Longitude: number;
}

const handleResponse = async <T>(response: Response): Promise<T> => {

  if (!response.ok)
    throw new Error(`Error ${response.status}: ${response.statusText}`);

  const json: ApiResponse<T> = await response.json();
  return json?.Data;
};


export const LocationService = {

  async GetProvinces(): Promise<LocationType[]> {
    const url = `${api}?provinceId=0&cityId=0`;
    const headers = await getAuthHeaders();
    return handleResponse<LocationType[]>(await fetch(url, { headers }));
  },

  async GetCities(provinceId: number): Promise<LocationType[]> {
    const url = `${api}?provinceId=${provinceId}&cityId=0`;
    const headers = await getAuthHeaders();
    return handleResponse<LocationType[]>(await fetch(url, { headers }));
  },

  async GetDistricts(provinceId: number, cityId: number): Promise<LocationType[]> {
    const url = `${api}?provinceId=${provinceId}&cityId=${cityId}`;
    const headers = await getAuthHeaders();
    return handleResponse<LocationType[]>(await fetch(url, { headers }));
  },

  async SaveLocation(location: ILocation): Promise<ApiResponse<string>> {
    const headers = await getAuthHeaders();
    console.log('Headers:', headers);
    const url = `${api}/user`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(location)
    });

    return await HandleResponse<string>(response);
  },

  async GetLocations(): Promise<ApiResponse<ILocation[]>> {
    const headers = await getAuthHeaders();
    const url = `${api}/user`;
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    return await HandleResponse<ILocation[]>(response);
  },

  async DeleteLocation(locationId: string): Promise<ApiResponse<boolean>> {
    const headers = await getAuthHeaders();
    const url = `${api}/user/${locationId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });
    
    return await HandleResponse<boolean>(response);
  },

  async AskUserLocationAndSaveInStorage(): Promise<ILocation | null> {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permission not granted');
    }

    const location = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(location.coords);
    
    if (geocode?.length > 0) {

      const { city, country } = geocode[0];

      const newLocation: ILocation = {
        City: city || '',
        Country: country || '',
        Latitude: location.coords.latitude,
        Longitude: location.coords.longitude
      };

      await StorageService.Set(Keys.Location, newLocation);

      return newLocation;

    } else {
      console.log('Failed to get location');
    }
    return null;
  },

  async LoadAndSaveUserLocation(): Promise<ILocation | null> {
    
    try {

      const locationData = await StorageService.Get<ILocation>(Keys.Location);

      if (!locationData) {
        
        var newLocation = await this.AskUserLocationAndSaveInStorage();

        if (newLocation) {
          this.SaveLocation(newLocation);
          return newLocation;
        } else {
          throw new Error('Failed to get location');
        }
      }

      return locationData;
      
    } catch (error) {
      console.error('Error loading user location:', (error as Error).message);
    }
    
    return null;
  },
};

export default LocationService;
