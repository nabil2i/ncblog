import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import usePosts from "../../hooks/usePosts";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";

const SimplePostGrid = () => {
  const { data: payload, error, isLoading } = usePosts();
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
        <Text textAlign={"center"}>
          {" "}
          We encountered a problem. Please retry later.
        </Text>
      )}

      {!error && (
        <>
          {data?.count as number > 0 &&
            <Heading as="h2" size="2xl"> 
            Latest Posts
          </Heading> 
          }

          <VStack paddingBottom={5} align={"center"}>
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

              {data?.results.slice(0, 3).map((post) => (
                <BlogPostCardContainer key={post._id}>
                  <BlogPostCard post={post} />
                </BlogPostCardContainer>
              ))}
            </SimpleGrid>
          </VStack>
        </>
      )}
    </>
  );
};

export default SimplePostGrid;
