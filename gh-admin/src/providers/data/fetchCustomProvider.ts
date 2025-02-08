import { CustomResponse, DataProvider } from "@refinedev/core";
import { dataProvider } from "./dataProvider";
import { API_BASE_URL, API_PREFIX, defaultAxios } from "@/lib";

export const fetchDataProvider = (
  listAppender: string = "",
  delayTime: number = 500
): DataProvider => {
  var provider = dataProvider(listAppender, delayTime, defaultAxios);
  provider = {
    ...provider,
    custom: async ({ url }): Promise<CustomResponse<any>> => {
      let requestUrl = `${API_BASE_URL}${API_PREFIX}/${url}`;
      const response = await fetch(requestUrl);
      const blob = await response.blob();

      return Promise.resolve({ data: blob });
    },
  };
  return provider;
};
