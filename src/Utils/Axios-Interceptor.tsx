import axios, { AxiosRequestConfig } from "axios";
import { SortResponse } from "./AxiosRespons";

const baseUrl = import.meta.env.VITE_BASE_URL;
const client = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const request = async (Options: AxiosRequestConfig) => {
  return client(Options).then(SortResponse).catch(SortResponse);
};

export { request };
