import { Box, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
// import { PostQuery } from "../App";
import useUserPosts from "../../hooks/useUserPosts";
import PaginationBox from "../common/PaginationBox";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";
import UserBlogPostCard from "./UserBlogPostCard";

interface Props {
  paginate?: (page: number) => void;
}

const UserPostGrid = ({ paginate }: Props) => {
  const { data: payload, error, isLoading } = useUserPosts();
  const data = payload?.data;
  // console.log(data);

  if (isLoading)
    return (
      <Box p={10}>
        <VStack marginTop={2}>
          <Spinner />
        </VStack>
      </Box>
    );

  const skeletons = [1, 2, 3, 4];

  return (
    <>
      {error && (
        <Text py={8} textAlign={"center"}>
          {" "}
          We encountered a problem. Please retry later.
        </Text>
      )}

      <VStack paddingBottom={5}>
        <SimpleGrid
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
        </SimpleGrid>

        {data?.count && data.count > 1 && paginate ? (
          <PaginationBox
            itemPerPage={data?.perPage as number}
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
            <Text>Nothing found.</Text>
          </VStack>
        )}
      </VStack>
    </>
  );
};

export default UserPostGrid;
