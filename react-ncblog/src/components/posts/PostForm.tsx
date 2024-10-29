import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
// import "easymde/dist/easymde.min.css";
// import SimpleMDE from "react-simplemde-editor";

import PostActions from "./PostActions";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { ContentState, EditorState, convertFromHTML } from "draft-js";
// import { stateToHTML } from "draft-js-export-html";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Post, { PostFormData } from "../../entities/Post";
import useAuth from "../../hooks/useAuth";
import { useAddNewPostMutation, useUpdatePostMutation } from "../../app/features/posts/postsApiSlice";
import PostTitleEditor from "../common/PostTitleEditor";
import AddPostImage from "../common/AddPostImage";
import { WambuiEditor } from "../common/wambuieditor";


interface Props {
  post?: Post;
}

const PostForm = ({ post }: Props) => {
  const { _id } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmittingPost, setSubmittingPost] = useState(false);
  const toast = useToast();

  console.log("Load post: ", post)

  const [
    addNewPost,
    {
      isError: isErrorAdd,
      isSuccess: isSuccessAdd,
      error: addPostError
    },
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
      setSubmittingPost(false);
      navigate("/myposts");
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
      setSubmittingPost(false);
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
      setSubmittingPost(false);
      navigate("/myposts");
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
      setSubmittingPost(false);
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
    formState: { errors },
  } = useForm<PostFormData>();

  const onSubmit = (data: PostFormData) => {
    // const formData = getValues();
    // console.log("data", formData);
    setSubmittingPost(true);
    if (post) {
      // console.log(data)
      // console.log(post)
      updatePost({
        ...data,
        id: post._id,
        title: data.title,
        body: data.body,
        postAuthorId: post.postAuthorId?._id,
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
        postAuthorId: _id,
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
      <Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex display="column">
            <PostActions
              post={post}
              isSubmittingPost={isSubmittingPost}
              setFieldValue={setValue}
            />

            <Flex
              p={4}
              pt={"60px"}
              w="full"
              direction="column"
              mx="auto"
              maxW="800px"
              align="center"
            >
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
                mb="00px"
              >
                <PostTitleEditor
                  id={"title"}
                  content={post?.title as string}
                  placeholder="Add title"
                  register={register}
                  setFieldValue={setValue}
                />
                {/* <AutoExpandingTextarea
                    id={"title"}
                    defaultValue={post?.title as string}
                    placeholder="Add title"
                    register={register}
                    setFieldValue={setValue}
                  /> */}
                {/* <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage> */}
              </FormControl>

              <Box w="full">
                <AddPostImage setFieldValue={setValue} postImage={post?.img} />
              </Box>
              <Controller
                name="body"
                control={control}
                defaultValue={post?.body || ""}
                render={({ field }) => (
                  <Box w="full" overflowWrap="break-word" mt={15}>
                    <WambuiEditor
                      placeholder={"Write here..."}
                      value={field.value || ""}
                      handleEditorChange={field.onChange}
                    />
                  </Box>
                )}
              />
              <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default PostForm;
