import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Spinner,
  Text,
  Textarea,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { authSatus } from "../../app/features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { PostComment } from "../../entities/Post";
import useAuth from "../../hooks/useAuth";
import useDeleteUserComment from "../../hooks/useDeleteUserComment";
import useLikeComment from "../../hooks/useLikeComment";
import usePostComments from "../../hooks/usePostComments";
import useUpdateUserComment from "../../hooks/useUpdateUserComment";
import { CustomButton } from "../common/CustomButton";
import { LoginModal } from "../common/LoginModal";
import AddComment from "./AddComment";
import ReplyComment from "./ReplyComment";

interface Props {
  postSlug: string;
  postId: string;
}

const BlogPostComments = ({ postSlug, postId }: Props) => {
  const [addComment, setAddComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [parentCommentId, setparentCommentId] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [theCommentId, setTheCommentId] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAlertOpen, setAlertOpen] = useState(false);
  const cancelRef = useRef(null);
  const isAuthenticated = useAppSelector(authSatus);
  const toggleAddComment = () => setAddComment((prev) => !prev);
  const { _id, status } = useAuth();

  const onCloseAlert = () => setAlertOpen(false);

  const { data: payload, isLoading } = usePostComments(postSlug);
  const comments = payload?.data.comments;
  const numberOfComments = payload?.data.numberOfComments;
  // console.log(comments);

  const handleComment = () => {
    if (isAuthenticated) {
      toggleAddComment();
      // setAddComment(true);
    } else {
      onOpen();
    }
  };

  const handleReply = (commentId: string, parentCommentId: string) => {
    if (isAuthenticated) {
      setReplyingTo(commentId);
      setparentCommentId(parentCommentId);
    } else {
      onOpen();
    }
  };

  const likeComment = useLikeComment(theCommentId, postSlug, () => {
    setTheCommentId("");
  });

  const handleLike = async (commentId: string) => {
    if (isAuthenticated) {
      // console.log("received comment id",commentId);
      setTheCommentId(commentId);
      // console.log("comment id set", theCommentId);
      likeComment.mutate();
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

  const editComment = useUpdateUserComment(
    postId,
    postSlug,
    theCommentId,
    userId,
    () => {
      setIsEditing(false);
      setTheCommentId("");
    }
    // (comment: Comment) => {
    //   setIsEditing(false);
    //   setTheCommentId("");
    //   // Update the comment ?
    //   // onEdit(comment, comment.text)
    // }
  );

  const deleteComment = useDeleteUserComment(postId, postSlug, () => {
    // console.log("deleted");
  });

  const handleCancelReply = () => setReplyingTo(null);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setTheCommentId("");
  };

  const { colorMode } = useColorMode();

  const renderComments = (comments: PostComment[]) => {
    return (
      <>
        {comments?.map((comment, index) => (
          <Box key={comment?._id || index} ml={0}>
            <Flex gap="3" mb="5" mt="5">
              <Avatar
                src={comment?.user?.img}
                size={!comment.parentComment ? "lg" : "md"}
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
                      {/* {comment?.user?.firstname + " " + comment?.user?.lastname} */}
                      @{comment?.user.username}
                    </Text>
                    {/* <ElapsedDate date={comment?.createdAt} /> */}
                    <Text size="2" color="gray">
                      {moment(comment.createdAt).fromNow()}
                    </Text>
                  </Flex>
                  {isEditing && theCommentId === comment._id ? (
                    <Flex direction="column" gap={4}>
                      <Flex direction="column">
                        <Textarea
                          focusBorderColor="teal.500"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
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
                    </Flex>
                  ) : (
                    <Text size="2">{comment.text}</Text>
                  )}
                </Box>
                {theCommentId !== comment._id && (
                  <Flex gap={2}>
                    {/* {isAuthenticated && (
                      <CustomButton
                        onClick={() => handleReply(comment._id)}
                        text={""}
                      />
                    )} */}
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
                        onClick={() => {
                          if (!comment.parentComment)
                            handleReply(comment._id, comment._id);
                          else handleReply(comment._id, comment.parentComment);
                        }}
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
                          // setAlertOpen(true);
                          deleteComment.mutate({
                            commentId: comment._id,
                            commenterId: comment.user._id,
                          });
                        }}
                        text={"Delete"}
                      />
                    )}
                    <Box>
                      <AlertDialog
                        isOpen={isAlertOpen}
                        onClose={onCloseAlert}
                        leastDestructiveRef={cancelRef}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Confirm Deletion
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure you want to delete this comment? This
                              action cannot be undone.
                            </AlertDialogBody>

                            <Flex
                              m="4"
                              gap="3"
                              align="center"
                              justify="flex-start"
                            >
                              <Button
                                variant="soft"
                                color="gray"
                                onClick={onCloseAlert}
                                ref={cancelRef}
                              >
                                Cancel
                              </Button>
                              <Button
                                color="red"
                                onClick={() => {
                                  onCloseAlert();
                                  deleteComment.mutate({
                                    commentId: comment._id,
                                    commenterId: comment.user._id,
                                  });
                                }}
                              >
                                Delete
                              </Button>
                            </Flex>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Box>
                  </Flex>
                )}
                <LoginModal
                  isOpen={isOpen}
                  onClose={onClose}
                  redirectLink={`/blog/${postId}`}
                />
                {replyingTo === comment._id && (
                  <ReplyComment
                    postId={postId}
                    postSlug={postSlug}
                    replyingTo={comment.user}
                    parentComment={parentCommentId}
                    onCancelReply={handleCancelReply}
                  />
                )}
              </Flex>
            </Flex>

            {comment.replies && comment.replies.length > 0 && (
              <Box pl={14}>{renderComments(comment.replies)}</Box>
            )}
          </Box>
        ))}
      </>
    );
  };

  return (
    <>
      {isLoading && (
        <Box py={8}>
          <Spinner />
        </Box>
      )}

      <Divider orientation="horizontal" color="gray.500" my="4" />

      <Flex justify="center">
        <CustomButton
          onClick={handleComment}
          text={"(" + numberOfComments + ")" + "Comment"}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </CustomButton>
        <LoginModal
          isOpen={isOpen}
          onClose={onClose}
          redirectLink={`/blog/${postSlug}`}
        />
      </Flex>

      <Divider orientation="horizontal" color="gray.500" my="4" />
      {addComment && <AddComment postSlug={postSlug} postId={postId} onCancelComment={toggleAddComment}/>}
      {renderComments(comments as PostComment[])}
      {/* <Divider orientation="horizontal" color="gray.500" my="4" /> */}
    </>
  );
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

