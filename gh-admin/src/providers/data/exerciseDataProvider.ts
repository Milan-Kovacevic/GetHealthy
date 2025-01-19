import { API_PREFIX, defaultAxios } from "@/lib";
import {
  DefaultDataProvider,
  defaultDataProvider,
} from "./defaultDataProvider";
import { delay } from "@/lib/utils";
import {
  DataProvider,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
} from "@refinedev/core";

export const EXERCISE_DATA_PROVIDER_KEY = "exercise";

export const exerciseDataProvider: DefaultDataProvider = {
  ...defaultDataProvider,
  getList: async ({ resource, pagination, filters }: GetListParams) => {
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

  getOne: async ({ resource, id }: GetOneParams) => {
    await delay(2000);
    const response = await defaultAxios.get(`${API_PREFIX}/${resource}/${id}`);
    return { data: response.data };
  },

  update: async ({ resource, id, variables }) => {
    const response = await defaultAxios.put(
      `${API_PREFIX}/${resource}/${id}`,
      variables
    );
    return { data: response.data };
  },

  deleteOne: async ({ resource, id }) => {
    await delay(3000);
    const response = await defaultAxios.delete(
      `${API_PREFIX}/${resource}/${id}`
    );
    return { data: response.data };
  },
};
