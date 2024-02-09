import { Box, Flex, FormControl, Text, Textarea } from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { authSatus } from "../../app/features/auth/authSlice";
import { CommentForm } from "../../entities/Comment";
import { SimpleUser } from "../../entities/User";
import useAuth from "../../hooks/useAuth";
import useCreateComment from "../../hooks/useCreateComment";
import { CustomButton } from "../common/CustomButton";

// const VARIANT_COLOR = "teal";

interface Props {
  replyingTo: SimpleUser;
  parentComment: string;
  postId: string;
  postSlug: string;
  onCancelReply: () => void;
}
const ReplyComment = ({
  replyingTo,
  postId,
  postSlug,
  parentComment,
  onCancelReply,
}: Props) => {
  const { _id } = useAuth();
  const isAuthenticated = useSelector(authSatus);
  // const { id } = useParams();
  const addComment = useCreateComment(postId, postSlug, () => {
    reset();
    onCancelReply();
  });

  const replyingToStyle = {
    color: "teal.500",
  };

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    setFocus,
    formState: { isValid },
  } = useForm<CommentForm>();

  const onSubmit = (data: CommentForm) => {
    data = {
      text: data.text,
      userId: _id,
      parentCommentId: parentComment,
      replyToComment: replyingTo._id,
    };
    // console.log(`"Form fields": ${JSON.stringify(data)}`);
    addComment.mutate(data);
  };

  const onFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const position = `@${replyingTo.username}`.length;
    event.target.setSelectionRange(position, position);
  };

  useEffect(() => {
    setValue("text", `@${replyingTo.username}`);
    reset({ text: `@${replyingTo.username}` });
    // setFocus("text");
  }, [reset, replyingTo.username, setValue, setFocus]);

  const remainingChars = watch("text")?.length
    ? 200 - watch("text").length
    : 200;

  // useEffect(() => {
  //   setFocus("text");
  // }, [setFocus]);

  return (
    <>
      {isAuthenticated && (
        <form>
          <Flex direction="column">
            {/* <Avatar
              src={img}
              // fallback={comment.user.firstname?.slice(0, 1)}
              size="md"
              // radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            /> */}

            <Flex gap={4}>
              <Flex gap={1}>
                <Text fontSize={"xs"}>Replying to </Text>
                <Text fontSize={"xs"} fontWeight={700}>
                  {replyingTo.firstname + " " + replyingTo.lastname}
                </Text>
              </Flex>
              <CustomButton
                onClick={onCancelReply}
                text="Cancel"
                textFontSize="xs"
              />
              {/* <CancelButton onClick={onCancelReply}/> */}
            </Flex>
            <Flex justify="center" align="center" gap={2} mt="4px">
              <FormControl
              // isRequired isInvalid={errors.comment ? true : false}
              >
                <Flex direction="column">
                  <Textarea
                    focusBorderColor="none"
                    // defaultValue={`@${replyingTo.username}`}
                    css={replyingToStyle}
                    placeholder="Reply to the comment..."
                    // {...rest}
                    {...register("text", {
                      required: true,
                      maxLength: {
                        value: 200,
                        message: "comment must be at most 200 characters.",
                      },
                    })}
                    onFocus={onFocus}
                    style={{ color: "" }}
                  />
                  <Box color="gray">{remainingChars} characters left</Box>
                </Flex>
              </FormControl>
              {/* <Button type="submit" colorScheme={VARIANT_COLOR}>Comment</Button> */}
              <CustomButton
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </CustomButton>
            </Flex>
          </Flex>
        </form>
      )}
    </>
  );
};

// const CancelButton = ({ onClick }: { onClick: () => void }) => (
//   <button onClick={onClick}>
//     <Text size="2" color="gray">
//       Cancel
//     </Text>
//   </button>
// )

export default ReplyComment;
