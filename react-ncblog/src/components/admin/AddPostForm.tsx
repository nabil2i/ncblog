import { AddIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import useCreatePost from "../../hooks/useCreatePost";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// if doing optimistic update
// interface CreatePostContext {
//   prevPosts: Post[]

// }
export interface FormData {
  title: string;
  body: string;
}
// const schema = z.object({
//   title: z
//     .string()
//     .min(20, { message: "Title must be at least 20 characters." }),
//   body: z.string().min(50, { message: "Body must be at least 50 characters." }),
// });

// type FormData = z.infer<typeof schema>;

const AddPostForm = () => {
  // const navigate = useNavigate();
  const toast = useToast();
  const createPost = useCreatePost(
    () => {
      reset();
    },
    () => {
      toast({
        title: "Add a post",
        description: "Successfully added the post.",
        duration: 5000, // 5s
        isClosable: true,
        status: "success",
        position: "top",
        icon: <AddIcon />,
      });
    },
    () => {
      toast({
        title: "Add a post",
        description: "An error occured while adding the post.",
        duration: 5000, // 5s
        isClosable: true,
        status: "error",
        position: "top",
        icon: <AddIcon />,
      });
    }
  );
  // const queryClient = useQueryClient();

  // const showToast = () => {
  //   toast({
  //     title: "Add a post",
  //     description: "Successfully added the post.",
  //     duration: 5000, // 5s
  //     isClosable: true,
  //     status: "success",
  //     position: "top",
  //     icon: <AddIcon />,
  //   });
  // };

  // const showErrorToast = () => {
  //   toast({
  //     title: "Add a post",
  //     description: "An error occured while adding the post.",
  //     duration: 5000, // 5s
  //     isClosable: true,
  //     status: "error",
  //     position: "top",
  //     icon: <AddIcon />,
  //   });
  // };

  // const createPost = useMutation<MyPost, Error, MyPost, CreatePostContext>({
  //   mutationFn: (post: MyPost) =>
  //     axios
  //       .post<MyPost>("http://localhost:5000/api/posts", post)
  //       .then((res) => res.data),
  //   // called before the mutation is executed
  //   onMutate: (newPost) => {
  //     // create context to store previous posts before update if doing optimistic update
  //     const prevPosts = queryClient.getQueryData<Post[]>([CACHE_KEY_POSTS]) || [];

  //     // console.log();

  //     queryClient.setQueryData<MyPost[]>([CACHE_KEY_POSTS], (posts) => [
  //       newPost,
  //       ...(posts || []),
  //     ]);

  //     // return context if doing optimistic update
  //     return { prevPosts };
  //   },
  //   onSuccess: (savedPost, newPost) => {
  //     reset();
  //     showToast();
  //     // method 1 to update
  //     // queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
  //     // method 2 to update with direct update of cache
  //     // queryClient.setQueryData<MyPost[]>([CACHE_KEY_POSTS], posts => [savedPost, ...(posts || [])])

  //     // if used the onMutate() for optimistic update then
  //     queryClient.setQueryData<MyPost[]>([CACHE_KEY_POSTS], (posts) =>
  //       posts?.map((post) =>
  //         post === newPost ? savedPost : post
  //       )
  //     );
  //     navigate("/admin/posts");
  //   },
  //   onError: (error, newPost, context) => {
  //     showErrorToast();

  //     // if used the onMutate() for optimistic update then
  //     if (!context) return;
  //     queryClient.setQueryData<Post[]>([CACHE_KEY_POSTS], context.prevPosts)
  //   },
  // });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
    // } = useForm();
  } = useForm<FormData>();
  // } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    // console.log(data);
    if (data && data.title && data.body)
      createPost.mutate({
        title: data.title,
        body: data.body,
      });
  };

  return (
    <>
      <Box>
        {createPost.error && (
          <Alert mb="15px" mt="10px" status="error">
            <AlertIcon />
            <AlertTitle>{createPost.error.name}</AlertTitle>
            <AlertDescription>{createPost.error.message}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isRequired
            isInvalid={errors.title ? true : false}
            mb="40px"
          >
            <FormLabel htmlFor="title">Post title:</FormLabel>
            <Input
              id="title"
              type="text"
              // name="title"
              placeholder="title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 20,
                  message: "Title must be at least 20 characters.",
                },
              })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
            <FormHelperText>Enter the title of the post</FormHelperText>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={errors.body ? true : false}
            mb="40px"
          >
            <FormLabel htmlFor="body">Post content:</FormLabel>
            <Textarea
              id="body"
              // name="title"
              minH={300}
              placeholder="Write something..."
              {...register("body", {
                required: "Body is required",
                minLength: {
                  value: 50,
                  message: "Body must be at least 50 characters.",
                },
              })}
            />
            <FormErrorMessage>
              {errors.body && errors.body.message}
            </FormErrorMessage>
            <FormHelperText>Write the content of the post</FormHelperText>
          </FormControl>

          <Button
            disabled={createPost.isLoading}
            type="submit"
            colorScheme="green"
            isLoading={isSubmitting}
          >
            {createPost.isLoading ? "Creating a post..." : "Create post"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddPostForm;
