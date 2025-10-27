export interface ApiResponse<T> {
  Status: number;       // Código HTTP o estado interno (por ejemplo, 200)
  Message?: string;     // Mensaje opcional del backend
  Data: T;              // Datos reales (puede ser un array, objeto, etc.)
}