// // RENDER WITH MAX DEPTH
// const renderComments = (
//   comments: PostComment[],
//   postId: string,
//   slug: string,
//   depth = 0,
//   maxDepth = 2
// ) => {
//   const ml = depth > maxDepth ? maxDepth * 4 : depth * 4;
//   // console.log(comments)

//   return (
//     <>
//       {comments.map((comment, index) => (
//         <Box key={comment?._id || index} ml={ml}>
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
//                   {/* <ElapsedDate date={comment?.createdAt} /> */}
//                   <Text size="2" color="gray">
//                     {moment(comment.createdAt).fromNow()}
//                   </Text>
//                 </Flex>
//                 {isEditing && theCommentId === comment._id ? (
//                   <Flex direction="column" gap={4}>
//                     <Flex direction="column">
//                       <Textarea
//                         focusBorderColor="teal.500"
//                         value={editedContent}
//                         onChange={(e) => setEditedContent(e.target.value)}
//                       />
//                       <Box color="gray">
//                         {/* {remainingChars} characters left */}
//                       </Box>
//                     </Flex>

//                     <Flex align="center">
//                       <CustomButton
//                         onClick={() =>
//                           editComment.mutate({
//                             text: editedContent as string,
//                           })
//                         }
//                       >
//                         <FontAwesomeIcon icon={faPaperPlane} />
//                       </CustomButton>
//                       <Button onClick={handleCancelEdit}>Cancel</Button>
//                     </Flex>
//                   </Flex>
//                 ) : (
//                   <Text size="2">{comment.text}</Text>
//                 )}
//               </Box>
//               {theCommentId !== comment._id && (
//                 <Flex gap={2}>
//                   {isAuthenticated && (
//                     <CustomButton
//                       onClick={() => handleReply(comment._id)}
//                       text={""}
//                     />
//                   )}
//                   <Flex>
//                     {isAuthenticated && (
//                       <CustomButton
//                         onClick={() => handleLike(comment._id)}
//                         // text={"Like"}
//                       >
//                         <FaHeart
//                           className={`text-gray-400 hover:text-teal-500
//                       ${
//                         isAuthenticated &&
//                         comment.likes.includes(_id) &&
//                         "text-teal-500"
//                       }`}
//                         />
//                       </CustomButton>
//                     )}
//                     {comment.numberOfLikes > 0 && (
//                       <Text whiteSpace="nowrap">
//                         {comment.numberOfLikes +
//                           " " +
//                           (comment.numberOfLikes === 1 ? "like" : "likes")}
//                       </Text>
//                     )}
//                   </Flex>
//                   {/* {isAuthenticated && (
//                     <CustomButton
//                       onClick={() => handleReply(comment._id)}
//                       text={"Reply"}
//                     />
//                   )} */}
//                   {isAuthenticated &&
//                     (_id === comment.user._id || status === "Admin") && (
//                       <CustomButton
//                         color="teal.200"
//                         onClick={() => {
//                           handleEditComment(
//                             comment._id,
//                             comment.user._id,
//                             comment.text
//                           );
//                         }}
//                         text={"Edit"}
//                       />
//                     )}
//                   {isAuthenticated && _id === comment.user._id && (
//                     <CustomButton
//                       color="red.400"
//                       onClick={() => {
//                         // setAlertOpen(true);
//                         deleteComment.mutate({
//                           commentId: comment._id,
//                           commenterId: comment.user._id,
//                         });
//                       }}
//                       text={"Delete"}
//                     />
//                   )}
//                   <Box>
//                     <AlertDialog
//                       isOpen={isAlertOpen}
//                       onClose={onCloseAlert}
//                       leastDestructiveRef={cancelRef}
//                     >
//                       <AlertDialogOverlay>
//                         <AlertDialogContent>
//                           <AlertDialogHeader fontSize="lg" fontWeight="bold">
//                             Confirm Deletion
//                           </AlertDialogHeader>

