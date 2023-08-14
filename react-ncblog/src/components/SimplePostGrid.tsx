import { SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import usePosts from "../hooks/usePosts";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";

const SimplePostGrid = () => {
  const { data, error, isLoading } = usePosts();
  // postQuery.latestPosts = 3;

  if (isLoading)
    return (
      <VStack marginTop={2}>
        <Spinner />
      </VStack>
    );

  const skeletons = [1, 2, 3, 4];
  return (
    <>
      {error && (
        <Text textAlign={"center"}>
          {" "}
          We encountered a problem. Please retry later.
        </Text>
      )}

      {!error && (
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
        </VStack>
      )}
    </>
  );
};

export default SimplePostGrid;
