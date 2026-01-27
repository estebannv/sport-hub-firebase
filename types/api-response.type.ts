export interface ApiResponse<T> {
  Status: number;
  Message?: string;
  Data: T;
  Successful?: boolean;
}