import { Flex, FormControl, Text, Textarea } from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CommentForm } from "../../entities/Comment";
import User from "../../entities/User";
import useCreateComment from "../../hooks/useCreateComment";
import { CustomButton } from "../common/CustomButton";
import useAuth from "../navigationbar/useAuth";

const VARIANT_COLOR = "teal";

interface Props {
  replyingTo: User;
  parent: string;
  onCancelReply: () => void;
}
const ReplyComment = ({ replyingTo, parent, onCancelReply }: Props) => {
  const { state } = useAuth();
  const { id } = useParams();
  const addComment = useCreateComment(id as string, () => {
    reset();
    onCancelReply();
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm<CommentForm>();

  const onSubmit = (data: CommentForm) => {
    data = {
      text: data.text,
      userId: state.user?._id as string,
      parentCommentId: parent,
    };
    // console.log(`"Form fields": ${JSON.stringify(data)}`);
    addComment.mutate(data);
  };

  return (
    <>
      {state.isAuthenticated && (
        <form>
          <Flex direction="column">
            {/* <Avatar
              src={state.user?.img}
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
                <Textarea
                  focusBorderColor="teal.500"
                  placeholder="Reply to the comment..."
                  {...register("text", {
                    required: true,
                  })}
                />
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
