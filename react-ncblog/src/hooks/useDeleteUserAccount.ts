import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FetchError } from '../services/api-client';
import userAccountService from '../services/userAccountService';
import { CACHE_KEY_USER } from "./constants";

const useDeleteUserAccount = (
  // userId: string,
  onDeleteAccount: () => void,
  showToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userAccountService.delete,

    onSuccess: (savedUser, newUser) => {
      onDeleteAccount();
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

export default useDeleteUserAccount;
