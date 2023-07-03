import { SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import usePosts from "../hooks/usePosts";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";
import LatestPosts from "./LatestPosts";

const PostGrid = () => {
  //const { posts, error, isLoading } = usePosts();
  const { data, error, isLoading } = usePosts();
  // console.log(data);

  if (isLoading) return <Spinner/>

  const skeletons = [1, 2, 3, 4];

  return (
    <>
      {/* {error && <Text>{error}</Text>} */}
      {error && <Text> We encountered a problem.</Text>}
      <LatestPosts></LatestPosts>

      <VStack>
        <SimpleGrid
          textAlign="center"
          columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
          spacing={10}
          padding={10}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <BlogPostCardContainer key={skeleton}>
                <BlogPostCardSkeleton /> {" "}
              </BlogPostCardContainer>
            )) 
          }

          {data.map((post) => (
            <BlogPostCardContainer key={post._id}>
              <BlogPostCard post={post} />
            </BlogPostCardContainer>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default PostGrid;
