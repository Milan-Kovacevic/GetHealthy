import type { AuthProvider } from "@refinedev/core";
import { delay } from "@/lib/utils";
import { API_PREFIX, defaultAxios } from "@/lib";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  AUTH_CONTEXT_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/lib/constants";

export const authProvider: AuthProvider = {
  login: async (data: ILoginRequest) => {
    await delay(2000);
    if (!data) {
      return {
        success: false,
        error: {
          name: "Unable to login",
          message: "Invalid username or password",
        },
      };
    }
    try {
      const response = await defaultAxios.post<ILoginResponse>(
        `${API_PREFIX}/auth/login`,
        {
          ...data,
        }
      );

      if (response.data) {
        const data = response.data;
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, data.tokens.accessToken);
        localStorage.setItem(
          REFRESH_TOKEN_STORAGE_KEY,
          data.tokens.refreshToken
        );
        localStorage.setItem(
          AUTH_CONTEXT_STORAGE_KEY,
          JSON.stringify(data.user)
        );

        return {
          success: true,
          successNotification: {
            message: "Welcome",
            description: "You have successfully logged in.",
          },
        };
      }

      return {
        success: false,
        error: {
          name: "Unexpected error",
          message: "Please try again later.",
        },
      };
    } catch {
      return {
        success: false,
        error: {
          name: "Unable to login",
          message: "Invalid username or password.",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const userJson = localStorage.getItem(AUTH_CONTEXT_STORAGE_KEY);
    if (userJson) {
      const user = JSON.parse(userJson) as IAuthUser;
      return {
        id: user.userId,
        name: `${user.firstName} ${user.lastName}`,
        avatar: "",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
