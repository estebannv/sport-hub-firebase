import { ApiResponse } from "@/types/api-response.type";
import { HandleResponse } from "@/utils/api-response.utils";

const api = process.env.API_URL + '/auth';

const AuthService = {

  async SignIn(payload: Record<string, any>): Promise<ApiResponse<string>> {

    // const url = `${api}/sign-in`;
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

};

export default AuthService;
