import { Box } from "@chakra-ui/react";

const Comment = () => {
  return (
    <>
      <Box>Hello comment</Box>
    </>
  );
};

export default Comment;

// {/* <Flex gap="3" mb="5" mt="5">
// <Avatar
//   src={comment?.user.img}
//   size="xs"
//   className="cursor-pointer"
//   referrerPolicy="no-referrer"
// />
// <Flex direction="column" gap="1" width={"100%"}>
//   <Box
//     borderRadius={"lg"}
//     bg={colorMode === "light" ? "gray.100" : "gray.700"}
//     p={4}
//   >
//     <Flex gap="3" align="center">
//       <Text size="3" fontWeight={700}>
//         {comment?.user?.firstname + " " + comment?.user?.lastname}
//       </Text>
//       {/* <ElapsedDate date={comment?.createdAt} /> */}
//       <Text size="2" color="gray">
//         {moment(comment.createdAt).fromNow()}
//       </Text>
//     </Flex>
//     {isEditing && theCommentId === comment._id ? (
//       <Flex direction="column" gap={4}>
//         <Flex direction="column">
//           <Textarea
//             focusBorderColor="teal.500"
//             value={editedContent}
//             onChange={(e) => setEditedContent(e.target.value)}
//           />
//           <Box color="gray">
//             {/* {remainingChars} characters left */}
//           </Box>
//         </Flex>

//         <Flex align="center">
//           <CustomButton
//             onClick={() =>
//               editComment.mutate({
//                 text: editedContent as string,
//               })
//             }
//           >
//             <FontAwesomeIcon icon={faPaperPlane} />
//           </CustomButton>
//           <Button onClick={handleCancelEdit}>Cancel</Button>
//         </Flex>
//       </Flex>
//     ) : (
//       <Text size="2">{comment.text}</Text>
//     )}
//   </Box>
//   {theCommentId !== comment._id && (
//     <Flex gap={2}>
//       {isAuthenticated && (
//         <CustomButton
//           onClick={() => handleReply(comment._id)}
//           text={""}
//         />
//       )}
//       <Flex>
//         {isAuthenticated && (
//           <CustomButton
//             onClick={() => handleLike(comment._id)}

//           >
//             <FaHeart
//               className={`text-gray-400 hover:text-teal-500
//           ${
//             isAuthenticated &&
//             comment.likes.includes(_id) &&
//             "text-teal-500"
//           }`}
//             />
//           </CustomButton>
//         )}
//         {comment.numberOfLikes > 0 && (
//           <Text whiteSpace="nowrap">
//             {comment.numberOfLikes +
//               " " +
//               (comment.numberOfLikes === 1 ? "like" : "likes")}
//           </Text>
//         )}
//       </Flex>
//       {isAuthenticated && (
//         <CustomButton
//           onClick={() => handleReply(comment._id)}
//           text={"Reply"}
//         />
//       )}
//       {isAuthenticated &&
//         (_id === comment.user._id || status === "Admin") && (
//           <CustomButton
//             color="teal.200"
//             onClick={() => {
//               handleEditComment(
//                 comment._id,
//                 comment.user._id,
//                 comment.text
//               );
//             }}
//             text={"Edit"}
//           />
//         )}
//       {isAuthenticated && _id === comment.user._id && (
//         <CustomButton
//           color="red.400"
//           onClick={() => {
//             // setAlertOpen(true);
//             deleteComment.mutate({
//               commentId: comment._id,
//               commenterId: comment.user._id,
//             });
//           }}
//           text={"Delete"}
//         />
//       )}
//       <Box>
//         <AlertDialog
//           isOpen={isAlertOpen}
//           onClose={onCloseAlert}
//           leastDestructiveRef={cancelRef}
//         >
//           <AlertDialogOverlay>
//             <AlertDialogContent>
//               <AlertDialogHeader fontSize="lg" fontWeight="bold">
//                 Confirm Deletion
//               </AlertDialogHeader>

//               <AlertDialogBody>
//                 Are you sure you want to delete this comment? This
//                 action cannot be undone.
//               </AlertDialogBody>

//               <Flex
//                 m="4"
//                 gap="3"
//                 align="center"
//                 justify="flex-start"
//               >
//                 <Button
//                   variant="soft"
//                   color="gray"
//                   onClick={onCloseAlert}
//                   ref={cancelRef}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   color="red"
//                   onClick={() => {
//                     onCloseAlert();
//                     deleteComment.mutate({
//                       commentId: comment._id,
//                       commenterId: comment.user._id,
//                     });
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </Flex>
//             </AlertDialogContent>
//           </AlertDialogOverlay>
//         </AlertDialog>
//       </Box>
//     </Flex>
//   )}
//   <LoginModal
//     isOpen={isOpen}
//     onClose={onClose}
//     redirectLink={`/blog/${postId}`}
//   />
//   {replyingTo === comment._id && (
//     <ReplyComment
//       postId={postId}
//       postSlug={postSlug}
//       replyingTo={comment.user}
//       parentComment={comment._id}
//       onCancelReply={handleCancelReply}
//     />
//   )}
// </Flex>
// </Flex>
// {comment.replies && comment.replies.length > 0 && (
// <Box pl={6}>

// </Box>
// )} */}
