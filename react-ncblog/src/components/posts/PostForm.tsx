import { debounce } from "lodash";

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  useCreateDraftFromPostMutation,
  useCreateDraftPostMutation,
  useGetCurrentDraftPostQuery,
  usePublishDraftPostMutation,
  useUpdateDraftPostMutation,
  useUpdatePublishedPostMutation,
} from "../../app/features/posts/postsApiSlice";
import Post, { PostFormData } from "../../entities/Post";
import useAuth from "../../hooks/useAuth";
import { FetchResponse } from "../../services/api-client";
import AddPostImage from "../common/AddPostImage";
import PostTitleEditor from "../common/PostTitleEditor";
import { WambuiEditor } from "../common/wambuieditor";
// import { debouncedAutoSave } from "../../utils/post";

interface Props {
  post?: Post;
}

const debouncedAutoSave = debounce(async (data, handleAutoSave) => {
  await handleAutoSave(data);
}, 3000); // trigger autosave when user pauses typing for x seconds

const PostForm = ({ post }: Props) => {
  const { _id: loggedUserId } = useAuth();
  const navigate = useNavigate();
  // const [error, setError] = useState("");
  const [isSubmittingPost, setSubmittingPost] = useState(false);
  const toast = useToast();
  // const [currentDraftPost, setCurrentDraftPost] = useState<Post | null>(null);
  const currentDraftPostRef = useRef<Post | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  // const [statusMessage, setStatusMessage] = useState("");
  // const [isTyping, setIsTyping] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [hasFetchedDraft, setHasFetchedDraft] = useState(false);
  // console.log("Load post: ", post)

  // let currentDraftId;

  // useEffect(() => {
  //   if (isAutoSaving) {
  //     setStatusMessage("Saving...");
  //   } else if (isSaved){
  //     setStatusMessage("Saved");
  //     // const timer = setTimeout(() => setStatusMessage(""), 2000); // Hide "Saved" after 2 seconds

  //     // return () => clearTimeout(timer); // Cleanup timeout on unmount or when isAutoSaving changes
  //   }
  // }, [isAutoSaving, isSaved]);

  // const [
  //   addNewPost,
  //   {
  //     isError: isErrorAdd,
  //     isSuccess: isSuccessAdd,
  //     error: addPostError
  //   },
  // ] = useAddNewPostMutation();

  // const [
  //   updatePost,
  //   {
  //     isError: isErrorUpdate,
  //     isSuccess: isSuccessUpdate,
  //     error: updatePostError,
  //   },
  // ] = useUpdatePostMutation();

  // useEffect(() => {
  //   if (isSuccessAdd || isSuccessUpdate) {
  //     setSubmittingPost(false);
  //     // navigate("/blog");
  //     toast({
  //       title: isSuccessAdd ? "Post Added" : "Post Updated",
  //       description: isSuccessAdd ? "Successfully added the post." : "Successfully updated the post.",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //       icon: isSuccessAdd ? <AddIcon /> : <EditIcon />,
  //     });
  //   } else if (isErrorAdd || isErrorUpdate) {
  //     setSubmittingPost(false);
  //     setError(isErrorAdd ? "Could not add the post" : "Could not update the post");
  //     toast({
  //       title: "Error",
  //       description: isErrorAdd ? "An error occurred while adding the post." : "An error occurred while updating the post.",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // }, [isErrorAdd, isErrorUpdate, isSuccessAdd, isSuccessUpdate, navigate, toast]);
  // const { postId } = useParams();
  const [createDraftPost] = useCreateDraftPostMutation();
  const [updateDraftPost] = useUpdateDraftPostMutation();
  const [publishDraftPostMutation] = usePublishDraftPostMutation();
  const [updatePublishedPost] = useUpdatePublishedPostMutation();
  const [createDraftFromPost] = useCreateDraftFromPostMutation();
  const { data } = useGetCurrentDraftPostQuery(post?._id, {
    skip: hasFetchedDraft,
  });

  // console.log ("post current draft id:", postId);
  // console.log ("post current draft id:", post?.currentDraftId);

  const draft = data?.data;
  console.log(" first currentDraftData: ", draft);

  const {
    handleSubmit,
    register,
    control,
    // reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<PostFormData>();

  // watch for changes in the title and body,
  // then call the debouncedAutoSave function
  const title = watch("title");
  const body = watch("body");

  //a unique local storage key for the current post or new draft
  const localStorageKey = post?._id ? `draftPost-${post._id}` : "draftPost-new";

  // const draftKey = `draftPost-${post?._id || "new"}`;

  // useCallback prevents unnecessary re-creations of
  // the debouncedAutoSave function on every render
  // by memoizing the debouncedAutoSave function
  const handleAutoSave = useCallback(
    async (data: PostFormData) => {
      setIsAutoSaving(true);
      setIsSaved(false);
      // setStatusMessage("Saving...");
      // if (!data.title && !data.body) return;  // Only save if there's content
      try {
        //If updating an already published post
        if (post) {
          const response = (await updatePublishedPost({
            ...data,
            id: post._id,
          }).unwrap()) as FetchResponse<Post>;
          currentDraftPostRef.current = response.data;
          localStorage.setItem(localStorageKey, JSON.stringify(response.data)); // Sync to local storage
          // setCurrentDraftPost(response.data);
          setIsSaved(true);
          // setStatusMessage("Saved");
          // console.log("Draft updated and saved:", response.data);
        } else {
          //If creating a new post
          if (!currentDraftPostRef.current) {
            const response = (await createDraftPost({
              ...data,
              postAuthorId: loggedUserId,
            }).unwrap()) as FetchResponse<Post>;
            currentDraftPostRef.current = response.data;
            localStorage.setItem(
              localStorageKey,
              JSON.stringify(response.data)
            ); // Save new draft
            // setCurrentDraftPost(response.data);
            setIsSaved(true);
            // setStatusMessage("Saved");
            // console.log("Draft created and saved:", response.data);
          } else {
            const response = (await updateDraftPost({
              ...data,
              id: currentDraftPostRef.current._id,
            }).unwrap()) as FetchResponse<Post>;
            currentDraftPostRef.current = response.data;
            localStorage.setItem(
              localStorageKey,
              JSON.stringify(response.data)
            ); // Update draft in local storage
            // setCurrentDraftPost(response.data);
            setIsSaved(true);
            // setStatusMessage("Saved");
            // console.log("Draft updated and saved:", response.data);
          }
        }

        if (!isAutoSaving && isSaved) {
          toast({
            title: "Auto-save",
            description: "Draft saved successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Auto-save",
          description: "Draft auto-save failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // console.error("Auto-save failed:", error);
      } finally {
        setIsAutoSaving(false);
      }
    },
    [
      createDraftPost,
      isAutoSaving,
      isSaved,
      localStorageKey,
      loggedUserId,
      post,
      toast,
      updateDraftPost,
      updatePublishedPost,
    ]
  );

  const debouncedAutoSaveCallback = useCallback(
    (data: PostFormData) => debouncedAutoSave(data, handleAutoSave),
    [handleAutoSave]
  );

  useEffect(() => {
    const fetchOrCreateDraftPost = async () => {
      const localDraft = localStorage.getItem(localStorageKey);

      if (localDraft) {
        const parsedDraft = JSON.parse(localDraft) as Post;
        currentDraftPostRef.current = parsedDraft;
        setValue("title", parsedDraft.title);
        setValue("body", parsedDraft.body);
      }

      if (post && !hasFetchedDraft) {
        try {
          if (draft) {
            // setCurrentDraftPost(draft);
            currentDraftPostRef.current = draft;
            setValue("title", draft.title);
            setValue("body", draft.body);
            localStorage.setItem(localStorageKey, JSON.stringify(draft)); // Save fetched draft to local storage
          } else {
            // Create and save it to the currentDraftPost
            const response = (await createDraftFromPost(
              post._id
            ).unwrap()) as FetchResponse<Post>;
            currentDraftPostRef.current = response.data;
            setValue("title", response.data.title);
            setValue("body", response.data.body);
            localStorage.setItem(localStorageKey, JSON.stringify(draft)); // Save fetched draft to local storage
            // setCurrentDraftPost(response.data);
            // console.log("Draft created from published post and saved:", response.data);
          }
          setHasFetchedDraft(true);
        } catch (err) {
          console.error("Error fetching or creating draft post:", err);
        }
      }
    };

    fetchOrCreateDraftPost(); // Call the async function

    // Watch for auto-save changes if data updates
    if ((title && title.trim()) || (body && body.trim())) {
      const formData = getValues();
      debouncedAutoSaveCallback(formData);
    }

    // cleanup of local storage
    return () => {
      localStorage.removeItem(localStorageKey);
    };
  }, [
    body,
    createDraftFromPost,
    debouncedAutoSaveCallback,
    draft,
    getValues,
    hasFetchedDraft,
    localStorageKey,
    post,
    setValue,
    title,
  ]);

  // useEffect(() => {
  //   const formData = getValues();

  //   if ((title && title.trim()) || (body && body.trim())) {
  //   // if (formData.title || formData.body) {
  //     debouncedAutoSaveCallback(formData);
  //   }
  // }, [title, body, getValues, debouncedAutoSaveCallback]);

  // save and publish the post
  const onSubmit = async (data: PostFormData) => {
    // const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // if (!currentPost) {
    //   console.error("No draft post found.");
    //   return;
    // }
    // // const formData = getValues();
    // // console.log("data", formData);
    setSubmittingPost(true);
    try {
      await publishDraftPostMutation({
        ...data,
        id: currentDraftPostRef.current?._id,
        status: "published",
      });
      localStorage.removeItem(localStorageKey); // Clear local storage after publish
      navigate("/myposts");
      toast({
        title: "Post Published",
        description: "Your post is now live!",
        duration: 5000,
        isClosable: true,
        status: "success",
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while publishing the post.",
        duration: 5000,
        isClosable: true,
        status: "error",
        position: "top",
      });
    } finally {
      setSubmittingPost(false);
    }
  };

  return (
    <>
      {/* {isAutoSaving && !isSaved && <Box>"Saving..."</Box>} */}
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
              {/* {addPostError && (
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
              )} */}
              <FormControl
                isRequired
                isInvalid={errors.title ? true : false}
                mb="00px"
              >
                <PostTitleEditor
                  id={"title"}
                  content={currentDraftPostRef.current?.title as string}
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
                // defaultValue={currentDraftPostRef.current?.body || ""}
                render={({ field }) => (
                  <Box w="full" overflowWrap="break-word" mt={15}>
                    <WambuiEditor
                      placeholder={"Write here..."}
                      value={currentDraftPostRef.current?.body || field.value}
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
