import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { authSatus } from "../../app/features/auth/authSlice";
import Post, { PostComment } from "../../entities/Post";
import useAuth from "../../hooks/useAuth";
import useDeleteUserComment from "../../hooks/useDeleteUserComment";
import useLikeComment from "../../hooks/useLikeComment";
import useUpdateUserComment from "../../hooks/useUpdateUserComment";
import { CustomButton } from "../common/CustomButton";
import { LoginModal } from "../common/LoginModal";
import ReplyComment from "./ReplyComment";

interface Props {
  post: Post;
}

const BlogPostComments = ({ post }: Props) => {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // const [commentToDelete, setCommentToDelete] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [theCommentId, setTheCommentId] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = useSelector(authSatus);
  const { _id, status } = useAuth();
  // console.log(comments)
  // console.log(postId)

  // console.log("to delete", commentToDelete)
  // console.log("commenter", commenterId)

  const handleReply = (commentId: string) => {
    if (isAuthenticated) {
      setReplyingTo(commentId);
    } else {
      onOpen();
    }
  };

  const likeComment = useLikeComment(post._id, post.slug, theCommentId);

  const handleLike = async (commentId: string) => {
    if (isAuthenticated) {
      setTheCommentId(commentId);
      likeComment.mutate();
      setTheCommentId("");
    } else {
      onOpen();
    }
  };

  const handleEditComment = async (
    commentId: string,
    userId: string,
    content: string
  ) => {
    if (isAuthenticated) {
      setTheCommentId(commentId);
      setUserId(userId);
      setIsEditing(true);
      setEditedContent(content);
    } else {
      onOpen();
    }
  };

  const deleteComment = useDeleteUserComment(post._id, post.slug, () => {
    // console.log("deleted");
  });

  const editComment = useUpdateUserComment(
    post._id,
    post.slug,
    theCommentId,
    userId,
    () => {setIsEditing(false), setTheCommentId("")}
  );

  // const handleDelete = () => {
  //   if (isAuthenticated) {
  //     //delete the comment and all its children
  //     deleteComment.mutate({
  //       commentId: commentToDelete,
  //       commenterId,
  //     });
  //   } else {
  //     onOpen();
  //   }
  // };

  const handleCancelReply = () => setReplyingTo(null);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setTheCommentId("");
  };

  const { colorMode } = useColorMode();

  // RENDER WITH MAX DEPTH
  const renderComments = (
    comments: PostComment[],
    postId: string,
    slug: string,
    depth = 0,
    maxDepth = 2
  ) => {
    const ml = depth > maxDepth ? maxDepth * 4 : depth * 4;
    // console.log(comments)

    return (
      <>
        {comments.map((comment, index) => (
          <Box key={comment?._id || index} ml={ml}>
            <Flex gap="3" mb="5" mt="5">
              <Avatar
                src={comment?.user?.img}
                size="xs"
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
                      {comment?.user?.firstname + " " + comment?.user?.lastname}
                    </Text>
                    {/* <ElapsedDate date={comment?.createdAt} /> */}
                    <Text size="2" color="gray">
                      {moment(comment.createdAt).fromNow()}
                    </Text>
                  </Flex>
                  {isEditing && theCommentId === comment._id ? (
                    <Box>
                      <Flex direction="column">
                        <Textarea
                          focusBorderColor="teal.500"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          // placeholder="Add a comment..."
                          // {...register("text", {
                          //   required: true,
                          //   maxLength: {
                          //     value: 200,
                          //     message: "comment must be at most 200 characters.",
                          //   },
                          // })}
                        />
                        <Box color="gray">
                          {/* {remainingChars} characters left */}
                        </Box>
                      </Flex>

                      <Flex align="center">
                        <CustomButton
                          onClick={() =>
                            editComment.mutate({
                              text: editedContent as string,
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </CustomButton>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                      </Flex>
                    </Box>
                  ) : (
                    <Text size="2">{comment.text}</Text>
                  )}
                </Box>
                {theCommentId !== comment._id && (
                  <Flex gap={2}>
                    {isAuthenticated && (
                      <CustomButton
                        onClick={() => handleReply(comment._id)}
                        text={""}
                      />
                    )}
                    <Flex>
                      {isAuthenticated && (
                        <CustomButton
                          onClick={() => handleLike(comment._id)}
                          // text={"Like"}
                        >
                          <FaHeart
                            className={`text-gray-400 hover:text-teal-500
                        ${
                          isAuthenticated &&
                          comment.likes.includes(_id) &&
                          "text-teal-500"
                        }`}
                          />
                        </CustomButton>
                      )}
                      {comment.numberOfLikes > 0 && (
                        <Text whiteSpace="nowrap">
                          {comment.numberOfLikes +
                            " " +
                            (comment.numberOfLikes === 1 ? "like" : "likes")}
                        </Text>
                      )}
                    </Flex>
                    {isAuthenticated && (
                      <CustomButton
                        onClick={() => handleReply(comment._id)}
                        text={"Reply"}
                      />
                    )}
                    {isAuthenticated &&
                      (_id === comment.user._id || status === "Admin") && (
                        <CustomButton
                          color="teal.200"
                          onClick={() => {
                            handleEditComment(
                              comment._id,
                              comment.user._id,
                              comment.text
                            );
                          }}
                          text={"Edit"}
                        />
                      )}
                    {isAuthenticated && _id === comment.user._id && (
                      <CustomButton
                        color="red.400"
                        onClick={() => {
                          deleteComment.mutate({
                            commentId: comment._id,
                            commenterId: comment.user._id,
                          });
                        }}
                        text={"Delete"}
                      />
                    )}
                  </Flex>
                )}
                <LoginModal
                  isOpen={isOpen}
                  onClose={onClose}
                  redirectLink={`/blog/${postId}`}
                />
                {replyingTo === comment._id && (
                  <ReplyComment
                    postId={post._id}
                    postSlug={post.slug}
                    replyingTo={comment.user}
                    parentComment={comment._id}
                    onCancelReply={handleCancelReply}
                  />
                )}
              </Flex>
            </Flex>
            {comment.replies && comment.replies.length > 0 && (
              <Box pl={6}>
                {renderComments(comment.replies, postId, slug, depth + 1)}
              </Box>
            )}
          </Box>
        ))}
      </>
    );
  };

  return <>{renderComments(post.comments, post._id, post.slug)}</>;
};

export default BlogPostComments;

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

// const ReplyButton = ({ onClick }: { onClick: () => void }) => (
//   <button onClick={onClick}><Text size="2" color="gray">Reply</Text></button>
// )

// // NO DEPTH COMMENTS
// return (
//   <>
//     {post.comments.map((comment, index) => (
//         <Box key={comment?._id || index} ml={0}>
//           <Flex gap="3" mb="5" mt="5">
//             <Avatar
//               src={comment?.user?.img}
//               size="xs"
//               className="cursor-pointer"
//               referrerPolicy="no-referrer"
//             />
//             <Flex direction="column" gap="1" width={"100%"}>
//               <Box
//                 borderRadius={"lg"}
//                 bg={colorMode === "light" ? "gray.100" : "gray.700"}
//                 p={4}
//               >
//                 <Flex gap="3" align="center">
//                   <Text size="3" fontWeight={700}>
//                     {comment?.user?.firstname + " " + comment?.user?.lastname}
//                   </Text>
//                 </Flex>
//                 <Text size="2">{comment.text}</Text>
//               </Box>
//               <Flex gap={4}>
//                 <ElapsedDate date={comment.createdAt} />
//                 <CustomButton
//                   onClick={() => handleReply(comment._id)}
//                   text={"Reply"}
//                 />
//               </Flex>
//               <LoginModal
//                 isOpen={isOpen}
//                 onClose={onClose}
//                 redirectLink={`/blog/${post.slug}`}
//               />
//               {replyingTo === comment._id && (
//                 <ReplyComment
//                   postSlug={post.slug}
//                   replyingTo={comment.user}
//                   parentComment={comment._id}
//                   onCancelReply={handleCancelReply}
//                 />
//               )}
//             </Flex>
//           </Flex>
//           {/* {comment.replies && comment.replies.length > 0 && (
//             <Box pl={6}>
//               {renderComments(comment.replies, postId, slug, depth + 1)}
//             </Box>
//           )} */}
//         </Box>
//     ))}
//   </>
// )
