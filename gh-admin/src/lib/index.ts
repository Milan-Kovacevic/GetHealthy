import { API_BASE_URL, API_PREFIX, getAxios } from "./axios";

const defaultAxios = getAxios(true);

export { API_BASE_URL, API_PREFIX, defaultAxios };
