import environments from "@/environments/config";

interface HttpClientOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  body?: any;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function fetchRequest<T>(
  endpoint: string,
  method: HttpMethod,
  options: HttpClientOptions = {}
): Promise<T> {
  const url = buildUrl(endpoint, options.params);
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

async function fetchGet<T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T> {
  return fetchRequest<T>(endpoint, "GET", { params }).catch((e) => {
    throw Error(e);
  });
}

async function fetchPost<T>(endpoint: string, body: any): Promise<T> {
  return fetchRequest<T>(endpoint, "POST", { body });
}

async function fetchPut<T>(endpoint: string, body: any): Promise<T> {
  return fetchRequest<T>(endpoint, "PUT", { body });
}

async function fetchDelete<T>(endpoint: string): Promise<T> {
  return fetchRequest<T>(endpoint, "DELETE");
}

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number>
): string {
  const baseUrl = environments().baseApiPath;

  const url = new URL(`${baseUrl}/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
  }
  return url.toString();
}

export { fetchRequest, fetchGet, fetchPost, fetchPut, fetchDelete };
