import { SimpleGrid, Spinner, VStack, Text, Box, Heading, Flex, Center } from '@chakra-ui/react'
import React from 'react'
import usePostQueryStore from '../store';
import BlogPostCardContainer from './BlogPostCardContainer';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';
import BlogPostCard from './BlogPostCard';
import usePosts from '../hooks/usePosts';

const SearchPostGrid = () => {
  const { data, error, isLoading } = usePosts();
  const searchText = usePostQueryStore(s => s.postQuery.searchText)
  
  if (isLoading) return <VStack marginTop={2}><Spinner /></VStack>;

  const skeletons = [1, 2, 3, 4];
  return (
    <>
    {error && <Text> We encountered a problem.</Text>}

    {/* <Center>
      <Flex
        direction="column"
        width= "1000px"
        // height="100%"
        // alignContent={"center"}
        // justifyContent={"center"}
        >
      </Flex>
    </Center> */}
      <Box paddingLeft={20} >
        {
          searchText && <Heading
                          as="h2"
                          marginY={5}
                          fontSize='5xl'>
                            {`Results for: ${searchText || ''}`}
                        </Heading>
              }
      </Box>
      <VStack paddingBottom={5}>
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
        </VStack>
      </>
  )
}

export default SearchPostGrid