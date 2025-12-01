import { ApiResponse } from '../types/api-response.type';

export const HandleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => await response.json();