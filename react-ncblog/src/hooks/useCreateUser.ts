import { useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../entities/User";
import userService from "../services/userService";
import { CACHE_KEY_USERS } from "./constants";
import { AxiosError } from "axios";

//OPTIMISTIC
// interface CreatePostContext {
//   prevPosts: Post[]
// }

// const apiClient = new APIClient<Post>('/posts');



const useCreateUser = (
  // callback functions to pass control to AddPostForm
  onCreateUser: (user: User) => void,
  showToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation<User, AxiosError, User>({
    mutationFn: userService.post,
      // axios
      //   .post<MyPost>("http://localhost:5000/api/posts", post)
      //   .then((res) => res.data),

//OPTIMISTIC
    // // called before the mutation is executed 
    // onMutate: (newPost) => {
    //   // create context to store previous posts before update if doing optimistic update
    //   const prevPosts = queryClient.getQueryData<Post[]>([CACHE_KEY_POSTS]) || [];

    //   // console.log();

    //   queryClient.setQueryData<MyPost[]>([CACHE_KEY_POSTS], (posts) => [
    //     newPost,
    //     ...(posts || []),

    //   ]);

    //   // return context if doing optimistic update
    //   return { prevPosts };
    // },

    onSuccess: (savedUser, newUser) => {
     onCreateUser(savedUser);
      showToast();
      // method 1 to update
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USERS] })
      // method 2 to update with direct update of cache
      // queryClient.setQueryData<MyPost[]>([CACHE_KEY_POSTS], posts => [savedPost, ...(posts || [])])

//OPTIMISTIC
      // // if used the onMutate() for optimistic update then
      // queryClient.setQueryData<MyPost[]>([CACHE_KEY_POSTS], (posts) =>
      //   posts?.map((post) => 
      //     post === newPost ? savedPost : post
      //   )
      // );
      // navigate("/admin/posts");
    },
    onError: (error: AxiosError, newPost, context) => {
      // Check if there's additional data in the error response
      // const responseData = error.response?.data;
      // const responseData = error?.response?.data?.message
      const responseData = error.response?.data as string

      // Do something with responseData, if it's available
      // console.log('Message:', responseData);

      // Handle the error and show an error toast
      showErrorToast(responseData);

//OPTIMISTIC
      // // if used the onMutate() for optimistic update then
      // if (!context) return;
      // queryClient.setQueryData<Post[]>([CACHE_KEY_POSTS], context.prevPosts)
    },
  });

}

export default useCreateUser;
