import axios, {AxiosError, AxiosRequestConfig, CanceledError} from "axios";

export interface FetchResponse<T> {
  // locals: Locals;
  count: number;
  current: number;
  prev: number;
  next: number;
  perPage: number;
  results: T[];
}

const URL = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : process.env.API_BASE_URL;
const axiosInstance = axios.create({
  // baseURL: process.env.VITE_APP_API_BASE_URL
  // baseURL: 'http://localhost:5000/api'
  baseURL: URL
});

// // Axios Interceptor to handle error responses
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     // // Check if the error response has additional data
//     // const responseData = error?.response?.data;
    
//     // if (responseData && responseData.message) {
//     //   // Handle the error message or additional data here
//     //   console.error('Error Message:', responseData.message);
//     // }

//     // Propagate the error so that the useMutation onError callback can handle it
//     return Promise.reject(error);
//   }
// );

class APIClient<T, Q> {
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

  post = (data: Q) => {
    return axiosInstance
        .post<T>(this.endpoint, data)
        .then((res) => res.data);
        // .catch(error => {
        //   console.error('Error:', error);
        //   error.data;
        //   if (error.message) {
        //     // Extract and use the error message
        //     console.log('Error Message:', error.message);
        //   }
        // });
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
