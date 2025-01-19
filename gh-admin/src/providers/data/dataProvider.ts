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
      const requestMethod = (method as MethodTypesWithBody) ?? "patch";

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
      const url = `${API_PREFIX}/${resource}${
        pageablePrefix != "" ? `/${pageablePrefix}` : ""
      }`;

      const { headers: headersFromMeta, method } = meta ?? {};
      const requestMethod = (method as MethodTypes) ?? "get";

      // init query object for pagination and sorting
      const query: {
        page?: string;
        size?: string;
        _sort?: string;
        _order?: string;
      } = {};

      const generatedPagination = generatePagination(pagination);
      if (generatedPagination) {
        const { page, size } = generatedPagination;
        query.page = page;
        query.size = size;
      }

      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        // const { _sort, _order } = generatedSort;
        // query._sort = _sort.join(",");
        // query._order = _order.join(",");
      }
      const queryFilters = generateFilter(filters);

      await delay(delayTime);

      const generatedQuery = new URLSearchParams({
        ...query,
      });
      const generatedQueryFilters = new URLSearchParams({
        ...queryFilters,
      });

      const { data } = await httpClient[requestMethod](
        `${url}?${generatedQuery.toString()}&${generatedQueryFilters.toString()}`,
        {
          headers: headersFromMeta,
        }
      );

      return {
        data: data.content,
        total: data.totalElements,
      };
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
const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};

  if (filters) {
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
  }

  return queryFilters;
};

// generate query string from Refine CrudSorting to the format that API accepts.
const generateSort = (sorters?: CrudSorting) => {
  if (sorters && sorters.length > 0) {
    const _sort: string[] = [];
    const _order: string[] = [];

    sorters.map((item) => {
      _sort.push(item.field);
      _order.push(item.order);
    });

    return {
      _sort,
      _order,
    };
  }

  return;
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

  return query;
};
