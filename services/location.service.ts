
import { ApiResponse } from '../types/api-response.type';
import { Location } from '../types/location.type';

const API_URL = 'http://localhost:8090/location';

export const getProvinces = async (): Promise<Location[]> => {
  const response = await fetch(`${API_URL}?provinceId=0&cityId=0`);
  if (!response.ok) {
    throw new Error('Error fetching provinces');
  }
  const json: ApiResponse<Location[]> = await response.json();
  return json.Data;
};

export const getCantons = async (provinceId: number): Promise<Location[]> => {
  const response = await fetch(`${API_URL}?provinceId=${provinceId}&cityId=0`);
  if (!response.ok) {
    throw new Error('Error fetching cantons');
  }
  return response.json();
};

export const getDistricts = async (provinceId: number, cityId: number): Promise<Location[]> => {
  const response = await fetch(`${API_URL}?provinceId=${provinceId}&cityId=${cityId}`);
  if (!response.ok) {
    throw new Error('Error fetching districts');
  }
  return response.json();
};
