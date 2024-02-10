import { Box, Flex } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import Post from "../../entities/Post";
import { readingTime } from "../../utils/post";
import { removeHtmlMarkup } from "../../utils/strings";
import { CustomButton } from "../common/CustomButton";

interface Props {
  post: Post;
  onLikePost: () => void;
  // onCommentPost: () => void;
}
const BlogPostInteractions = ({ post, onLikePost }: Props) => {
  return (
    <Flex justify="space-between">
      <Box fontSize={15}>
        {post && readingTime(removeHtmlMarkup(post.body))} read
      </Box>
      <Flex gap={2}>
        {/* <Flex gap={1} align="center">
          <CustomButton >
            <FiMessageCircle />
          </CustomButton>
          {Number(post.totalCommentsCount) > 0 && (
            <Box>{post.totalCommentsCount}</Box>
          )}
        </Flex> */}
        <Flex gap={1} align="center">
          <CustomButton onClick={() => onLikePost()}>
            <FaHeart className={`text-gray-400 hover:text-teal-500`} />
          </CustomButton>
          {Number(post.numberOfLikes) > 0 && <Box>{post.numberOfLikes}</Box>}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BlogPostInteractions;
