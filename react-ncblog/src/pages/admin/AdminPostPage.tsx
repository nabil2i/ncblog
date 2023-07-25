import { FormControl, Text, FormLabel, Input, FormErrorMessage, FormHelperText, Textarea, Button } from '@chakra-ui/react'
import React from 'react'
import usePost from '../../hooks/usePost';
import { useParams } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

export interface FormData {
  title: string;
  body: string;
}

const AdminPostPage = () => {
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
            value={post?.title || ''}
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
            value={post?.body || ''}
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

        <Button
          disabled={!isValid}
          type="submit"
          colorScheme="green"
          isLoading={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </>
  )
}

export default AdminPostPage