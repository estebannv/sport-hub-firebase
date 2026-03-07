import { ApiResponse } from "@/types/api-response.type";
import { HomeContentRaw } from "@/types/home.type";
import { HandleResponse } from "@/utils/api-response.utils";
import { getAuthHeaders } from "@/utils/auth-headers.utils";
import Constants from 'expo-constants';

const api = `${Constants.expoConfig?.extra?.apiUrl}/home`;

const HomeService = {

  async HomeContent(latitude: number, longitude: number): Promise<ApiResponse<HomeContentRaw[]>> {

    const url = `${api}/content?latitude=${latitude}&longitude=${longitude}`;
    const headers = await getAuthHeaders();
    const response = await fetch(url, { headers });
    var result = await HandleResponse<HomeContentRaw[]>(response);
    console.log(result);
    return result;
  }

};

export default HomeService;
