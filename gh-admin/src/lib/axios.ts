import axios, { CreateAxiosDefaults } from "axios";
import { HttpError } from "@refinedev/core";
import environments from "@/environments/config";
import { ACCESS_TOKEN_STORAGE_KEY } from "./constants";

export const API_PREFIX = environments().apiResourcePrefix;
export const API_BASE_URL = environments().baseApiPath;

const axiosConfiguration: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAxios = (useAuthentication = false) => {
  const axiosInstance = axios.create(axiosConfiguration);

  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  axiosInstance.interceptors.request.use(
    (requestConfig) => {
      if (useAuthentication && token)
        requestConfig.headers.Authorization = `Bearer ${token}`;
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const customError: HttpError = {
        ...error,
        message: error.response?.data?.message,
        statusCode: error.response?.status,
      };

      return Promise.reject(customError);
    }
  );

  return axiosInstance;
};
