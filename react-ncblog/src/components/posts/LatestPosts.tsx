import { Box } from "@chakra-ui/react";
import LatestPostsGrid from "./LatestPostsGrid";

const LatestPosts = () => {
  // const { data, error, isLoading } = usePosts();
  // const searchText = usePostQueryStore(s => s.postQuery.searchText)
  // const setLatestPosts = usePostQueryStore(s => s.setLatestPosts)

  // if (isLoading) return <VStack marginTop={2}><Spinner /></VStack>;

  // const skeletons = [1, 2, 3, 4];

  return (
    <>
      <Box as="section" textAlign="center">
        <LatestPostsGrid />
      </Box>
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
