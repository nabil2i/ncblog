import { FormControl, Text, FormLabel, Input, FormErrorMessage, FormHelperText, Textarea, Button, Flex, Spacer, useToast } from '@chakra-ui/react'
import React from 'react'
import usePost from '../../hooks/usePost';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import MyPost from '../../entities/MyPost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { CACHE_KEY_POSTS } from '../../hooks/constants';

export interface FormData {
  title: string;
  body: string;
}

const AdminPostPage = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isLoading, error } = usePost(id as string);
  
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  // } = useForm();
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    // createPost.mutate({
    //   title: data.title,
    //   body: data.body,
    // });
  };

  const updatePost = useMutation<MyPost, Error, MyPost>({
    mutationFn: (post: MyPost) =>
      axios
        .put<MyPost>("http://localhost:5000/api/posts", post)
        .then((res) => res.data),
    onSuccess: (savedPost, newPost) =>  {
      showPutToast();
      // method 1 to update
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
      // method 2 to update with direct update of cache
      // queryClient.setQueryData<MyPost[]>([CACHE_KEY_POSTS], posts => [savedPost, ...(posts || [])])
      

      navigate("/admin/posts");
    },
    onError: () =>  {
      showPutErrorToast();
    }
  });

  const triggerDeletePost = (postId: string) => {
    // console.log(postId);
    if (postId)
    deletePost.mutate(postId)
  }

  const deletePost = useMutation({
    mutationFn: (postId: string) =>
      // console.log("deleting..."); return;
      axios
        .delete(`http://localhost:5000/api/posts/${postId}`)
        .then(res => res.data),
    onSuccess: () => {
      showDeleteToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
    },
    onError: () =>  {
      showDeleteErrorToast();
    }
  });

  const showPutToast = () => {
    toast({
      title: "Add a post",
      description: "Successfully added the post.",
      duration: 5000, // 5s
      isClosable: true,
      status: "success",
      position: "top",
      icon: <EditIcon />,
    });
  };

  const showPutErrorToast = () => {
    toast({
      title: "Add a post",
      description: "An error occured while adding the post.",
      duration: 5000, // 5s
      isClosable: true,
      status: "error",
      position: "top",
      icon: <EditIcon />,
    });
  };

  const showDeleteToast = () => {
    toast({
      title: "Delete a post",
      description: "Successfully deleted the post.",
      duration: 5000, // 5s
      isClosable: true,
      status: "success",
      position: "top",
      icon: <DeleteIcon />,
    });
  };

  const showDeleteErrorToast = () => {
    toast({
      title: "Delete a post",
      description: "An error occured while deleting the post.",
      duration: 5000, // 5s
      isClosable: true,
      status: "error",
      position: "top",
      icon: <DeleteIcon />,
    });
  };
  
  return (
    <>
     {error && <Text> We encountered a problem.</Text>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isRequired
          isInvalid={errors.title ? true: false}
          mb="40px"
        >
          <FormLabel htmlFor="title">Post title:</FormLabel>
          <Input
            id="title"
            type="text"
            // name="title"
            defaultValue={post?.title || ''}
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
          isInvalid={errors.body ? true: false}
          mb="40px"
        >
          <FormLabel htmlFor="body">Post content:</FormLabel>
          <Textarea
            id="body"
            // name="title"
            minH={300}
            defaultValue={post?.body || ''}
            // defaultValue={post?.body || ''}
            // placeholder="Write something..."
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
        <Flex gap="5">
          <Spacer/>
        <Button
          disabled={!isValid}
          // type="submit"
          colorScheme="green"
          isLoading={isSubmitting}
        >
          Edit post
        </Button>

        <Button
          disabled={!isValid}
          // type="submit"
          onClick={() => triggerDeletePost(id as string)}
          colorScheme="red"
          isLoading={isSubmitting}
        >
          Delete post
        </Button>

        </Flex>
      </form>
    </>
  )
}

export default AdminPostPage