//                           <AlertDialogBody>
//                             Are you sure you want to delete this comment? This
//                             action cannot be undone.
//                           </AlertDialogBody>

//                           <Flex
//                             m="4"
//                             gap="3"
//                             align="center"
//                             justify="flex-start"
//                           >
//                             <Button
//                               variant="soft"
//                               color="gray"
//                               onClick={onCloseAlert}
//                               ref={cancelRef}
//                             >
//                               Cancel
//                             </Button>
//                             <Button
//                               color="red"
//                               onClick={() => {
//                                 onCloseAlert();
//                                 deleteComment.mutate({
//                                   commentId: comment._id,
//                                   commenterId: comment.user._id,
//                                 });
//                               }}
//                             >
//                               Delete
//                             </Button>
//                           </Flex>
//                         </AlertDialogContent>
//                       </AlertDialogOverlay>
//                     </AlertDialog>
//                   </Box>
//                 </Flex>
//               )}
//               <LoginModal
//                 isOpen={isOpen}
//                 onClose={onClose}
//                 redirectLink={`/blog/${postId}`}
//               />
//               {replyingTo === comment._id && (
//                 <ReplyComment
//                   postId={postId}
//                   postSlug={postSlug}
//                   replyingTo={comment.user}
//                   parentComment={comment._id}
//                   onCancelReply={handleCancelReply}
//                 />
//               )}
//             </Flex>
//           </Flex>
//           {comment.replies && comment.replies.length > 0 && (
//             <Box pl={6}>
//               {renderComments(comment.replies, postId, slug, depth + 1)}
//             </Box>
//           )}
//         </Box>
//       ))}
//     </>
//   );
// };

// return <>{renderComments(comments as PostComment[], postId, postSlug)}</>;
