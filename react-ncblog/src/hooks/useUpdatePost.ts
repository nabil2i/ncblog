import { useMutation, useQueryClient } from "@tanstack/react-query";
import Post from "../entities/Post";
import { CACHE_KEY_POSTS } from "./constants";
import APIClient from "../services/api-client";

//OPTIMISTIC
// interface CreatePostContext {
//   prevPosts: Post[]
// }



const useUpdatePost = (id: string,
  // callback functions to pass control to AddPostForm
  onUpdatePost: () => void,
  showToast: () => void,
  showErrorToast: () => void,
  ) => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<Post>(`/posts/${id}`);
  
  return useMutation<Post, Error, Post>({
    mutationFn:  apiClient.put,
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

    onSuccess: (savedPost, newPost) => {
     onUpdatePost();
      showToast();
      // method 1 to update
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
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
    onError: (error, newPost, context) => {
      showErrorToast();

//OPTIMISTIC
      // // if used the onMutate() for optimistic update then
      // if (!context) return;
      // queryClient.setQueryData<Post[]>([CACHE_KEY_POSTS], context.prevPosts)
    },
  });
}

export default useUpdatePost;
