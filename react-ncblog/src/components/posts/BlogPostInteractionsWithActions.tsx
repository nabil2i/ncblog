import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { authSatus } from "../../app/features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import Post from "../../entities/Post";
import useAuth from "../../hooks/useAuth";
import useFetchPostLikeStatus from "../../hooks/useFetchPostLikeStatus";
import useLikeUnlikePost from "../../hooks/useLikeUnlikePost";
import { CustomButton } from "../common/CustomButton";

interface Props {
  post: Post;
  // onLikePost: () => void;
  // likeCount: number;
  // onCommentPost: () => void;
}
const BlogPostInteractions = ({ post }: Props) => {
  const { _id } = useAuth();
  const isAuthenticated = useAppSelector(authSatus);
  const navigate = useNavigate();
  // const [likeCount, setLikeCount] = useState(post.likeCount);
  // const [isLiked, setIsLiked] = useState<boolean>(!!post.hasLiked);

  const { data: payload } = useFetchPostLikeStatus(post._id);
  // console.log("like status: ",payload?.data)

  const hasLiked = payload?.data.hasLiked || false;
  const likeCount = payload?.data.likeCount || 0;

  // console.log("hasLiked: ", hasLiked);
  // console.log("likeCount: ", likeCount);

  const likeUnlikePost = useLikeUnlikePost(
    post._id,
    (errorMessage) => {
      console.log("Error: ", errorMessage);
    }
  );

  const handleLikeUnlikePost = async () => {
    if (isAuthenticated) {
      // console.log("Like or Unlike the post: ", postId);
      likeUnlikePost.mutate();
    }
  };

  return (
    <Flex justify="space-between">
      <Flex gap={2}>
        {/* <Flex gap={1} align="center">
          <CustomButton >
            <FiMessageCircle />
          </CustomButton>
          {Number(post.totalCommentsCount) > 0 && (
            <Box>{post.totalCommentsCount}</Box>
          )}
        </Flex> */}
        <Flex gap={2} align="center">
          <CustomButton onClick={handleLikeUnlikePost}>
            <FaHeart
              className={`text-gray-400 hover:text-teal-500
                ${isAuthenticated && hasLiked && "text-teal-500"} 
              `}
            />
          </CustomButton>
          {/* {Number(post.numberOfLikes) > 0 && <Box>{post.numberOfLikes}</Box>} */}
          {likeCount > 0 && <Box>{likeCount}</Box>}
        </Flex>
      </Flex>

      <Box>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <FiMoreHorizontal />
          </MenuButton>

          <MenuList alignItems={"center"}>
            {isAuthenticated && post.postAuthorId?._id === _id && (
              <MenuItem onClick={() => navigate(`/myposts/edit/${post._id}`)}>
                Edit the post
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default BlogPostInteractions;
