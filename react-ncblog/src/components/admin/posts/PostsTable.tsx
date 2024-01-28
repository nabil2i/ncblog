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
import { EntityId } from "@reduxjs/toolkit";
import ms from "ms";
import { useGetPostsQuery } from "../../../app/features/posts/postsApiSlice";
import PostRow from "./PostRow";

const PostsTable = () => {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    // error,
  } = useGetPostsQuery("postsList", {
    pollingInterval: ms("60s"),
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const posts = data?.posts;
  // const pagination = data?.pagination;
  // console.log(posts)

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
          <Td colSpan={2}> Nothing to show</Td>
        </Tr>
        // <Table.Row>
        //   <Table.Cell colSpan={2} className="text-center">
        //   Nothing to show
        //   </Table.Cell>
        // </Table.Row>
      );

      return (
        <>
          <Table>
            <Thead>
              <Tr>
                <Th colSpan={2} fontSize={{ base: "sm", md: "md" }}></Th>
              </Tr>
            </Thead>

            <Tbody>{tableContent}</Tbody>
          </Table>
          {/* <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Cell colSpan={2} className="text-center">
              
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{tableContent}</Table.Body>
        </Table.Root>
         */}
        </>
      );
    }
  }
};

export default PostsTable;
