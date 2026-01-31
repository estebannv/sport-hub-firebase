import { ApiResponse } from "@/types/api-response.type";
import { HandleResponse } from "@/utils/api-response.utils";
import { getAuthHeaders } from "@/utils/auth-headers.utils";
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
    const headers = await getAuthHeaders();

    var response = await fetch(url, {
        method: 'GET',
        headers
      });

    return HandleResponse<IParameter[]>(response);

  },

};

