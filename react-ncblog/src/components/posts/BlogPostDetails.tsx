import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import Post from "../../entities/Post";
import { CustomButton } from "../common/CustomButton";
import useAuth from "../navigationbar/useAuth";
import AddComment from "./AddComment";
import BlogPostComments from "./BlogPostComments";
import BlogPostInfo from "./BlogPostInfo";
import { LoginModal } from "../common/LoginModal";

const BlogPostDetails = ({ post }: { post: Post }) => {
  // console.log(post);
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [addComment, setAddComment] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleComment = () => {
    if (userData.isAuthenticated) {
      setAddComment(true);
    } else {
      onOpen();
      // navigate(`/login?redirect=/post/${post._id}`)
    }
  };

  return (
    <>
      <Heading mb={2}>{post.title}</Heading>
      <BlogPostInfo post={post} />
      {/* <Center m={5}>
        <PostImage />
      </Center> */}
      <Divider orientation="horizontal" color="gray.500" my="4" />
      <Box>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </Box>
      <Divider orientation="horizontal" color="gray.500" my="4" />
      <Flex justify="center">
        <CustomButton onClick={handleComment} text="Comment">
          <FontAwesomeIcon icon={faPaperPlane} />
        </CustomButton>
        <LoginModal
          isOpen={isOpen}
          onClose={onClose}
          redirectLink={`/blog/${post._id}`}
        />
      </Flex>
      <Divider orientation="horizontal" color="gray.500" my="4" />
      {addComment && <AddComment />}
      {post.comments && (
        <Box>
          <BlogPostComments comments={post.comments} postId={post._id as string}/>
        </Box>
      )}
    </>
  );
};

export default BlogPostDetails;