import { ApiResponse } from "@/types/api-response.type";
import { HandleResponse } from "@/utils/api-response.utils";
import { getAuthHeaders } from "@/utils/auth-headers.utils";
import Constants from 'expo-constants';
import { ILocation } from "./location.service";

const api = `${Constants.expoConfig?.extra?.apiUrl}/user`;

export interface IUser {
  Id: string;
  FullName: string;
  Email: string;
  Role: string;
  Location: ILocation;
}

const UserService = {

  async GetUserInformation(): Promise<ApiResponse<IUser>> {
    const headers = await getAuthHeaders();
    const url = `${api}`;
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    return await HandleResponse<IUser>(response);
  },

};

export default UserService;
