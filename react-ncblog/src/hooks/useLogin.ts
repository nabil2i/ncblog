import { FetchError, FetchResponse } from './../services/api-client';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import User, { LoginData } from "../entities/User";
import authService from "../services/authService";
import { CACHE_KEY_USER } from "./constants";
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';

const useLogin = (
  onSuccessLogin: (userData: User) => void,
  onErrorLogin: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  
  return useMutation<FetchResponse<User>, AxiosError, LoginData>({
    mutationFn: (data) => authService.post(data, config),
    onSuccess: (userData: FetchResponse<User>) => {
     onSuccessLogin(userData.data);
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] })

    },
    onError: (error: AxiosError) => {

      const responseData = error.response?.data as FetchError
      const errorMessage = responseData.error.message

      onErrorLogin(errorMessage);
    },
  });

}

export default useLogin;
