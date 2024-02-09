import { AddIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import "easymde/dist/easymde.min.css";
import ms from "ms";
import { useState } from "react";
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
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from 'draftjs-to-html';
// import HtmlToDraft from 'html-to-draftjs';
import PostTitleEditor from "../common/PostTitleEditor";

interface Props {
  post?: Post;
}
const PostForm = ({ post }: Props) => {
  const { _id } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmittingPost, setSubmittingPost] = useState(false);
  const toast = useToast();

  const [editorState, setEditorState] = useState(() => {
    if (post?.body) {
      // If updating a post, convert HTML to ContentState
      const blocksFromHTML = convertFromHTML(post.body);
      // const blocksFromHTML = HtmlToDraft(post.body);

      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      return EditorState.createWithContent(state);
    } else {
      // For a new post, start with an empty editor state
      return EditorState.createEmpty();
    }
  });

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const html = stateToHTML(contentState);
    // const rawContentState = convertToRaw(contentState)
    // const html = stateToHTML(rawContentState)
    console.log(html);
    setValue("body", html);
    // const contentState = convertToRaw(newEditorState.getCurrentContent());
    // Convert ContentState to HTML and update the form value
  };

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
    post?.user?._id as string,
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
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>();
  // } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: PostFormData) => {
    const formaData = getValues();
    console.log("data", formaData);
    setSubmittingPost(true);
    if (post) {
      updatePost.mutate({
        ...data,
        title: data.title,
        body: data.body,
        userId: post?.user?._id,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex display="column">
          <PostActions
            post={post}
            isSubmittingPost={isSubmittingPost}
            setFieldValue={setValue}
          />
          <Grid
            gap={2}
            templateAreas={{ base: `"main"`, lg: `"side1 main side2"` }}
            templateColumns={{ base: "1fr", lg: "1fr 1000px 1fr" }}
          >
            <GridItem area="main" p={4}>
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
                mb="40px"
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
              <AddPostImage setFieldValue={setValue} postImage={post?.img} />

              <Controller
                name="body"
                control={control}
                defaultValue={post?.body as string}
                render={() => (
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={handleEditorChange}
                    placeholder="Write something..."
                  />
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
        </Flex>
      </form>
    </>
  );
};

export default PostForm;
