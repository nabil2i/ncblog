import { useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../entities/User";
import userService from "../services/userService";
import { CACHE_KEY_USERS } from "./constants";
import { AxiosError } from "axios";

const useCreateUser = (
  onCreateUser: (user: User) => void,
  showToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation<User, AxiosError, User>({
    mutationFn: userService.post,

    onSuccess: (savedUser, newUser) => {
     onCreateUser(savedUser);
      showToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USERS] })
    },
    onError: (error: AxiosError, newPost, context) => {
      // Check if there's additional data in the error response
      const responseData = error.response?.data as string

      // Handle the error and show an error toast
      showErrorToast(responseData);
    },
  });

}

export default useCreateUser;
