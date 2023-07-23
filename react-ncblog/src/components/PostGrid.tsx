import { Box, Heading, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
// import { PostQuery } from "../App";
import usePosts from "../hooks/usePosts";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";
import PaginationBox from "./PaginationBox";
// import usePostQueryStore from "../store";

interface Props {
  // postQuery: PostQuery;
  paginate: (page: number) => void;
//   // prevPaginate: (page: number) => void;
//   // nextPaginate: (page: number) => void;
}

const PostGrid = (
  { 
  // postQuery, 
  paginate }: Props
  ) => {

  //const { posts, error, isLoading } = usePosts();
  const { data, error, isLoading } = usePosts();
  // console.log(data);
 

  if (isLoading) return <VStack marginTop={2}><Spinner /></VStack>;

  const skeletons = [1, 2, 3, 4];

  return (
    <>
      {/* {error && <Text>{error}</Text>} */}
      {error && <Text> We encountered a problem.</Text>}
      {/* <Box m="5" textAlign="center">
        <Heading as="h2" size="2xl">
         Posts
        </Heading>
      </Box> */}
      
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

        <PaginationBox
            postPerPage={data?.perPage as number} 
            totalPosts={data?.count as number}
            currentPage={data?.current as number}
            prev={data?.prev as number}
            next={data?.next as number}
            paginate={paginate}
            // prevPaginate={prevPaginate}
            // nextPaginate={nextPaginate}
          ></PaginationBox>
      </VStack>
      
    </>
  );
};

export default PostGrid;
