import axios, {AxiosRequestConfig, CanceledError} from "axios";

export interface FetchResponse<T> {
  // locals: Locals;
  count: number;
  current: number;
  prev: number;
  next: number;
  perPage: number;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then(res => res.data);
  };

  get = (id: string) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id)
      .then(res => res.data);
  };

  post = (data: T) => {
    return axiosInstance
        .post<T>(this.endpoint, data)
        .then((res) => res.data);
  };

  put = (data: T) => {
    return axiosInstance
      .put<T>(this.endpoint, data)
      .then((res) => res.data);
  };

  delete = (id: string) => {
    return axiosInstance
      .delete<T>(this.endpoint + '/' + id)
      .then(res => res.data);
  };

}

export default APIClient;
