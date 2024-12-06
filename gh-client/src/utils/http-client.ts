/* eslint-disable no-useless-catch */
import { BackendUrl } from "./config";

/* eslint-disable @typescript-eslint/no-explicit-any */
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface HttpClientOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  body?: any;
}

export class GenericHttpClient {
  private baseUrl: string = BackendUrl;

  async request<T>(
    endpoint: string,
    method: HttpMethod,
    options: HttpClientOptions = {}
  ): Promise<T> {
    const url = this.buildUrl(endpoint, options.params);
    const headers = { "Content-Type": "application/json", ...options.headers };

    const response = await fetch(url, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("json response is empty");
    }

    return (await response.json()) as T;
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    return this.request<T>(endpoint, "GET", { params }).catch((e) => {
      throw Error(e);
    });
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, "POST", { body });
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, "PUT", { body });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, "DELETE");
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number>
  ): string {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value.toString())
      );
    }
    return url.toString();
  }
}
