import {
  Box,
  Flex,
  Show,
  Spinner,
  Table,
  TableContainer,
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
import {
  paginate,
  selectCurrentPage,
  selectLimit,
} from "../../../app/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import PaginationBox from "../../common/PaginationBox";
import PostRow from "./PostRow";

const PostsTable = () => {
  const page = Number(useAppSelector(selectCurrentPage));
  const limit = Number(useAppSelector(selectLimit));
  const dispatch = useAppDispatch();
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    // error,
  } = useGetPostsQuery({
    data: "postsList",
    limit,
    // startIndex,
    page,
    pollingInterval: ms("24h"),
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const posts = data?.posts;
  const pagination = data?.pagination;
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
          <Td colSpan={2} textAlign="center"> Nothing to show</Td>
        </Tr>
        // <Table.Row>
        //   <Table.Cell colSpan={2} className="text-center">
        //   Nothing to show
        //   </Table.Cell>
        // </Table.Row>
      );

      return (
        <>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th colSpan={3} fontSize={{ base: "sm", md: "md" }}></Th>
                </Tr>
                <Tr>
                  <Th>Posts</Th>
                  <Show above="lg">
                    <Th> Category</Th>
                  </Show>
                  <Th></Th>
                </Tr>
              </Thead>

              <Tbody>{tableContent}</Tbody>
            </Table>
          </TableContainer>
          {pagination?.count && pagination.count >= 2 ? (
            <Flex p={4} w="full" justify="center">
              <PaginationBox
                itemPerPage={pagination?.limit as number}
                totalItems={pagination?.count as number}
                currentPage={pagination?.current as number}
                prev={pagination?.prev as number}
                next={pagination?.next as number}
                paginate={(page) => dispatch(paginate(page))}
              ></PaginationBox>
            </Flex>
          ) : (
            <></>
          )}
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
