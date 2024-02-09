import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import Post from "../../entities/Post";
import { useSearchPostQueryStore } from "../../store";
import CallToAction from "../common/CallToActionIera";
import BlogPostComments from "./BlogPostComments";
import BlogPostInfo from "./BlogPostInfo";
import PostImage from "./PostImage";

const BlogPostDetails = ({ post }: { post: Post }) => {
  const setCategory = useSearchPostQueryStore((s) => s.setCategory);
  // console.log(post);
  // const isAuthenticated = useAppSelector(authSatus);
  // const navigate = useNavigate();

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const navigate = useNavigate();

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

      {post.comments && (
        <Box>
          <BlogPostComments postSlug={post.slug} postId={post._id} />
        </Box>
      )}
    </Box>
  );
};

export default BlogPostDetails;
