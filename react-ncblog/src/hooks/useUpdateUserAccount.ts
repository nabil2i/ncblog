import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import User from "../entities/User";
import userAccountService from '../services/userAccountService';
import { FetchError, FetchResponse } from '../services/api-client';
import { CACHE_KEY_USER } from "./constants";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

const useUpdateUserAccount = (
  // userId: string,
  onSuccessUpdate: (data: FetchResponse<User>) => void,
  onErrorUpdate: (errorMessage: string) => void,
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
  
  return useMutation<FetchResponse<User>, AxiosError, User>({
    mutationFn: (data) => userAccountService.put(data, config),

    onSuccess: (savedUser: FetchResponse<User>) => {
     onSuccessUpdate(savedUser);
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] })
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as FetchError;
      const errorMessage = responseData.error.message

      // Handle the error and show an error toast
      onErrorUpdate(errorMessage);
    },
  });

}

export default useUpdateUserAccount;
