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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
import { CACHE_KEY_POSTS } from "../../hooks/constants";
import Post from "../../entities/Post";
import { useRef } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

interface MyPost {
  title: string;
  body: string;
}
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Add a post",
      description: "Successfully added the post.",
      duration: 5000, // 5s
      isClosable: true,
      status: "success",
      position: "top",
      icon: <AddIcon />,
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Add a post",
      description: "An error occured while adding the post.",
      duration: 5000, // 5s
      isClosable: true,
      status: "error",
      position: "top",
      icon: <AddIcon />,
    });
  };

  const createPost = useMutation<MyPost, Error, MyPost>({
    mutationFn: (post: MyPost) =>
      axios
        .post<MyPost>("http://localhost:5000/api/posts", post)
        .then((res) => res.data),
    onSuccess: (savedPost, newPost) =>  {
      reset();
      showToast();
      // method 1 to update
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
      // method 2 to update with direct update of cache
      // queryClient.setQueryData<MyPost[]>([CACHE_KEY_POSTS], posts => [savedPost, ...(posts || [])])
      

      navigate("/admin/posts");
    },
    onError: () =>  {
      showErrorToast();
    }
  });

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
    <Box >

    {createPost.error &&
    <Alert mb="15px" mt="10px" status='error'>
      <AlertIcon />
      <AlertTitle>{createPost.error.name}</AlertTitle>
      <AlertDescription>{createPost.error.message}</AlertDescription>
    </Alert>}
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.title ? true : false} mb="40px">
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

      <FormControl isRequired isInvalid={errors.body ? true : false} mb="40px">
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
        {createPost.isLoading ? 'Creating a post...' : 'Create post' }
      </Button>
    </form>
          </Box>
    </>
  );
};

export default AddPostForm;
