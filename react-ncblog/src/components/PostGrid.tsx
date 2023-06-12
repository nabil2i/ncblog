import { Box, HStack, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import usePosts from "../hooks/usePosts";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";
import LatestPosts from "./LatestPosts";

const PostGrid = () => {
  const { posts, error, isLoading } = usePosts();
  const skeletons = [1, 2, 3, 4];

  return (
    <>
      {error && <Text>{error}</Text>}
      <LatestPosts></LatestPosts>
      
      <VStack>
        <SimpleGrid textAlign="center"
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={10}
          padding={10}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <BlogPostCardContainer>
                <BlogPostCardSkeleton key={skeleton}></BlogPostCardSkeleton>
              </BlogPostCardContainer>
            ))}
        
          {posts.map((post) => (
            <BlogPostCardContainer>
              <BlogPostCard key={post.id} post={post} />
            </BlogPostCardContainer>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default PostGrid;
