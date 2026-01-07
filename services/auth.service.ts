import { ApiResponse } from "@/types/api-response.type";
import { HandleResponse } from "@/utils/api-response.utils";

const api = process.env.API_URL + '/auth';

const AuthService = {

  async SignIn(payload: Record<string, any>): Promise<ApiResponse<string>> {

    // const url = `${api}/auth/sign-in`;
    const url = `http://localhost:8090/auth/sign-in`;

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

    // const url = `${api}/auth/send-otp`;
    const url = `http://localhost:8090/auth/otp/registration`;

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

    // const url = `${api}/auth/send-otp`;
    const url = `http://localhost:8090/auth/otp/password-reset`;

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

    // const url = `${api}/auth/change-password`;
    const url = `http://localhost:8090/auth/change-password`;

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

    // const url = `${api}/auth/register`;
    const url = `http://localhost:8090/auth/register`;

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

    // const url = `${api}/auth/register`;
    const url = `http://localhost:8090/auth/user/exists`;

    var response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
      });

    return HandleResponse<string>(response);

  },

};

export default AuthService;
