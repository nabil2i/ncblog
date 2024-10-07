import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ms from "ms";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { authSatus } from "../../app/features/auth/authSlice";
import { CommentForm } from "../../entities/Comment";
import useAuth from "../../hooks/useAuth";
import useCreateComment from "../../hooks/useCreateComment";

const MAX_COMMENT_CHAR = 500;
// const VARIANT_COLOR = "teal";
interface Props {
  postId: string;
  onCancelComment?: () => void;
}

const AddComment = ({ postId }: Props) => {
  const { _id, img } = useAuth();
  const isAuthenticated = useSelector(authSatus);
  const toast = useToast();
  // const { id } = useParams();

  const [showComment, setShowComment] = useState(false);
  // const toggleShowComment = () => {
  //   setShowComment((prev) => !prev);
  // };

  const addComment = useCreateComment(
    postId,
    () => {
      reset();
      setShowComment(false);
    },
    (error) => {
      // console.log(error.message);
      toast({
        title: "",
        description:
          error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
            ? (error.response.data as { message: string }).message
            : "An error occurred",
        duration: ms("5s"),
        isClosable: true,
        status: "error",
        position: "top",
        // icon: <EditIcon />,
      });
    }
  );

  const {
    handleSubmit,
    register,
    reset,
    // setFocus,
    watch,
    formState: { isValid },
  } = useForm<CommentForm>();

  const onSubmit = (data: CommentForm) => {
    data = {
      text: data.text,
      userId: _id,
    };
    // console.log(`"Form fields": ${JSON.stringify(data)}`);
    addComment.mutate(data);
  };

  const commentText = watch("text");

  const remainingChars = commentText?.length
    ? MAX_COMMENT_CHAR - commentText.length
    : MAX_COMMENT_CHAR;
  // console.log(commentText)

  useEffect(() => {
    setShowComment(commentText?.trim().length > 0);
    //   setFocus("text");
  }, [commentText]);

  return (
    <>
      {isAuthenticated && (
        <Box border="1px" p={4} borderRadius={4}>
          <form>
            <Flex direction="column" gap="2">
              <Flex mt="5" align="center" gap={2}>
                <Avatar
                  src={img}
                  size="md"
                  className="cursor-pointer"
                  referrerPolicy="no-referrer"
                />
                <FormControl>
                  <Flex direction="column">
                    <Textarea
                      focusBorderColor="teal.500"
                      placeholder="Add a comment..."
                      {...register("text", {
                        required: true,
                        maxLength: {
                          value: 500,
                          message: `comment must be at most ${MAX_COMMENT_CHAR} characters.`,
                        },
                      })}
                    />
                    <Flex gap={4}>
                      <Box color="gray">{remainingChars} characters left</Box>
                      {/* <CustomButton onClick={onCancelComment} text="Cancel" /> */}
                    </Flex>
                  </Flex>
                </FormControl>
              </Flex>
              {showComment && (
                <Flex justify="flex-end" gap={2}>
                  <Button
                    colorScheme={"gray"}
                    variant="solid"
                    onClick={() => {
                      setShowComment(false);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    // mt={4}
                    type="submit"
                    disabled={!isValid}
                    colorScheme={"teal"}
                    variant="solid"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Comment
                  </Button>

                  {/* <CustomButton
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
                variant="solid"
                >
                <Text>Send</Text>
                <FontAwesomeIcon icon={faPaperPlane} />
                </CustomButton> */}
                </Flex>
              )}
            </Flex>
          </form>
        </Box>
      )}
    </>
  );
};

export default AddComment;
