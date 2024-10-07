import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import ms from "ms";
import { FaThumbsUp } from "react-icons/fa";
import { authSatus } from "../../app/features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { PostComment } from "../../entities/Post";
import useFetchCommentLikeStatus from "../../hooks/useFetchCommentLikeStatus";
import useLikeUnlikeComment from "../../hooks/useLikeUnlikeComment";
import { CustomButton } from "../common/CustomButton";

interface Props {
  comment: PostComment;
  focusCommentId?: string;
  setFocusCommentId?: (value: string) => void;
}
const LikeCommentButton = ({ comment }: Props) => {
  const isAuthenticated = useAppSelector(authSatus);
  const toast = useToast();

  const { data: payload } = useFetchCommentLikeStatus(comment._id);
  const hasLiked = payload?.data.hasLiked;
  const likeCount = payload?.data.likeCount;

  // console.log("hasLiked: ", hasLiked);
  // console.log("likeCount: ", likeCount);

  const handleLikeUnlikeComment = async () => {
    if (isAuthenticated) {
      // console.log("Like or Unlike the comment: ", commentId);
      likeUnlikeComment.mutate();
    } else {
      // onOpen();
    }
  };

  // trigger like comment action in backend
  const likeUnlikeComment = useLikeUnlikeComment(
    comment._id,
    () => {
      // setFocusCommentId("");
    },
    (errorMessage) => {
      // console.log("Error: ", errorMessage);
      toast({
        title: "",
        description: errorMessage,
        duration: ms("5s"),
        isClosable: true,
        status: "error",
        position: "top",
        // icon: <EditIcon />,
      });
    }
  );

  return (
    <Flex
      mt={"10px"}
      direction="column"
      alignItems="center"
      justifyItems={"center"}
    >
      <Flex width="full">
        {isAuthenticated && (
          <CustomButton onClick={handleLikeUnlikeComment}>
            <FaThumbsUp
              className={`text-gray-400 hover:text-teal-500
                  ${isAuthenticated && hasLiked && "text-teal-500"} 
                `}
            />
          </CustomButton>
        )}
      </Flex>
      <Box width="full" textAlign={"center"}>
        {(likeCount ?? 0) > 0 && <Text>{likeCount}</Text>}
      </Box>
    </Flex>
  );
};

export default LikeCommentButton;
