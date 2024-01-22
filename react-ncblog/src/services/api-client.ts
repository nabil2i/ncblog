/// <reference types="vite/client" />

import axios, { AxiosRequestConfig } from "axios";
// interface ImportMeta {
//   env: Record<string, any>;
// }
export interface FetchResponse<R> {
  success: boolean;
  data: R;
  message?: string;
}
export interface FetchError {
  success: boolean;
  error: {
    code: number;
    message: string;
  }
}

export interface ArrayData<S> {
  count: number;
  current: number;
  prev: number;
  next: number;
  perPage: number;
  results: S[];
}

const URL = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : process.env.API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

console.log(URL + '/api');

class APIClient<T, Q> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<ArrayData<T>>>(this.endpoint, config)
      .then(res => res.data);
  };

  get = (id: string) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint + '/' + id)
      .then(res => res.data);
  };

  post = (data: Q) => {
    return axiosInstance
        .post<FetchResponse<T>>(this.endpoint, data)
        .then((res) => res.data);
  };

  put = (data: Q) => {
    return axiosInstance
      .put<FetchResponse<T>>(this.endpoint, data)
      .then((res) => res.data);
  };

  delete = (id: string) => {
    return axiosInstance
      .delete<FetchResponse<T>>(this.endpoint + '/' + id)
      .then(res => res.data);
  };

}

export default APIClient;
