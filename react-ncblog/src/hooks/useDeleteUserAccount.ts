import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import { FetchError } from '../services/api-client';
import userAccountService from '../services/userAccountService';
import { CACHE_KEY_USER } from "./constants";

const useDeleteUserAccount = (
  // userId: string,
  onSuccessDelete: () => void,
  onErrorDelete: (errorMessage: string) => void,
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
  
  return useMutation({
    mutationFn: () => userAccountService.delete(config),

    onSuccess: () => {
      onSuccessDelete();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] })
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as FetchError;
      const errorMessage = responseData.message

      onErrorDelete(errorMessage);
    },
  });

}

export default useDeleteUserAccount;
