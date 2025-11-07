import { ApiResponse } from '../types/api-response.type';
import { Location } from '../types/location.type';

const API_URL = 'http://localhost:8090/location';

const handleResponse = async <T>(response: Response): Promise<T> => {

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Error ${response.status}: ${message || 'Error fetching data'}`);
  }

  const json: ApiResponse<T> = await response.json();
  return json?.Data;
};

export const locationService = {
  async GetProvinces(): Promise<Location[]> {
    const url = `${API_URL}?provinceId=0&cityId=0`;
    return handleResponse<Location[]>(await fetch(url));
  },

  async GetCities(provinceId: number): Promise<Location[]> {
    const url = `${API_URL}?provinceId=${provinceId}&cityId=0`;
    return handleResponse<Location[]>(await fetch(url));
  },
  async GetDistricts(provinceId: number, cityId: number): Promise<Location[]> {
    const url = `${API_URL}?provinceId=${provinceId}&cityId=${cityId}`;
    return handleResponse<Location[]>(await fetch(url));
  },
};

export default locationService;
