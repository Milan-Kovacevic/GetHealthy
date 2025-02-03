import { API_BASE_URL, API_PREFIX, defaultAxios } from "@/lib";
import { delay } from "@/lib/utils";
import {
  CrudFilters,
  CrudOperators,
  CrudSorting,
  DataProvider,
  Pagination,
} from "@refinedev/core";
import { AxiosInstance } from "axios";
import { stringify } from "querystring";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

export const dataProvider = (
  listAppender: string = "",
  delayTime: number = 500,
  client: AxiosInstance = defaultAxios
): DataProvider => {
  const httpClient = client;
  const pageablePrefix = listAppender;

  return {
    getOne: async ({ resource, id, meta }) => {
      const url = `${API_PREFIX}/${resource}/${id}`;

      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypes) ?? "get";

      await delay(delayTime);
      const { data } = await httpClient[requestMethod](url, {
        headers,
      });

      return {
        data,
      };
    },

    update: async ({ resource, id, variables, meta }) => {
      const url = `${API_PREFIX}/${resource}/${id}`;

      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypesWithBody) ?? "put";

      await delay(delayTime);
      const { data } = await httpClient[requestMethod](url, variables, {
        headers,
      });

      return {
        data,
      };
    },

    create: async ({ resource, variables, meta }) => {
      const url = `${API_PREFIX}/${resource}`;

      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypesWithBody) ?? "post";

      await delay(delayTime);
      const { data } = await httpClient[requestMethod](url, variables, {
        headers,
      });

      return {
        data,
      };
    },

    deleteOne: async ({ resource, id, variables, meta }) => {
      const url = `${API_PREFIX}/${resource}/${id}`;

      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypesWithBody) ?? "delete";

      await delay(delayTime);
      const { data } = await httpClient[requestMethod](url, {
        data: variables,
        headers,
      });

      return {
        data,
      };
    },

    getList: async ({ resource, pagination, sorters, filters, meta }) => {
      var url = `${API_PREFIX}/${resource}${
        pageablePrefix != "" ? `/${pageablePrefix}?` : "?"
      }`;

      const { headers: headersFromMeta, method } = meta ?? {};
      const requestMethod = (method as MethodTypes) ?? "get";

      const generatedPagination = generatePagination(pagination);
      if (generatedPagination) {
        url = `${url}${generatedPagination.toString()}`;
      }

      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        url = `${url}&${generatedSort.toString()}`;
      }

      const generatedFilters = generateFilters(filters);
      if (generatedFilters) {
        url = `${url}&${generatedFilters.toString()}`;
      }

      await delay(delayTime);

      const { data } = await httpClient[requestMethod](`${url}`, {
        headers: headersFromMeta,
      });

      return {
        data: data.content,
        total: data.totalElements,
      };
    },

    custom: async ({ url, method, filters, sorters, payload, query }) => {
      let requestUrl = `${API_PREFIX}/${url}?`;
      console.log(requestUrl);

      const sortQuery = generateSort(sorters);
      if (sortQuery) {
        requestUrl = `${requestUrl}&${sortQuery.toString()}`;
      }

      const filterQuery = generateFilters(filters);
      if (filterQuery) {
        requestUrl = `${requestUrl}&${filterQuery.toString()}`;
      }

      if (query) {
        var searchQueryParams = new URLSearchParams(query);
        requestUrl = `${requestUrl}&${searchQueryParams.toString()}`;
      }

      await delay(delayTime);
      let axiosResponse;
      switch (method) {
        case "get":
          axiosResponse = await httpClient[method](requestUrl);
          break;
        case "put":
        case "post":
        case "patch":
          axiosResponse = await httpClient[method](requestUrl, payload);
          break;
        case "delete":
          axiosResponse = await httpClient.delete(requestUrl, {
            data: payload,
          });
          break;
        default:
          axiosResponse = await httpClient.get(requestUrl);
          break;
      }

      const { data } = axiosResponse;

      return Promise.resolve({ data });
    },

    getApiUrl: () => `${API_BASE_URL}/${API_PREFIX}`,
  };
};

// convert Refine CrudOperators to the format that API accepts.
const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "ne":
    case "gte":
    case "lte":
      return `_${operator}`;
    case "contains":
      return "_like";
    case "eq":
    default:
      return "";
  }
};

// generate query string from Refine CrudFilters to the format that API accepts.
const generateFilters = (filters?: CrudFilters) => {
  if (!filters || filters.length == 0) return undefined;

  const queryFilters: { [key: string]: string } = {};

  filters.map((filter) => {
    if (filter.operator === "or" || filter.operator === "and") {
      throw new Error(
        `[@refinedev/simple-rest]: /docs/data/data-provider#creating-a-data-provider`
      );
    }

    if ("field" in filter) {
      const { field, operator, value } = filter;

      if (field === "q") {
        queryFilters[field] = value;
        return;
      }

      const mappedOperator = mapOperator(operator);
      queryFilters[`${field}${mappedOperator}`] = value;
    }
  });

  return new URLSearchParams(queryFilters);
};

// generate query string from Refine CrudSorting to the format that API accepts.
const generateSort = (sorters?: CrudSorting) => {
  if (!sorters || sorters.length == 0) return undefined;

  const _sort: string[] = [];
  const _order: string[] = [];

  sorters.map((item) => {
    _sort.push(item.field);
    _order.push(item.order);
  });

  const sort = _sort.join(",");
  const order = _order.join(",");

  return new URLSearchParams({
    _sort: sort,
    _order: order,
  });
};

// generate query string from Refine Pagination to the format that API accepts.
const generatePagination = (pagination?: Pagination) => {
  // pagination is optional on data hooks, so we need to set default values.
  const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

  const query: {
    page?: string;
    size?: string;
  } = {};

  if (mode === "server") {
    query.page = `${current - 1}`;
    query.size = `${pageSize}`;
  }

  return new URLSearchParams(query);
};
