import { ApiResponse } from "@/types/api-response.type";
import { HandleResponse } from "@/utils/api-response.utils";
import Constants from 'expo-constants';

const api = `${Constants.expoConfig?.extra?.apiUrl}/auth`;

const AuthService = {

  async SignIn(payload: Record<string, any>): Promise<ApiResponse<string>> {

    const url = `${api}/sign-in`;

    var response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

    return HandleResponse<string>(response);

  },

  async SendRegistrationOtp(payload: { Email: string }): Promise<ApiResponse<string>> {

    const url = `${api}/otp/registration`;

    var response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

    return HandleResponse<string>(response);

  },

  async SendPasswordResetOtp(payload: { Email: string }): Promise<ApiResponse<string>> {

    const url = `${api}/otp/password-reset`;

    var response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

    return HandleResponse<string>(response);

  },

  async ChangePassword(payload: { Email: string, Password: string, OTP: string }): Promise<ApiResponse<string>> {

    const url = `${api}/change-password`;

    var response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

    return HandleResponse<string>(response);

  },

  async Register(payload: { FullName: string, Email: string, Password: string, Otp: string }): Promise<ApiResponse<string>> {

    const url = `${api}/register`;

    var response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

    return HandleResponse<string>(response);

  },

  async UserExists(email: string): Promise<ApiResponse<string>> {

    const url = `${api}/user/exists?email=${email}`;

    var response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

    return HandleResponse<string>(response);

  },

};

export default AuthService;
