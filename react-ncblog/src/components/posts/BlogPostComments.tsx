import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { PostComment } from "../../entities/Post";
import { CustomButton } from "../common/CustomButton";
import { LoginModal } from "../common/LoginModal";
import useAuth from "../navigationbar/useAuth";
import ElapsedDate from "./ElapsedDate";
import ReplyComment from "./ReplyComment";

const BlogPostComments = ({
  comments,
  postId,
}: {
  comments: PostComment[];
  postId: string;
}) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useAuth();

  const handleReply = (commentId: string) => {
    if (userData.isAuthenticated) {
      setReplyingTo(commentId);
    } else {
      onOpen();
    }
  };

  const handleCancelReply = () => setReplyingTo(null);

  // const theme = localStorage.getItem("chakra-ui-color-mode");
  const { colorMode } = useColorMode();

  // const renderCommentsWithVisualIndicators = (comments, depth = 0) => {
  //   return (
  //     <>
  //       {comments.map((comment, index) => (
  //         <Box key={comment._id} marginLeft={`${depth * 4}rem`}>
  //           <CommentWithVisualIndicator comment={comment} depth={depth} />
  //           {/* Rest of your comment rendering logic */}
  //         </Box>
  //       ))}
  //     </>
  //   );
  // };

  // const CommentWithVisualIndicator = ({ comment, depth }) => {
  //   return (
  //     <Flex>
  //       <Box width="1rem" height="100%" borderLeft="1px solid gray" marginRight="1rem" />
  //       {/* Render the rest of your comment content here */}
  //     </Flex>
  //   );
  // };

  // RENDER WITH DEPTH
  const renderComments = (
    comments: PostComment[],
    postId: string,
    depth = 0,
    maxDepth = 2
  ) => {
    const ml = depth > maxDepth ? maxDepth * 4 : depth * 4;

    return (
      <>
        {comments.map((comment) => (
          <Box key={comment._id} ml={ml}>
            <Flex gap="3" mb="5" mt="5">
              <Avatar
                src={comment.user.img}
                // fallback={comment.user.firstname?.slice(0, 1)}
                size="xs"
                // radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
              <Flex direction="column" gap="1" width={"100%"}>
                <Box
                  borderRadius={"lg"}
                  bg={colorMode === "light" ? "gray.100" : "gray.700"}
                  p={4}
                >
                  <Flex gap="3" align="center">
                    <Text size="3" fontWeight={700}>
                      {comment.user.firstname + " " + comment.user.lastname}
                    </Text>
                  </Flex>
                  <Text size="2">{comment.text}</Text>
                </Box>
                <Flex gap={4}>
                  <ElapsedDate date={comment.createdAt} />
                  {!replyingTo && (
                    <CustomButton
                      onClick={() => handleReply(comment._id)}
                      text={"Reply"}
                    />
                    //   <FaFontAwesome icon="fa-regular fa-paper-plane" />
                    // </CustomButton>
                    // <ReplyButton onClick={() => handleReply(comment._id)}></ReplyButton>
                  )}
                </Flex>
                <LoginModal
                  isOpen={isOpen}
                  onClose={onClose}
                  redirectLink={`/blog/${postId}`}
                />
                {replyingTo === comment._id && (
                  <ReplyComment
                    replyingTo={comment.user}
                    parent={comment._id}
                    onCancelReply={handleCancelReply}
                  />
                )}
              </Flex>
            </Flex>
            {comment.replies && comment.replies.length > 0 && (
              <Box pl={6}>
                {renderComments(comment.replies, postId, depth + 1)}
              </Box>
            )}
          </Box>
        ))}
      </>
    );
  };
  return <>{renderComments(comments, postId)}</>;
};

// const ReplyButton = ({ onClick }: { onClick: () => void }) => (
//   <button onClick={onClick}><Text size="2" color="gray">Reply</Text></button>
// )

export default BlogPostComments;
