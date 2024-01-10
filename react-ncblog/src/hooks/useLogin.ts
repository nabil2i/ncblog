import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import LoginData from "../entities/LoginData";
import User from "../entities/User";
import authService from "../services/authService";
import { CACHE_KEY_USERS } from "./constants";

const useLogin = (
  onLogin: (userData: User) => void,
  showSuccessToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation<User, AxiosError, LoginData>({
    mutationFn: authService.post,
    onSuccess: (userData: User) => {
     onLogin(userData);
      showSuccessToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USERS] })

    },
    onError: (error: AxiosError, newPost, context) => {

      const responseData = error.response?.data as string

      showErrorToast(responseData);
    },
  });

}

export default useLogin;
