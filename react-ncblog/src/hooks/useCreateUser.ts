import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import User, { UserForm } from "../entities/User";
import userService from "../services/userService";
import { FetchError, FetchResponse } from './../services/api-client';
import { CACHE_KEY_USER } from './constants';


const useCreateUser = (
  // userId: string,
  onSuccessCreate: (data?: FetchResponse<User>) => void,
  onErrorCreate: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation<FetchResponse<User>, AxiosError, UserForm>({
    mutationFn: userService.post,

    onSuccess: (savedUser: FetchResponse<User>) => {
     onSuccessCreate(savedUser);
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] })
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as FetchError;
      const errorMessage = responseData.message

      onErrorCreate(errorMessage);
    },
  });

}

export default useCreateUser;
