/// <reference types="vite/client" />

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// interface ImportMeta {
//   env: Record<string, any>;
// }

export interface CustomAxiosError extends AxiosError {
  response: AxiosResponse<{
    data: { 
      message: string};
  }>;
}
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
  message: string;
  isError: boolean;
}

export interface ArrayData<S> {
  count: number;
  current?: number;
  prev?: number;
  next?: number;
  startIndex?: number;
  limit: number;
  results: S[];
  stats?: {
    totalItems?: number;
    lastMonthItems?: number
  }
}

export interface ArrayIndexData<S> {
  count: number;
  startIndex: number;
  limit: number;
  results: S[];
  stats?: {
    totalItems?: number;
    lastMonthItems?: number
  }
}

const URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL;
  
// const URL = import.meta.env.DEV
//   ? import.meta.env.VITE_API_BASE_URL
//   : process.env.API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = useSelector(selectCurrentToken);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// console.log(URL);

class APIClient<T, Q> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;

  }


  getAllItems = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then(res => res.data);
  };

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<ArrayData<T>>>(this.endpoint, config)
      .then(res => res.data);
  };

  get = (config?: AxiosRequestConfig, id?: string) => {
    const url = id ? `${this.endpoint}/${id}`: `${this.endpoint}`;
    return axiosInstance
      .get<FetchResponse<T>>(url, config)
      .then(res => res.data);
  };

  post = (data: Q, config?: AxiosRequestConfig) => {
    return axiosInstance
        .post<FetchResponse<T>>(this.endpoint, data, config)
        .then((res) => res.data);
  };

  put = (data: Q, config?: AxiosRequestConfig, itemId?: string) => {
    const url = itemId ? `${this.endpoint}/${itemId}`: `${this.endpoint}`;
    return axiosInstance
      .put<FetchResponse<T>>(url, data, config)
      .then((res) => res.data);
  };

  delete = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .delete<FetchResponse<T>>(this.endpoint, config)
      .then(res => res.data);
  };

  deleteItem = (config: AxiosRequestConfig, id: string, ) => {
    const url = id ? `${this.endpoint}/${id}`: `${this.endpoint}`;
  
    return axiosInstance
      .delete<FetchResponse<T>>(url, config)
      .then(res => res.data);
  };
  // delete = (id?: string, config?: AxiosRequestConfig, userId?: string) => {
  //   let url = id ? `${this.endpoint}/${id}`: `${this.endpoint}`;
  //   url = userId ? `${url}/${userId}` : `${url}`;
  
  //   return axiosInstance
  //     .delete<FetchResponse<T>>(url, config)
  //     .then(res => res.data);
  // };

}

export default APIClient;
