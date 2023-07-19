import { Box, Heading, SimpleGrid, Spinner, VStack, Text } from "@chakra-ui/react";
import usePosts from "../hooks/usePosts";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";
import usePostQueryStore from "../store";
import SimpelPostGrid from "./SimpelPostGrid";

const LatestPosts = () => {
  // const { data, error, isLoading } = usePosts();
  // const searchText = usePostQueryStore(s => s.postQuery.searchText)
  

  // if (isLoading) return <VStack marginTop={2}><Spinner /></VStack>;

  // const skeletons = [1, 2, 3, 4];

  return (
    <>
      <Box m="5" textAlign="center">
        <Heading as="h2" size="2xl">
          {" "}
        Latest Posts
        </Heading>
      </Box>
      <SimpelPostGrid/>
      {/* {error && <Text> We encountered a problem.</Text>} */}

          {/* { searchText ? `Searched for: ${searchText}`: "Latest Posts" } */}

      {/* <VStack paddingBottom={5}>
        <SimpleGrid
          textAlign="center"
          columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
          spacing={10}
          padding={10}
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
      </VStack> */}
    </>
  );
};

export default LatestPosts;
