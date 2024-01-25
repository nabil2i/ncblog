import {
  Box,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// import usePosts from "../../../hooks/usePosts";
import { useGetPostsQuery } from "../../../api/features/postsApiSlice";
import PostRow from "./PostRow";
import { EntityId, EntityState } from "@reduxjs/toolkit";
import Post from "../../../entities/Post";

const PostsTable = () => {
  // from postsApiSlice
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    // error,
  } = useGetPostsQuery({});
  const posts = data?.posts
  // const pagination = data?.pagination;
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

  if (isError) return <Text> We encountered a problem.</Text>;

  if (isSuccess) {
    if (posts) {
      const { ids } = posts;
      const tableContent = ids?.length ? (
        ids.map((postId: EntityId) => <PostRow key={postId} postId={postId} />)
      ) : (
        <Tr>
          <Td> Nothing to show</Td>
        </Tr>
      );
  
      return (
        <>
          <Table>
            <Thead>
              <Tr>
                <Th colSpan={2} fontSize={{ base: "sm", md: "md" }}>
                  Post
                </Th>
              </Tr>
            </Thead>
  
            <Tbody>{tableContent}</Tbody>
          </Table>
        </>
      );
    }
  }
};

export default PostsTable;

{
  /* <Td display={{ base: "none", lg: "flex" }}>
      <BlogPostDate date={post.createdAt} />
    </Td> 
    
      
    <Td>
      <Flex gap="3" align="center">
        <EditPostButton postId={post._id as string} />
        <DeletePostButton postId={post._id as string} />
      </Flex> 
    </Td>*/
}
