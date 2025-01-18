import { API_PREFIX, defaultAxios } from "@/lib";
import {
  defaultDataProvider,
  DefaultDataProvider,
} from "./defaultDataProvider";

export const EXERCISE_DATA_PROVIDER_KEY = "exercise";

export const exerciseDataProvider: DefaultDataProvider = {
  ...defaultDataProvider,
  getList: async ({ resource, pagination, filters }) => {
    const { current = 1, pageSize = 10 } = pagination || {};

    const query = new URLSearchParams({
      page: `${current - 1}`,
      size: `${pageSize}`,
    });

    // filters?.forEach((filter) => {
    //   query.append(filter.operator, filter.value);
    // });

    const response = await defaultAxios.get(
      `${API_PREFIX}/${resource}/filter?${query.toString()}`
    );
    return {
      data: response.data.content,
      total: response.data.totalElements,
    };
  },
};
