import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ms from "ms";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { authSatus } from "../../app/features/auth/authSlice";
import { CommentForm } from "../../entities/Comment";
import { SimpleUser } from "../../entities/User";
import useAuth from "../../hooks/useAuth";
import useCreateComment from "../../hooks/useCreateComment";
// import { CustomButton } from "../common/CustomButton";

// const VARIANT_COLOR = "teal";

interface Props {
  postId: string;
  userRepliedTo: SimpleUser;
  realParentCommentId: string;
  topParentCommentId: string | null;
  onCancelReply: () => void;
  setFocusCommentId: (value: string) => void;
  setRealParentCommentId: (value: string) => void;
  setTopParentCommentId: (value: string) => void;
  setIsReplying: (value: boolean) => void;
  handleNewReply: () => void;


}
const ReplyComment = ({
  postId,
  userRepliedTo,
  realParentCommentId,
  topParentCommentId,
  onCancelReply,
  // added
  setFocusCommentId,
  setRealParentCommentId,
  setTopParentCommentId,
  setIsReplying,
  handleNewReply
}: Props) => {
  // console.log("ParentCommentId to: ", parentOfCommentRepliedTo);
  const { _id } = useAuth();
  const toast = useToast();
  const isAuthenticated = useSelector(authSatus);
  // const { id } = useParams();
  const addComment = useCreateComment(
    postId,
    () => {
      reset();
      onCancelReply();
      setRealParentCommentId("");
      setTopParentCommentId("");
      setFocusCommentId("");
      setIsReplying(false);

      //
      handleNewReply();
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
      onCancelReply();
      setRealParentCommentId("");
      setTopParentCommentId("");
      setFocusCommentId("");
      setIsReplying(false);
    }
  );

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
      topParentCommentId: topParentCommentId,
      realParentCommentId: realParentCommentId,
      userRepliedToId: userRepliedTo._id,
    };
    // console.log(`"Form fields": ${JSON.stringify(data)}`);
    addComment.mutate(data);
  };

  const onFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const position = `@${userRepliedTo.username} `.length;
    event.target.setSelectionRange(position, position);
  };

  useEffect(() => {
    setValue("text", `@${userRepliedTo.username} `);
    // reset({ text: `@${userRepliedTo.username} ` });
    setFocus("text");
  }, [reset, userRepliedTo.username, setValue, setFocus]);

  const remainingChars = watch("text")?.length
    ? 200 - watch("text").length
    : 200;

  return (
    <>
      {isAuthenticated && (
        <form>
          <Flex direction="column" border="1px" p={4} mt={1} borderRadius={2} borderColor={"teal"}>
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
                  {userRepliedTo.username}
                  {/* {userRepliedTo.firstname + " " + userRepliedTo.lastname} */}
                </Text>
              </Flex>
              {/* <CustomButton
                onClick={onCancelReply}
                text="Cancel"
                textFontSize="xs"
              /> */}
              {/* <CancelButton onClick={onCancelReply}/> */}
            </Flex>

            <Flex justify="center" align="center" gap={2} mt="4px">
              <FormControl
              // isRequired isInvalid={errors.comment ? true : false}
              >
                <Flex direction="column">
                  <Textarea
                    focusBorderColor="teal.500"
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
            </Flex>

            <Flex justify="flex-end" gap="2">
            <Button
                disabled={!isValid}
                colorScheme={"gray"}
                variant="solid"
                onClick={onCancelReply}
              >
                Cancel
              </Button>

            <Button
                type="submit"
                disabled={!isValid}
                colorScheme={"teal"}
                variant="solid"
                onClick={handleSubmit(onSubmit)}
              >
                Reply
              </Button>


              {/* <CustomButton
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </CustomButton> */}
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
