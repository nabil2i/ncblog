import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { authSatus } from "../../app/features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import Post from "../../entities/Post";
import { useSearchPostQueryStore } from "../../store";
import CallToAction from "../common/CallToAction";
import { CustomButton } from "../common/CustomButton";
import { LoginModal } from "../common/LoginModal";
import AddComment from "./AddComment";
import BlogPostComments from "./BlogPostComments";
import BlogPostInfo from "./BlogPostInfo";
import PostImage from "./PostImage";

const BlogPostDetails = ({ post }: { post: Post }) => {
  const setCategory = useSearchPostQueryStore((s) => s.setCategory);
  // console.log(post);
  const isAuthenticated = useAppSelector(authSatus);
  // const navigate = useNavigate();
  const [addComment, setAddComment] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const navigate = useNavigate();

  const handleComment = () => {
    if (isAuthenticated) {
      setAddComment(true);
    } else {
      onOpen();
      // navigate(`/login?redirect=/post/${post._id}`)
    }
  };

  // console.log(post)

  return (
    <Box w="full">
      <Box>
        <Heading mb={2}>{post.title}</Heading>
      </Box>
      {post.category && (
        <Button
          onClick={() => {
            setCategory(post.category as string);
            // navigate(`/search?q=${post.category}`)
          }}
        >
          {post.category}
        </Button>
      )}

      <Box my={4}>
        <PostImage img={post.img as string} />
      </Box>

      <BlogPostInfo post={post} />
      <Divider orientation="horizontal" color="gray.500" my="4" />
      <Box>
        {/* <div className="p-3 max-w-[1440px] mw-auto w-full post-content"></div> */}
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </Box>
      {/* <Divider orientation="horizontal" color="gray.500" my="4" /> */}
      <Box m={5}>
        <CallToAction />
      </Box>
      <Divider orientation="horizontal" color="gray.500" my="4" />

      <Flex justify="center">
        <CustomButton onClick={handleComment} text={"(" + post.totalCommentsCount + ")" + "Comment"}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </CustomButton>
        <LoginModal
          isOpen={isOpen}
          onClose={onClose}
          redirectLink={`/blog/${post.slug}`}
        />
      </Flex>

      <Divider orientation="horizontal" color="gray.500" my="4" />
      {post.comments && (
        <Box>
          <BlogPostComments post={post} />
        </Box>
      )}
      {addComment && <AddComment post={post} />}
    </Box>
  );
};

export default BlogPostDetails;
