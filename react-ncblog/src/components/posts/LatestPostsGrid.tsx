import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import useLatestPosts from "../../hooks/useLatestPosts";
import BlogPostCard from "./BlogPostCard";
import BlogPostCardContainer from "./BlogPostCardContainer";
import BlogPostCardSkeleton from "./BlogPostCardSkeleton";

const SimplePostGrid = () => {
  const { data: payload, error, isLoading } = useLatestPosts();
  // const { data: payload, error, isLoading } = usePosts();
  const data = payload?.data;
  // console.log("posts data: ", data);

  // if (isLoading)
  //   return (
  //     <Box p={10}>
  //       <VStack marginTop={2}>
  //         <Spinner />
  //       </VStack>
  //     </Box>
  //   );

  if (error) return;

  const skeletons = [1, 2, 3];
  return (
    <>
      {/* {error && (
        <Text textAlign={"center"}>
          {" "}
          We encountered a problem. Please retry later.
        </Text>
      )} */}

      {!error && (
        <>
          {(data?.count as number) > 0 && (
            <Heading as="h2" size="2xl">
              Latest Posts
            </Heading>
          )}

          {/* <VStack paddingBottom={5} align={"center"}> */}
          <Flex flexWrap="wrap" justify="center" mx="auto">
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
          </Flex>
          {/* </VStack> */}
        </>
      )}
    </>
  );
};

export default SimplePostGrid;
