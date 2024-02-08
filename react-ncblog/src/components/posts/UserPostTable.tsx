import {
  Box,
  Flex,
  Show,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
// import { PostQuery } from "../App";
import useUserPosts from "../../hooks/useUserPosts";
import PaginationBox from "../common/PaginationBox";
import PostRow from "./PostRow";

interface Props {
  paginate?: (page: number) => void;
}

const UserPostTable = ({ paginate }: Props) => {
  const { data: payload, error, isLoading } = useUserPosts();
  const data = payload?.data;
  // console.log(data);
  const posts = data?.results;

  if (isLoading)
    return (
      <Box p={10}>
        <VStack marginTop={2}>
          <Spinner />
        </VStack>
      </Box>
    );

  // const skeletons = [1, 2, 3];
  const tableContent = posts ? (
    posts.map((post) => <PostRow key={post._id} post={post} />)
  ) : (
    <Tr>
      <Td colSpan={3}> Nothing to show</Td>
    </Tr>
  );

  return (
    <>
      {error && (
        <Text py={8} textAlign={"center"}>
          {" "}
          We encountered a problem. Please retry later.
        </Text>
      )}

      <Flex
        width="full"
        direction="column"
        align="center"
        paddingBottom={5}
        gap={5}
      >
        <Box
          w="full"
          className="table-auto overflow-x-auto md:mx-auto scrollbar
           scrollbar-track-slate-100 scrollbar-thumb-slate-100
           dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
        >
          <Table overflowX="auto">
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
        </Box>
        {/* <SimpleGrid
          textAlign="center"
          columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
          spacing={3}
          padding={1}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <BlogPostCardContainer key={skeleton}>
                <BlogPostCardSkeleton />{" "}
              </BlogPostCardContainer>
            ))}

          {data?.results.map((post) => (
            <BlogPostCardContainer key={post._id}>
              <UserBlogPostCard post={post} />
            </BlogPostCardContainer>
          ))}
        </SimpleGrid> */}

        {data?.count && Math.ceil(data.count / data.limit) > 1 && paginate ? (
          <PaginationBox
            itemPerPage={data?.limit as number}
            totalItems={data?.count as number}
            currentPage={data?.current as number}
            prev={data?.prev as number}
            next={data?.next as number}
            paginate={paginate}
          ></PaginationBox>
        ) : (
          <></>
        )}

        {!data?.count && (
          <VStack>
            <Text>No posts could be retrived</Text>
          </VStack>
        )}
      </Flex>
    </>
  );
};

export default UserPostTable;
