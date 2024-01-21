import { FetchError, FetchResponse } from './../services/api-client';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import User from "../entities/User";
import userService from "../services/userService";
import { CACHE_KEY_USER } from './constants';


const useCreateUser = (
  // userId: string,
  onCreateUser: (user: User) => void,
  showToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation<FetchResponse<User>, AxiosError, User>({
    mutationFn: userService.post,

    onSuccess: (savedUser: FetchResponse<User>, newUser) => {
     onCreateUser(savedUser.data);
      showToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] })
    },
    onError: (error: AxiosError, newUser, context) => {
      const responseData = error.response?.data as FetchError;
      const errorMessage = responseData.error.message

      // Handle the error and show an error toast
      showErrorToast(errorMessage);
    },
  });

}

export default useCreateUser;
