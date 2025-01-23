import { API_BASE_URL, API_PREFIX, getAxios } from "./axios";

const defaultAxios = getAxios(true);
const authAxios = getAxios();

export { API_BASE_URL, API_PREFIX, defaultAxios, authAxios };
