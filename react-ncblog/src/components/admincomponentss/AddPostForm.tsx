import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

interface MyPost {
  title: string,
  body: string
}
interface FormData {
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
  const createPost = useMutation({
    mutationFn: (post: MyPost) =>
      axios
        .post('http://localhost:5000/api/posts', post)
        .then(res => res.data)
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  // } = useForm();
  } = useForm<FormData>();
  // } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    createPost.mutate({
      title: data.title,
      body: data.body
    });
  };

  return (
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
        isInvalid={errors.body ? true: false}
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
        disabled={!isValid}
        type="submit"
        colorScheme="green"
        isLoading={isSubmitting}
      >
        Create post
      </Button>
    </form>
  );
};

export default AddPostForm;
