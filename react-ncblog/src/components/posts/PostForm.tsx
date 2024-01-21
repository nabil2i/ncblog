import { AddIcon } from "@chakra-ui/icons";
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
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineMoreHoriz, MdOutlineMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import useAuth from "../navigationbar/useAuth";
import useCreatePost from "../../hooks/useCreatePost";
import UpdatePostAction from "./UpdatePostAction";
import useUpdatePost from "../../hooks/useUpdatePost";
import Post from "../../entities/Post";
import UpdatePostButton from "./UpdatePostButton";
import TextareaAutosize from 'react-textarea-autosize';
import AutoExpandingTextarea from "../common/AutoExpandingTextarea";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// if doing optimistic update
// interface CreatePostContext {
//   prevPosts: Post[]

// }
export interface PostFormData {
  title: string;
  body: string;
  userId?: string;
}
// const schema = z.object({
//   title: z
//     .string()
//     .min(20, { message: "Title must be at least 20 characters." }),
//   body: z.string().min(50, { message: "Body must be at least 50 characters." }),
// });

// type FormData = z.infer<typeof schema>;

interface Props {
  post?: Post;
}
const PostForm = ({ post }: Props) => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmittingPost, setSubimittingPost] = useState(false);
  const toast = useToast();
  const createPost = useCreatePost(
    () => {
      // reset();
      setSubimittingPost(false);
      navigate("/myposts");
    },
    () => {
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
  const updatePost = useUpdatePost(
    post?._id as string,
    () => {
      // reset();
      setSubimittingPost(false);
      navigate("/myposts/");
    },
    () => {
      toast({
        title: "Update a post",
        description: "Successfully updated the post.",
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
      //   title: "Update a post",
      //   description: "An error occured while adding the post.",
      //   duration: 5000, // 5s
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
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>();
  // } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: PostFormData) => {
    // console.log(data);
    setSubimittingPost(true);
    if (post) {
      updatePost.mutate({
        title: data.title,
        body: data.body,
        userId: post?.user?._id,
      });
    } else {
      createPost.mutate({
        title: data.title,
        body: data.body,
        userId: state.user?._id,
      });
    }
  };
  const { isOpen, onClose } = useDisclosure();
  // const icnRef = React.useRef();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex display="column">
          <Flex
            // px={4}
            position="fixed"
            align="center"
            // minH="20px"
            bg="gray.400"
            w="full"
            h="60px"
            zIndex="90"
            top="60px"
            justify="flex-end"
            px={5}
            // display="none"
          >
            {/* <IconButton
              aria-label={"Settings"}
              onClick={onOpen}
              icon={<MdOutlineMoreHoriz />}
              borderRadius="full"
              color="gray.400"
              variant="ghost"
              fontSize={20}
            /> */}
            <UpdatePostButton isSubmittingPost={isSubmittingPost} post={post}/>

            {/* <Menu>
              <MenuButton
                as={IconButton}
                icon={<MdOutlineMoreVert />}
                aria-label={"Settings"}
                // borderRadius="full"
                color="white"
                variant="ghost"
                fontSize={20}
                _hover={{ bg: "none" }}
              ></MenuButton>
              <MenuList>
                <UpdatePostAction
                  post={post}
                  isSubmittingPost={isSubmittingPost}
                />
              </MenuList>
            </Menu> */}
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              // finalFocusRef={icnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>

                <DrawerBody>
                  <Input placeholder="Type here..." />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>

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
        </Flex>
      </form>
    </>
  );
};

export default PostForm;
