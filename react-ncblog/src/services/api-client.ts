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

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id)
      .then(res => res.data);
  };


}

export default APIClient;
