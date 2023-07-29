import { useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../entities/User";
import authService from "../services/authService";
import { CACHE_KEY_USERS } from "./constants";
import { AxiosError } from "axios";
import TokenObj from "../entities/TokenObj";
import UserData from "../entities/UserData";


const useLogin = (
  onLogin: (userData: UserData) => void,
  showToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation<TokenObj, AxiosError, TokenObj>({
    mutationFn: authService.post,
    onSuccess: (userData) => {
     onLogin(userData);
      showToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USERS] })

    },
    onError: (error: AxiosError, newPost, context) => {

      const responseData = error.response?.data as string

      showErrorToast(responseData);
    },
  });

}

export default useLogin;
