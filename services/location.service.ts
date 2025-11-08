import Config from 'react-native-config';
import { ApiResponse } from '../types/api-response.type';
import { LocationType } from '../types/location.type';

const api = `${Config.API_URL}/location`;

const handleResponse = async <T>(response: Response): Promise<T> => {

  if (!response.ok)
    throw new Error(`Error ${response.status}: ${response.statusText}`);

  const json: ApiResponse<T> = await response.json();
  return json?.Data;
};

export const locationService = {
  async GetProvinces(): Promise<LocationType[]> {
    const url = `${api}?provinceId=0&cityId=0`;
    console.log(url)
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
};

export default locationService;
