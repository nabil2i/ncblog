import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { PostComment } from "../../entities/Post";
import useCommentReplies from "../../hooks/useCommentReplies";
import { LoginModal } from "../common/LoginModal";
import CommentBox from "./CommentBox";
import CommentInteractions from "./CommentInteractions";
import CommentOwnerAvatar from "./CommentOwnerAvatar";
import LikeCommentButton from "./LikeCommentButton";
import ReplyComment from "./ReplyComment";

interface Props {
  postId: string;
  comment: PostComment;
}

const BlogPostComment = ({ postId, comment }: Props) => {
  // console.log("Comment: ", comment._id, comment.replyCount);
  const [focusCommentId, setFocusCommentId] = useState<string>("");

  const [isEditing, setIsEditing] = useState<boolean>(false);

  // const [commentOwnerId, setCommentOwnerId] = useState<string>("");

  const [topParentCommentId, setTopParentCommentId] = useState<string | null>(
    null
  );
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const [realParentCommentId, setRealParentCommentId] = useState<string | null>(
    null
  );

  const [editedContent, setEditedContent] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showReplies, setShowReplies] = useState(false);
  const [fetchReplies, setFetchReplies] = useState(false); // State for fetching replies

  const handleCancelReply = () => {
    setRealParentCommentId(null);
    setIsReplying(false);
  };

  const {
    data: payload,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    fetchNextPage,
  } = useCommentReplies(postId, comment._id, {
    enabled: fetchReplies,
    order: "asc",
    limit: 3,
  }); // Use enabled option

  const replies =
    payload?.pages.flatMap((page) => page.data.results) ||
    // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    [];

  // Toggle replies display and fetch
  const handleToggleReplies = () => {
    setShowReplies((prev) => {
      if (!prev && comment.replyCount > 0 && !fetchReplies) {
        setFetchReplies(true); // Only fetch replies if they are being displayed
      }
      return !prev; // Toggle visibility
    });
  };

  // const replyCount = payload?.pages[0].data.count;
  // console.log("replies", replies);

  // Load more replies if available
  const handleLoadMoreReplies = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleNewReply = () => {
    // // Append the new reply to the current replies
    // setReplies((prevReplies) => [...prevReplies, newReply]);
  
    // Ensure that replies are shown
    // setShowReplies(true);
  };

  return (
    <>
      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        redirectLink={`/blog/${postId}`}
      />

      {/* MAIN COMMENT */}
      <Flex direction="row" gap="2" mb="5" mt="5">
        <CommentOwnerAvatar comment={comment} />
        <Flex direction="row" width="100%" gap={2} alignItems={"flex-start"}>
          <Flex direction="column" gap="1" width={"100%"}>
            <CommentBox
              comment={comment}
              focusCommentId={focusCommentId}
              setFocusCommentId={setFocusCommentId}
              postId={postId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editedContent={editedContent}
              setEditedContent={setEditedContent}
            />

            <CommentInteractions
              comment={comment}
              postId={postId}
              focusCommentId={focusCommentId}
              setFocusCommentId={setFocusCommentId}
              setRealParentCommentId={setRealParentCommentId}
              setTopParentCommentId={setTopParentCommentId}
              setIsEditing={setIsEditing}
              setEditedContent={setEditedContent}
              setIsReplying={setIsReplying}
              onOpen={onOpen}
            />

            {/* Toggle to show/hide replies */}
            {comment.replyCount > 0 && (
              <Flex>
                <Button variant="ghost" size="sm" onClick={handleToggleReplies}>
                  {showReplies ? (
                    <Box display="flex" alignItems="center">
                      <BsChevronUp />
                      <Box as="span" ml="8px">
                        Hide 
                        {" "}
                        {comment.replyCount > 1 ? "replies" : "reply"}
                      </Box>
                    </Box>
                  ) : (
                    <Box display="flex" alignItems="center">
                      <BsChevronDown />
                      <Box as="span" ml="8px">
                        View {comment.replyCount}{" "}
                        {comment.replyCount > 1 ? "replies" : "reply"}
                      </Box>
                    </Box>
                  )}
                </Button>
              </Flex>
            )}

            {/* REPLIES */}
            {showReplies && (
              // !comment.topParentCommentId &&
              // comment.replyCount > 0 &&

              <Box >
                {isLoading ? (
                  <Flex justify="center">
                    <Spinner size="sm" />
                  </Flex>
                ) : isError ? (
                  <Text color="red.500">
                    Failed to load replies. Please try again later.
                  </Text>
                ) : (
                  <>
                    {replies?.map((reply) => (
                      <Box key={reply?._id}>
                        <BlogPostComment comment={reply} postId={postId} />
                      </Box>
                    ))}
                    {/* Render each page of replies */}

                    {/* {payload?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                          {page.data.results.map((reply) => (
                            <Box key={reply._id} pl={14}>
                              <BlogPostComment
                                comment={reply}
                                postSlug={postSlug}
                                postId={postId}
                              />
                            </Box>
                          ))}
                        </React.Fragment>
                      ))} */}

                    {/* "Load More" button */}
                    {hasNextPage && (
                      <Flex>
                        <Button
                          onClick={handleLoadMoreReplies}
                          isLoading={isFetchingNextPage}
                          variant="ghost"
                          size="sm"
                        >
                          {isFetchingNextPage
                            ? "Loading more..."
                            : "View More Replies"}
                        </Button>
                      </Flex>
                    )}
                  </>
                )}
              </Box>
            )}

            {/* {comment.replyCount > 0 && (
              <Flex mt={4} ml={10}>
                <Button variant="link" size="sm" onClick={handleToggleReplies}>
                  {showReplies && !hasNextPage
                    ? "Hide Replies"
                    : `View ${comment.replyCount} more ${
                        comment.replyCount > 1 ? "replies" : "reply"
                      }`}
                </Button>
              </Flex>
            )} */}

            {realParentCommentId === comment._id &&
              // focusCommentId === comment._id &&
              isReplying && (
                <ReplyComment
                  postId={postId}
                  setIsReplying={setIsReplying}
                  setFocusCommentId={setFocusCommentId}
                  setRealParentCommentId={setRealParentCommentId}
                  setTopParentCommentId={setTopParentCommentId}
                  realParentCommentId={realParentCommentId}
                  topParentCommentId={topParentCommentId}
                  userRepliedTo={comment.userId}
                  onCancelReply={handleCancelReply}
                  handleNewReply={handleNewReply}
                />
              )}
          </Flex>

          <LikeCommentButton
            comment={comment}
            focusCommentId={focusCommentId}
            setFocusCommentId={setFocusCommentId}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default React.memo(BlogPostComment);
