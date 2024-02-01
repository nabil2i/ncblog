import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import "easymde/dist/easymde.min.css";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import {
  useAddNewPostMutation,
  useUpdatePostMutation,
} from "../../../app/features/posts/postsApiSlice";
import Post, { PostFormData } from "../../../entities/Post";
import useAuth from "../../../hooks/useAuth";
import AutoExpandingTextarea from "../../common/AutoExpandingTextarea";
import AddPostImage from "./AddPostImage";
import PostActions from "./PostActions";

interface Props {
  post?: Post;
}

const PostForm = ({ post }: Props) => {
  const { _id } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmittingPost, setSubimittingPost] = useState(false);
  const toast = useToast();

  const [
    addNewPost,
    { isError: isErrorAdd, isSuccess: isSuccessAdd, error: addPostError },
  ] = useAddNewPostMutation();
  const [
    updatePost,
    {
      isError: isErrorUpdate,
      isSuccess: isSuccessUpdate,
      error: updatePostError,
    },
  ] = useUpdatePostMutation();

  useEffect(() => {
    if (isSuccessAdd) {
      // reset();
      setSubimittingPost(false);
      navigate("/dashboard?tab=posts");
      toast({
        title: "",
        description: "Successfully added the post.",
        duration: 5000, // 5s
        isClosable: true,
        status: "success",
        position: "top",
        icon: <AddIcon />,
      });
    }

    if (isErrorAdd) {
      setSubimittingPost(false);
      setError("Could not add the post");
      // setError(addPostError);
      toast({
        title: "",
        description: "An error occured while adding the post.",
        duration: 5000, // 5s
        isClosable: true,
        status: "error",
        position: "top",
        icon: <AddIcon />,
      });
    }

    if (isSuccessUpdate) {
      setSubimittingPost(false);
      navigate("/dashboard?tab=posts");
      toast({
        title: "",
        description: "Successfully updated the post.",
        duration: 5000, // 5s
        isClosable: true,
        status: "success",
        position: "top",
        icon: <EditIcon />,
      });
    }

    if (isErrorUpdate) {
      setSubimittingPost(false);
      setError("Could not update the post");
      // setError(updatePostError);
      toast({
        title: "",
        description: "An error occured while updating the post.",
        duration: 5000, // 5s
        isClosable: true,
        status: "error",
        position: "top",
        icon: <EditIcon />,
      });
    }
  }, [
    isErrorAdd,
    isErrorUpdate,
    isSuccessAdd,
    isSuccessUpdate,
    navigate,
    toast,
  ]);

  const {
    handleSubmit,
    register,
    control,
    // reset,
    setValue,
    // getValues,
    formState: { errors,  },
  } = useForm<PostFormData>();

  const onSubmit = (data: PostFormData) => {
    // const formData = getValues();
    // console.log("data", formData);
    setSubimittingPost(true);
    if (post) {
      updatePost({
        ...data,
        title: data.title,
        body: data.body,
        userId: post.user?._id,
      });
      // updatePost.mutate({
      //   title: data.title,
      //   body: data.body,
      //   userId: post?.user?._id,
      // });
    } else {
      addNewPost({
        ...data,
        title: data.title,
        body: data.body,
        userId: _id,
      });
      // createPost.mutate({
      //   title: data.title,
      //   body: data.body,
      //   userId: state.user?._id,
      // });
    }
  };

  return (
    <>
      <Box>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PostActions post={post} isSubmittingPost={isSubmittingPost} setFieldValue={setValue}/>
            <Grid
              gap={2}
              templateAreas={{ base: `"side" "main"`, lg: `"main side"` }}
              templateColumns={{ base: "1fr", lg: "2f 1fr" }}
              pt={10}
              mx="auto"
              maxW="800px"
            >
              <GridItem area="main" p={4}>
                {addPostError && (
                  <Alert mb="15px" mt="10px" status="error">
                    <AlertIcon />
                    <AlertTitle></AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {updatePostError && (
                  <Alert mb="15px" mt="10px" status="error">
                    <AlertIcon />
                    <AlertTitle></AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <FormControl
                  isRequired
                  isInvalid={errors.title ? true : false}
                  mb="40px"
                >
                  <AutoExpandingTextarea
                    id={"title"}
                    defaultValue={post?.title as string}
                    placeholder="Add title"
                    register={register}
                    setFieldValue={setValue}
                  />
                  {/* <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage> */}
                </FormControl>

                {/* <Flex my={2} p={2} gap={4} align="center" border="dashed" borderWidth={2} borderRadius="4px">
                  <Input _hover={{ cursor: "pointer"}} pl={0} height="full" type="file" accept="image/*"/>
                  <Button>Upload image</Button>
                </Flex> */}
                <AddPostImage setFieldValue={setValue} />
                <Controller
                  name="body"
                  control={control}
                  defaultValue={post?.body as string}
                  render={({ field }) => (
                    // <ReactQuill className="h-72 mb-12" theme="snow" placeholder="Start writing something..." {...field}/>
                    <SimpleMDE
                      placeholder="Start writing something..."
                      {...field}
                    />
                  )}
                />
                <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
              </GridItem>
              {/* <GridItem
                area="side"
                p={4}
                position={{ base: "fixed", lg: "sticky" }}
                top={{ lg: 0 }}
                alignSelf={{ lg: "flex-start" }}
              >
                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  gap="4"
                >
                  <UpdatePostButton
                    isSubmittingPost={isSubmittingPost}
                    post={post}
                  />
                </Flex>
              </GridItem> */}
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default PostForm;

// const createPost = useCreatePost(
//   () => {
//     // reset();
//     setSubimittingPost(false);
//     navigate("/admin/posts/");
//   },
//   () => {
//     toast({
//       title: "Add a post",
//       description: "Successfully added the post.",
//       duration: 5000, // 5s
//       isClosable: true,
//       status: "success",
//       position: "top",
//       icon: <AddIcon />,
//     });
//   },
//   (errorMessage) => {
//     setSubimittingPost(false);
//     setError(errorMessage);
//     // toast({
//     //   title: "Add a post",
//     //   description: "An error occured while adding the post.",
//     //   duration: 5000, // 5s
//     //   isClosable: true,
//     //   status: "error",
//     //   position: "top",
//     //   icon: <AddIcon />,
//     // });
//   }
// );
// const updatePost = useUpdatePost(
//   post?._id as string,
//   () => {
//     // reset();
//     setSubimittingPost(false);
//     navigate("/admin/posts/");
//   },
//   () => {
//     toast({
//       title: "Update a post",
//       description: "Successfully updated the post.",
//       duration: 5000, // 5s
//       isClosable: true,
//       status: "success",
//       position: "top",
//       icon: <AddIcon />,
//     });
//   },
//   (errorMessage) => {
//     setSubimittingPost(false);
//     setError(errorMessage);
//     // toast({
//     //   title: "Update a post",
//     //   description: "An error occured while adding the post.",
//     //   duration: 5000, // 5s
//     //   isClosable: true,
//     //   status: "error",
//     //   position: "top",
//     //   icon: <AddIcon />,
//     // });
//   }
// );
