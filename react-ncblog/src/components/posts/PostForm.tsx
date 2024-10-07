import { AddIcon } from "@chakra-ui/icons";
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
import "easymde/dist/easymde.min.css";
import ms from "ms";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Post, { PostFormData } from "../../entities/Post";
import useAuth from "../../hooks/useAuth";
import useCreatePost from "../../hooks/useCreatePost";
import useUpdateUserPost from "../../hooks/useUpdateUserPost";
import AddPostImage from "../common/AddPostImage";
// import AutoExpandingTextarea from "../common/AutoExpandingTextarea";
import PostActions from "./PostActions";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "easymde/dist/easymde.min.css";
// import SimpleMDE from "react-simplemde-editor";
// import 'draft-js/dist/Draft.css';

// import { ContentState, EditorState, convertFromHTML } from "draft-js";
// import { stateToHTML } from "draft-js-export-html";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import draftToHtml from 'draftjs-to-html';
// import HtmlToDraft from 'html-to-draftjs';

import PostTitleEditor from "../common/PostTitleEditor";
import { WambuiEditor } from "../common/wambuieditor";

// import {DanteEditor } from "dante3";

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

  // const [isMobile] = useMediaQuery("(max-width: 768px)");
  // const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // // toolbar position
  // const [toolbarPosition, setToolbarPosition] = useState({
  //   top: 0,
  //   left: 0,
  //   display: "none",
  // });

  // useEffect(() => {
  //   if (post?.body) {
  //     setValue("body", post.body);
  //     // // If updating a post, convert HTML to ContentState
  //     // const blocksFromHTML = convertFromHTML(post.body);
  //     // // const blocksFromHTML = HtmlToDraft(post.body);

  //     // const state = ContentState.createFromBlockArray(
  //     //   blocksFromHTML.contentBlocks,
  //     //   blocksFromHTML.entityMap
  //     // );
  //     // setEditorState(EditorState.createWithContent(state));
  //   }

  //   // // Detect keyboard visibility (basic example)
  //   // const handleResize = () => {
  //   //   if (isMobile && window.innerHeight < 500) {
  //   //     setKeyboardVisible(true);
  //   //   } else {
  //   //     setKeyboardVisible(false);
  //   //   }
  //   // };

  //   // window.addEventListener("resize", handleResize);
  //   // return () => window.removeEventListener("resize", handleResize);
  // // }, [isMobile, post?.body]);
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

  //   // // Calculate the position of the selected text
  //   // const selection = window.getSelection();
  //   // if (selection?.rangeCount) {
  //   //   const range = selection.getRangeAt(0).getBoundingClientRect();
  //   //   if (range.width > 0) {
  //   //     setToolbarPosition({
  //   //       top: range.top + window.scrollY - 50,
  //   //       left: range.left + window.scrollX,
  //   //       display: "block",
  //   //     });
  //   //   } else {
  //   //     setToolbarPosition((prev) => ({ ...prev, display: "none" }));
  //   //   }
  //   // }
  // };

  const createPost = useCreatePost(
    () => {
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
    },
    (errorMessage) => {
      setSubmittingPost(false);
      setError(errorMessage);
      // toast({
      //   title: "Add a post",
      //   description: "An error occured while adding the post.",
      //   duration: 5000, // 5s
      //   isClosable: true,
      //   status: "error",
      //   position: "top",
      //   icon: <AddIcon />,
      // });
    }
  );
  // const updatePost = useUpdatePost(
  const updatePost = useUpdateUserPost(
    post?._id as string,
    post?.postAuthorId?._id as string,
    () => {
      // reset();
      setSubmittingPost(false);
      toast({
        title: "",
        description: "Successfully updated the post.",
        duration: ms("5s"),
        isClosable: true,
        status: "success",
        position: "top",
        icon: <AddIcon />,
      });
      navigate("/myposts/");
    },
    (errorMessage) => {
      setSubmittingPost(false);
      setError(errorMessage);
      // toast({
      //   title: "",
      //   description: "An error occured while adding the post.",
      //   duration: 5000,
      //   isClosable: true,
      //   status: "error",
      //   position: "top",
      //   icon: <AddIcon />,
      // });
    }
  );

  const {
    handleSubmit,
    register,
    control,
    // reset,
    // getValues,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>();
  // } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (post?.body) {
      console.log(post.body)
      setValue("body", post.body);
    }
  }, [post?.body, setValue]);

  const onSubmit = (data: PostFormData) => {
    // const formaData = getValues();
    console.log("data", data);

    setSubmittingPost(true);
    if (post) {
      updatePost.mutate({
        ...data,
        title: data.title,
        body: data.body,
        userId: post?.postAuthorId?._id,
      });
    } else {
      createPost.mutate({
        ...data,
        title: data.title,
        body: data.body,
        userId: _id,
      });
    }
  };
  // const { isOpen, onClose } = useDisclosure();
  // const icnRef = React.useRef();

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
              w="full"
              direction="column"
              mx="auto"
              maxW="1000px"
              align="center"
            >
              {createPost.error && (
                <Alert mb="15px" mt="10px" status="error">
                  <AlertIcon />
                  <AlertTitle></AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {updatePost.error && (
                <Alert mb="15px" mt="10px" status="error">
                  <AlertIcon />
                  <AlertTitle></AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <FormControl
                isRequired
                isInvalid={errors.title ? true : false}
                mb="0px"
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
              <Controller // manage the editor's state
                name="body"
                control={control}
                defaultValue={post?.body as string}
                render={({ field }) => (
                  <Box w="full" overflowWrap="break-word" mt={15}>
                    <WambuiEditor
                      placeholder={"Write here..."} 
                      value ={field.value}
                      handleEditorChange={field.onChange}
                    />

                  </Box>
                  //   <Editor
                  //   editorState={editorState}
                  //   onChange={handleEditorChange}
                  //   placeholder="Start writing something..."
                  // />
                  // <RichTextEditor />
                  // <ReactQuill
                  //   className="h-72 mb-12 dark:"
                  //   theme="snow"
                  //   placeholder="Start writing something..."
                  //   {...field}
                  // />
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
