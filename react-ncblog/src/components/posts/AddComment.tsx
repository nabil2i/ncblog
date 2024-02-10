import { Avatar, Box, Flex, FormControl, Textarea } from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { authSatus } from "../../app/features/auth/authSlice";
import { CommentForm } from "../../entities/Comment";
import useAuth from "../../hooks/useAuth";
import useCreateComment from "../../hooks/useCreateComment";
import { CustomButton } from "../common/CustomButton";

// const VARIANT_COLOR = "teal";
interface Props {
  postId: string;
  postSlug: string;
  onCancelComment?: () => void;
}

const AddComment = ({ postId, postSlug, onCancelComment }: Props) => {
  const { _id, img } = useAuth();
  const isAuthenticated = useSelector(authSatus);
  // const { id } = useParams();

  const addComment = useCreateComment(postId, postSlug, () => {
    reset();
  });

  const {
    handleSubmit,
    register,
    reset,
    setFocus,
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

  const remainingChars = watch("text")?.length
    ? 200 - watch("text").length
    : 200;
  // console.log(commentText)

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  return (
    <>
      {isAuthenticated && (
        <form>
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
                      value: 200,
                      message: "comment must be at most 200 characters.",
                    },
                  })}
                />
                <Flex gap={4}>
                  <Box color="gray">{remainingChars} characters left</Box>
                  <CustomButton onClick={onCancelComment} text="Cancel" />
                </Flex>
              </Flex>
            </FormControl>
            <CustomButton onClick={handleSubmit(onSubmit)} disabled={!isValid}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </CustomButton>
            {/* <Button
            // mt={4}
            type="submit"
            // disabled={}
            colorScheme={VARIANT_COLOR}
          >
            Comment
          </Button> */}
          </Flex>
        </form>
      )}
    </>
  );
};

export default AddComment;
