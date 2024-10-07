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
import {
  useAddNewPostMutation,
  useUpdatePostMutation,
} from "../../../app/features/posts/postsApiSlice";
import Post, { PostFormData } from "../../../entities/Post";
import useAuth from "../../../hooks/useAuth";
import AddPostImage from "../../common/AddPostImage";
import PostActions from "./PostActions";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { ContentState, EditorState, convertFromHTML } from "draft-js";
// import { stateToHTML } from "draft-js-export-html";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PostTitleEditor from "../../common/PostTitleEditor";
import { WambuiEditor } from "../../common/wambuieditor";

interface Props {
  post?: Post;
}

const PostForm = ({ post }: Props) => {
  const { _id } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmittingPost, setSubmittingPost] = useState(false);
  const toast = useToast();

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  // const [toolbarPosition, setToolbarPosition] = useState({
  //   top: 0,
  //   left: 0,
  //   display: "none",
  // });

  // useEffect(() => {
  //   if (post?.body) {
  //     // If updating a post, convert HTML to ContentState
  //     const blocksFromHTML = convertFromHTML(post.body);
  //     // const blocksFromHTML = HtmlToDraft(post.body);

  //     const state = ContentState.createFromBlockArray(
  //       blocksFromHTML.contentBlocks,
  //       blocksFromHTML.entityMap
  //     );
  //     setEditorState(EditorState.createWithContent(state));
  //   }
  // }, [post?.body]);
  // const [editorState, setEditorState] = useState(() => {
  //   if (post?.body) {
  //     // If updating a post, convert HTML to ContentState
  //     const blocksFromHTML = convertFromHTML(post.body);
  //     // const blocksFromHTML = HtmlToDraft(post.body);

  //     const state = ContentState.createFromBlockArray(
  //       blocksFromHTML.contentBlocks,
  //       blocksFromHTML.entityMap
  //     );
  //     return EditorState.createWithContent(state);
  //   } else {
  //     // For a new post, start with an empty editor state
  //     return EditorState.createEmpty();
  //   }
  // });

  // const handleEditorChange = (newEditorState: EditorState) => {
  //   setEditorState(newEditorState);
  //   const contentState = newEditorState.getCurrentContent();
  //   const html = stateToHTML(contentState);
  //   // const rawContentState = convertToRaw(contentState)
  //   // const html = stateToHTML(rawContentState)
  //   // console.log(html);
  //   setValue("body", html);
  //   // const contentState = convertToRaw(newEditorState.getCurrentContent());
  //   // Convert ContentState to HTML and update the form value

  //   // Calculate the position of the selected text
  //   const selection = window.getSelection();
  //   if (selection?.rangeCount) {
  //     const range = selection.getRangeAt(0).getBoundingClientRect();
  //     if (range.width > 0) {
  //       setToolbarPosition({
  //         top: range.top + window.scrollY - 100,
  //         left: range.left + window.scrollX,
  //         display: "block",
  //       });
  //     } else {
  //       setToolbarPosition((prev) => ({ ...prev, display: "none" }));
  //     }
  //   }
  // };

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
      console.log(data)
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
              maxW="1000px"
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

              {/* <Flex my={2} p={2} gap={4} align="center" border="dashed" borderWidth={2} borderRadius="4px">
                  <Input _hover={{ cursor: "pointer"}} pl={0} height="full" type="file" accept="image/*"/>
                  <Button>Upload image</Button>
                </Flex> */}
              <Box w="full">
                <AddPostImage setFieldValue={setValue} postImage={post?.img} />
              </Box>
              <Controller
                name="body"
                control={control}
                defaultValue={post?.body as string}
                render={({ field }) => (
                  <Box w="full" overflowWrap="break-word" mt={15}>
                    <WambuiEditor
                      placeholder={"Write here..."}
                      value={field.value}
                      handleEditorChange={field.onChange}
                    />
                    {/* <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={handleEditorChange}
                      placeholder="Write something..."
                      toolbarOnFocus={true}
                      toolbarStyle={{
                        // position: "sticky",
                        // bottom: 0,
                        // left: 0,
                        // width: "100%",
                        // zIndex: 1000,
                        // backgroundColor: "#fff",
                        // borderTop: "1px solid #ddd",
                        // padding: "10px",

                        // floating toolbar position
                        // position: "absolute",
                        // top: toolbarPosition.top,
                        // left: toolbarPosition.left,
                        // display: toolbarPosition.display,
                        position: "absolute",
                        top: `${toolbarPosition.top}px`,
                        left: `${toolbarPosition.left}px`,
                        display: toolbarPosition.display,
                        zIndex: 1000,
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        padding: "10px",
                      }} 
                    />*/}
                  </Box>

                  // <ReactQuill className="h-72 mb-12" theme="snow" placeholder="Start writing something..." {...field}/>
                  // <SimpleMDE
                  //   placeholder="Start writing something..."
                  //   {...field}
                  // />
                )}
              />
              <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
            </Flex>
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
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default PostForm;

// const createPost = useCreatePost(
//   () => {
//     // reset();
//     setSubmittingPost(false);
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
//     setSubmittingPost(false);
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
//     setSubmittingPost(false);
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
//     setSubmittingPost(false);
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
