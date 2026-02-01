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

  async LoadUserLocation(): Promise<ILocation | null> {
    
    try {

      const locationData = await StorageService.Get<ILocation>(Keys.Location);

      if (locationData) {
        return locationData as ILocation;
      }

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

        const response = await this.SaveLocation(newLocation);

        if (response.Successful) {
          await StorageService.Set(Keys.Location, JSON.stringify(newLocation));
          return newLocation;
        } 
        throw new Error(response.Message || 'Failed to save location');
      }
      
    } catch (error) {
      console.error('Error loading user location:', error);
    }
    return null;
  },
};

export default LocationService;
