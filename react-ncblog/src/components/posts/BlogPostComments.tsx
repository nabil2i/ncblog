import {
  Box,
  Button,
  Divider,
  Flex,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { authSatus } from "../../app/features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import usePostComments from "../../hooks/usePostComments";
import { usePostCommentQueryStore } from "../../store";
import { CustomButton } from "../common/CustomButton";
import { LoginModal } from "../common/LoginModal";
import AddComment from "./AddComment";
import BlogPostComment from "./BlogPostComment";

interface Props {
  postSlug: string;
  postId: string;
}

const BlogPostComments = ({ postSlug, postId }: Props) => {
  const { isOpen, onClose } = useDisclosure();
  const isAuthenticated = useAppSelector(authSatus);
  const setOrder = usePostCommentQueryStore((s) => s.setOrder);
  // const postCommentQuery = usePostCommentQueryStore(s => s.postCommentQuery)

  useEffect(() => {
    setOrder("desc");
    // console.log(postCommentQuery);
  }, [setOrder]);

  const {
    data: payload,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePostComments(postId);

  // console.log("Payload ", payload);

  const comments =
    payload?.pages.flatMap((page) => page.data.results) ||
    // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    [];
  const commentCount = payload?.pages[0].data.stats?.totalItems;
  // const topLevelCommentCount = payload?.pages[0].data.count;
  // console.log("Comments: ", comments);

  return (
    <>
      {isLoading && (
        <Box py={8}>
          <Spinner />
        </Box>
      )}

      <Divider orientation="horizontal" color="gray.500" my="4" />
      <Flex justify="center">
        <CustomButton text={"(" + commentCount + ")" + "Comment"}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </CustomButton>
        <LoginModal
          isOpen={isOpen}
          onClose={onClose}
          redirectLink={`/blog/${postSlug}`}
        />
      </Flex>

      <Divider orientation="horizontal" color="gray.500" my="4" />

      {isAuthenticated && <AddComment postId={postId} />}

      {/* Comments */}
      {comments?.map((comment) => (
        // <Box key={comment._id}></Box>
        <Box key={comment?._id} pl={0}>
          <BlogPostComment comment={comment} postId={postId} />
        </Box>
      ))}

      {/* Load more comments button */}
      {hasNextPage && (
        <Flex mt={4}>
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            variant="outline"
            size={"sm"}
          >
            {isFetchingNextPage ? "Loading more..." : "View More Comments"}
          </Button>
        </Flex>
      )}
      {/* <Divider orientation="horizontal" color="gray.500" my="4" /> */}
    </>
  );
};

export default BlogPostComments;
