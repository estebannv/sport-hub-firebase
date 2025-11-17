import * as Location from 'expo-location';
import { ApiResponse } from '../types/api-response.type';
import { LocationType } from '../types/location.type';

const api = process.env.API_URL + 'location';

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
        return { city, country };
      }

    } catch (error) {
      console.error(`File: location.service.ts. Method: GetCurrentPosition. Error: ${error}`);
    }

    return {
        city: null,
        country: null,
        error: 'Ubicación no encontrada'
      };
  }


};

export default LocationService;
