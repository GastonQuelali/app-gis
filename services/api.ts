import axios, { AxiosInstance, AxiosError } from "axios";
import { getPrediosCountUrl as getPrediosUrl, getPrediosCountUrl as getManzanaUrl } from "../constants/arcgis";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 10000,
    });
  }

  async getPrediosCount(): Promise<ApiResponse<number>> {
    try {
      const response = await this.client.get(getPrediosUrl());
      return { data: response.data.count || 0 };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getManzanaCount(): Promise<ApiResponse<number>> {
    try {
      const response = await this.client.get(getManzanaUrl());
      return { data: response.data.count || 0 };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getDashboardStats(): Promise<ApiResponse<{ predios: number; manzanas: number }>> {
    try {
      const [prediosRes, manzanaRes] = await Promise.all([
        this.client.get(getPrediosUrl()),
        this.client.get(getManzanaUrl()),
      ]);

      return {
        data: {
          predios: prediosRes.data.count || 0,
          manzanas: manzanaRes.data.count || 0,
        },
      };
    } catch (error) {
      return { error: this.getErrorMessage(error) };
    }
  }

  private handleError<T>(error: unknown): ApiResponse<T> {
    return { error: this.getErrorMessage(error) };
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
      return error.message || "Error de red";
    }
    return "Error desconocido";
  }
}

export const apiService = new ApiService();
export type { ApiResponse };