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
import SimpleMDE from "react-simplemde-editor";
import Post, { PostFormData } from "../../entities/Post";
import useAuth from "../../hooks/useAuth";
import useCreatePost from "../../hooks/useCreatePost";
import useUpdateUserPost from "../../hooks/useUpdateUserPost";
import AutoExpandingTextarea from "../common/AutoExpandingTextarea";
import PostActions from "./PostActions";
import AddPostImage from "../admin/posts/AddPostImage";

interface Props {
  post?: Post;
}
const PostForm = ({ post }: Props) => {
  const { _id } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmittingPost, setSubimittingPost] = useState(false);
  const toast = useToast();
  const createPost = useCreatePost(
    () => {
      // reset();
      setSubimittingPost(false);
      navigate("/myposts");
      toast({
        title: "Add a post",
        description: "Successfully added the post.",
        duration: 5000, // 5s
        isClosable: true,
        status: "success",
        position: "top",
        icon: <AddIcon />,
      });
    },
    (errorMessage) => {
      setSubimittingPost(false);
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
    () => {
      // reset();
      setSubimittingPost(false);
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
      setSubimittingPost(false);
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
    setSubimittingPost(true);
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
          <PostActions post={post} isSubmittingPost={isSubmittingPost} setFieldValue={setValue}/>
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
              <AddPostImage setFieldValue={setValue} />
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
        </Flex>
      </form>
    </>
  );
};

export default PostForm;
