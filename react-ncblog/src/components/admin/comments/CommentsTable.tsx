import {
  Box,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EntityId } from "@reduxjs/toolkit";
import ms from "ms";
import { useGetCommentsQuery } from "../../../app/features/comments/commentsApiSlice";
import {
  paginate,
  selectCurrentPage,
  selectLimit,
} from "../../../app/features/comments/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import PaginationBox from "../../common/PaginationBox";
import CommentRow from "./CommentRow";

const CommentsTable = () => {
  const page = Number(useAppSelector(selectCurrentPage));
  const limit = Number(useAppSelector(selectLimit));
  const dispatch = useAppDispatch();
  // const [startIndex, setStartIndex] = useState<number>(0);
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    // error,
  } = useGetCommentsQuery({
    data: "commentsList",
    limit,
    // startIndex,
    page,
    pollingInterval: ms("24h"),
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const comments = data?.comments;
  const pagination = data?.pagination;
  // console.log(data);
  // const existingComments = useGetCommentsQuery({
  //   data: "commentsList", // Make sure to use the same data key
  //   limit: commentLimit,
  //   startIndex,
  // });

  const showOnLargeScreen = useBreakpointValue({ base: false, lg: true });
  // const pagination = data?.pagination;
  // console.log(comments)

  // const comments = useSelector(selectAllComments);
  // const isLoading = useSelector(getCommentsStatus);
  // const error = useSelector(getCommentsError);

  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(getComments());
  // }, []);

  // const { data: payload, error, isLoading } = useComments();
  // const data = payload?.data;

  // const [fetchNextUsers] = useGetUsersLazyQuery();

  // const nextUrl = data.nextUrl;

  // const getNextData = () => {
  //   fetchNextUsers({ nexturl })
  // }

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
    if (comments) {
      // const newCommentIds = comments.ids ?? [];
      // const existingCommentIds = existingComments.data?.comments?.ids ?? [];
      // const combinedIds = [...existingCommentIds, ...newCommentIds];
      // const uniqueIds = Array.from(new Set(combinedIds));

      // const tableContent = uniqueIds.length ? (
      //   uniqueIds.map((commentId: EntityId) => (
      //     <CommentRow key={commentId} commentId={commentId} />
      //   ))
      const { ids } = comments;
      const tableContent = ids?.length ? (
        ids.map((commentId: EntityId) => (
          <CommentRow key={commentId} commentId={commentId} />
        ))
      ) : (
        <Tr>
          <Td colSpan={5} textAlign="center">
            {" "}
            Nothing to show
          </Td>
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
                  <Th colSpan={5} fontSize={{ base: "sm", md: "md" }}></Th>
                </Tr>
                <Tr>
                  <Th>Date Updated</Th>
                  <Th>Comment Content</Th>
                  {showOnLargeScreen && (
                    <>
                      <Th>Number Of Llikes</Th>
                      {/* <Th>PostId</Th>
                  <Th>UserId</Th> */}
                      <Th>User name</Th>
                    </>
                  )}
                  <Th>Actions</Th>
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
          {/* {startIndex < data.stats.totalItems && (
              <Button onClick={() => setStartIndex(startIndex + commentLimit)}>
                Show More
              </Button>
            )}  */}
        </>
      );
    }
  }
};

export default CommentsTable;
