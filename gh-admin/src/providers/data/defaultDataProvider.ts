import { API_BASE_URL, API_PREFIX, defaultAxios } from "@/lib";
import { DataProvider } from "@refinedev/core";

export type DefaultDataProvider = Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany" | "getMany" | "custom"
>;

export const defaultDataProvider: DefaultDataProvider = {
  getApiUrl: () => API_BASE_URL + `/${API_PREFIX}`,

  getList: async ({ resource, pagination, filters }) => {
    const { current = 1, pageSize = 10 } = pagination || {};

    const query = new URLSearchParams({
      page: `${current - 1}`, // Assuming Spring Boot pagination is zero-based
      size: `${pageSize}`,
    });

    // filters?.forEach((filter) => {
    //   query.append(filter.operator, filter.value);
    // });

    const response = await defaultAxios.get(
      `${API_PREFIX}/${resource}?${query.toString()}`
    );
    return {
      data: response.data, // Assuming Spring Boot returns `content` for paginated lists
      total: response.data.length, // Assuming `totalElements` contains total count
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await defaultAxios.get(`${API_PREFIX}/${resource}/${id}`);
    return { data: response.data };
  },

  create: async ({ resource, variables }) => {
    const response = await defaultAxios.post(
      `${API_PREFIX}/${resource}`,
      variables
    );
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
    const response = await defaultAxios.delete(
      `${API_PREFIX}/${resource}/${id}`
    );
    return { data: response.data };
  },
};
