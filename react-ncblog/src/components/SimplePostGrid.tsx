import { SimpleGrid, Spinner, VStack, Text, Box, Heading } from '@chakra-ui/react'
import React from 'react'
import usePostQueryStore from '../store';
import BlogPostCardContainer from './BlogPostCardContainer';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';
import BlogPostCard from './BlogPostCard';
import usePosts from '../hooks/usePosts';

const SimplePostGrid = () => {
  const { data, error, isLoading } = usePosts();
  // const setSearchText = usePostQueryStore(s => s.setSearchText);
  
  
  if (isLoading) return <VStack marginTop={2}><Spinner /></VStack>;

  const skeletons = [1, 2, 3, 4];
  return (
    <>
    {/* {setSearchText('')} */}
    {error && <Text> We encountered a problem.</Text>}
    {/* <Box paddingLeft={20}>
      {
        searchText && <Heading
                        as="h2"
                        marginY={5}
                        fontSize='5xl'>
                          {`Results for: ${searchText || ''}`}
                      </Heading>
            }
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
      </VStack>
      </>
  )
}

export default SimplePostGrid