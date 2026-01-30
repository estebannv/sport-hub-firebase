import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { ApiResponse } from '../types/api-response.type';
import { LocationType } from '../types/location.type';
import { HandleResponse } from '../utils/api-response.utils';
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
    return handleResponse<LocationType[]>(await fetch(url));
  },

  async GetCities(provinceId: number): Promise<LocationType[]> {
    const url = `${api}?provinceId=${provinceId}&cityId=0`;
    return handleResponse<LocationType[]>(await fetch(url));
  },

  async GetDistricts(provinceId: number, cityId: number): Promise<LocationType[]> {
    const url = `${api}?provinceId=${provinceId}&cityId=${cityId}`;
    return handleResponse<LocationType[]>(await fetch(url));
  },

  async GetCurrentPosition() {

    try {

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return {
          city: null,
          country: null,
          error: 'No se concedió permiso de ubicación'
        };
      }

      const location = await Location.getCurrentPositionAsync({});
      const geocode = await Location.reverseGeocodeAsync(location.coords);

      if (geocode?.length > 0) {
        const { city, country } = geocode[0];
        return { City: city, Country: country, Latitude: location.coords.latitude, Longitude: location.coords.longitude };
      }

    } catch (error) {
      console.error(`File: location.service.ts. Method: GetCurrentPosition. Error: ${error}`);
    }

    return {
        city: null,
        country: null,
        error: 'Ubicación no encontrada'
      };
  },

  async SaveLocation(location: ILocation): Promise<ApiResponse<string>> {

    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
    });

    return await HandleResponse<string>(response);
  },

  async GetLocations(): Promise<ApiResponse<ILocation[]>> {
    
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await HandleResponse<ILocation[]>(response);
  },

  async DeleteLocation(locationId: string): Promise<ApiResponse<boolean>> {

    const response = await fetch(`${api}/${locationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return await HandleResponse<boolean>(response);
  },

  async LoadUserLocation(): Promise<ILocation | null> {
    
      const hasAskedLocation = await StorageService.Get(Keys.HasAskedLocation);
      
      if (!hasAskedLocation) {

        const result = await this.GetCurrentPosition();
        
        if (result) {

          const newLocation: ILocation = {
            City: result.city || '',
            Country: result.country || '',
            Latitude: result.Latitude || 0,
            Longitude: result.Longitude || 0
          };
          
          const response = await this.SaveLocation(newLocation);

          if (response.Successful) {
            await StorageService.Save(Keys.HasAskedLocation, 'true');
            return newLocation;
          } else {
            await StorageService.Save(Keys.HasAskedLocation, 'false');
          }
        }

      }
      return null;
    }

};

export default LocationService;
