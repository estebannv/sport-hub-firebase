import { ApiResponse } from "@/types/api-response.type";
import { HandleResponse } from "@/utils/api-response.utils";
import Constants from 'expo-constants';

const api = `${Constants.expoConfig?.extra?.apiUrl}/common`;

export interface IParameter {
    _id: string;
    Key: string;
    Value: string;
    Description?: string;
    Category?: string;
    Active: boolean;
    Sort: number;
}

export const CommonService = {

  async Parameters(key?: string, category?: string): Promise<ApiResponse<IParameter[]>> {

    const url = `${api}/param${key ? `?key=${key}` : ''}${category ? `&category=${category}` : ''}`;

    var response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

    return HandleResponse<IParameter[]>(response);

  },

};

