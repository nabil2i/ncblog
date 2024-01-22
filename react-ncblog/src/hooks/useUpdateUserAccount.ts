import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import User from "../entities/User";
import userAccountService from '../services/userAccountService';
import { FetchError, FetchResponse } from '../services/api-client';
import { CACHE_KEY_USER } from "./constants";

const useUpdateUserAccount = (
  // userId: string,
  onUpdateUser: (user: User) => void,
  showToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation<FetchResponse<User>, AxiosError, User>({
    mutationFn: userAccountService.put,

    onSuccess: (savedUser: FetchResponse<User>) => {
     onUpdateUser(savedUser.data);
      showToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] })
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as FetchError;
      const errorMessage = responseData.error.message

      // Handle the error and show an error toast
      showErrorToast(errorMessage);
    },
  });

}

export default useUpdateUserAccount;
