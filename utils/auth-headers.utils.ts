import { Keys, StorageService } from '@/services/storage.service';

/**
 * Obtiene el token de autenticación del almacenamiento local
 * @returns El token de autenticación o null si no existe
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    const token = await StorageService.Get<string>(Keys.Token);
    if (token && typeof token === 'string') {
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo token:', error);
    return null;
  }
};

/**
 * Construye los headers HTTP con el token de autenticación incluido
 * @param additionalHeaders Headers adicionales opcionales
 * @returns Headers con Content-Type y Authorization (si hay token)
 */
export const getAuthHeaders = async (additionalHeaders?: Record<string, string>): Promise<HeadersInit> => {
  const token = await getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...additionalHeaders
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

