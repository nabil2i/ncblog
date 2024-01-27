import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "easymde/dist/easymde.min.css";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineMoreVert } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import {
  useAddNewPostMutation,
  useUpdatePostMutation,
} from "../../../app/features/posts/postsApiSlice";
import Post from "../../../entities/Post";
import AutoExpandingTextarea from "../../common/AutoExpandingTextarea";
import UpdatePostAction from "./UpdatePostAction";
import UpdatePostButton from "./UpdatePostButton";
import EditPostNav from "./EditPostNav";
import useAuth from "../../../hooks/useAuth";

export interface PostFormData {
  title: string;
  body: string;
  userId?: string;
}

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
    {
      isError: isErrorAdd,
      isLoading: isLoadingAdd,
      isSuccess: isSuccessAdd,
      error: addPostError,
    },
  ] = useAddNewPostMutation();
  const [
    updatePost,
    {
      isError: isErrorUpdate,
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
      error: updatePostError,
    },
  ] = useUpdatePostMutation();

  useEffect(() => {
    if (isSuccessAdd) {
      // reset();
      setSubimittingPost(false);
      navigate("/admin/posts/");
      toast({
        title: "Add a post",
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
        title: "Add a post",
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
      navigate("/admin/posts/");
      toast({
        title: "Update a post",
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
        title: "Update a post",
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
    formState: { errors },
  } = useForm<PostFormData>();

  const onSubmit = (data: PostFormData) => {
    // console.log(data);
    setSubimittingPost(true);
    if (post) {
      updatePost({
        id: post._id,
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
            <EditPostNav post={post} isSubmittingPost={isSubmittingPost}/>
            <Grid
              gap={2}
              templateAreas={{ base: `"side" "main"`, lg: `"main side"` }}
              templateColumns={{ base: "1fr", lg: "2f 1fr" }}
              pt={10} mx="auto" maxW="800px"
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
                  {/* <FormLabel variant="" htmlFor="title">
                    Post title:
                  </FormLabel> */}
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
                <Controller
                  name="body"
                  control={control}
                  defaultValue={post?.body as string}
                  render={({ field }) => (
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
