import {
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { NavLink } from "react-router-dom";
// import usePosts from "../../../hooks/usePosts";
import { useGetPostsQuery } from "../../../api/features/postsApiSlice";
import BlogPostDate from "../../posts/BlogPostDate";
import DeletePostAction from "./DeletePostAction";
import EditPostAction from "./EditPostAction";
import PostRow from "./PostRow";

const PostsTable = () => {
  // from postsApiSlice
  const {
    data: posts,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetPostsQuery({});
  // console.log(posts)

  // from postsSlice
  // const posts = useSelector(selectAllPosts);
  // const isLoading = useSelector(getPostsStatus);
  // const error = useSelector(getPostsError);

  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, []);

  // const { data: payload, error, isLoading } = usePosts();
  // const data = payload?.data;

  if (isLoading)
    return (
      <Box p={10}>
        <Flex justify="center">
          <Spinner />
        </Flex>
      </Box>
    );

  if (isError)
    return (<Text> We encountered a problem.</Text>);
  
  if (isSuccess) {
    const { ids } = posts;
    const tableContent = ids?.length
      ? ids.map(postId => <PostRow key={postId} postId={postId} />)
      : (<Tr><Td> Nothing to show</Td></Tr>)
      
    return (
      <>
        <Table>
          <Thead>
            <Tr>
              <Th colSpan={2} fontSize={{ base: "sm", md: "md" }}>Post</Th>
            </Tr>
          </Thead>

          <Tbody>
            {tableContent}
          </Tbody>
        </Table>
      </>
    );
  }
};

export default PostsTable;

{/* <Td display={{ base: "none", lg: "flex" }}>
      <BlogPostDate date={post.createdAt} />
    </Td> 
    
      
    <Td>
      <Flex gap="3" align="center">
        <EditPostButton postId={post._id as string} />
        <DeletePostButton postId={post._id as string} />
      </Flex> 
    </Td>*/}