import { FetchError, FetchResponse } from './../services/api-client';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import LoginData from "../entities/LoginData";
import User from "../entities/User";
import authService from "../services/authService";
import { CACHE_KEY_USER } from "./constants";

const useLogin = (
  onLogin: (userData: User) => void,
  showSuccessToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation<FetchResponse<User>, AxiosError, LoginData>({
    mutationFn: authService.post,
    onSuccess: (userData: FetchResponse<User>) => {
     onLogin(userData.data);
      showSuccessToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] })

    },
    onError: (error: AxiosError) => {

      const responseData = error.response?.data as FetchError
      const errorMessage = responseData.error.message

      showErrorToast(errorMessage);
    },
  });

}

export default useLogin;
