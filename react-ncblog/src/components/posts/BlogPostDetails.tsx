import { Box, Button, Divider, Heading } from "@chakra-ui/react";
// import ReactMarkdown from "react-markdown";
import { authSatus } from "../../app/features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import Post from "../../entities/Post";
import { useSearchPostQueryStore } from "../../store";
import CallToAction from "../common/CallToActionIera";
import BlogPostComments from "./BlogPostComments";
import BlogPostInfo from "./BlogPostInfo";
import BlogPostInteractionsWithActions from "./BlogPostInteractionsWithActions";
import PostImage from "./PostImage";

const BlogPostDetails = ({ post }: { post: Post }) => {
  const setCategory = useSearchPostQueryStore((s) => s.setCategory);
  // const [addComment, setAddComment] = useState(false);

  // const toggleAddComment = () => setAddComment((prev) => !prev);

  // console.log(post);
  const isAuthenticated = useAppSelector(authSatus);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLikePost = async () => {
    if (isAuthenticated) {
      // console.log("comment id set", theCommentId);
      // likePost.mutate();
    } else {
      // onOpen();
    }
  };

  return (
    <Box w="full">
      <Box>
        <Heading mb={2}>
          <div className="" dangerouslySetInnerHTML={{ __html: post.title }} />
        </Heading>
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
        <BlogPostInteractionsWithActions
          post={post}
          // onCommentPost={handleCommentPost}
          onLikePost={handleLikePost}
        />
      </Box>
      <Divider orientation="horizontal" color="gray.500" my="4" />
      <Box>
        <div
          className="p-3 max-w-[1440px] mw-auto w-full"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        {/* <div className="p-3 max-w-[1440px] mw-auto w-full post-content"></div> */}
        {/* <ReactMarkdown>{post.body}</ReactMarkdown> */}
      </Box>
      {/* <Divider orientation="horizontal" color="gray.500" my="4" /> */}
      <Box m={5}>
        <CallToAction />
      </Box>

      {post.comments && (
        <Box>
          <BlogPostComments postSlug={post.slug} postId={post._id} />
        </Box>
      )}
      {/* <Divider orientation="horizontal" color="gray.500" my="4" />

      <Flex justify="center">
        <CustomButton
          onClick={handleCommentPost}
          text={"(" + post.totalCommentsCount + ")" + "Comment"}
          >
          <FontAwesomeIcon icon={faPaperPlane} />
        </CustomButton>
        <LoginModal
          isOpen={isOpen}
          onClose={onClose}
          redirectLink={`/blog/${post.slug}`}
          />
      </Flex>
      <Divider orientation="horizontal" color="gray.500" my="4" />
      {addComment && <AddComment postSlug={post.slug} postId={post._id} onCancelComment={toggleAddComment}/>} */}
    </Box>
  );
};

export default BlogPostDetails;
