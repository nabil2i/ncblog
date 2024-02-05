import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
// import { PostQuery } from "../App";
import usePosts from "../../hooks/usePosts";
import PaginationBox from "../common/PaginationBox";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";

interface Props {
  paginate?: (page: number) => void;
}

const PostGrid = ({ paginate }: Props) => {
  const { data: payload, error, isLoading } = usePosts();
  const data = payload?.data;
  // console.log(data);

  // if (isLoading)
  //   return (
  //     <Box p={10}>
  //       <VStack marginTop={2}>
  //         <Spinner />
  //       </VStack>
  //     </Box>
  //   );

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
              <BlogPostCard post={post} />
            </BlogPostCardContainer>
          ))}
        </SimpleGrid>

        {data?.count && data.count >= 2 && paginate ? (
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
            <Text>No posts</Text>
          </VStack>
        )}
      </VStack>
    </>
  );
};

export default PostGrid;
