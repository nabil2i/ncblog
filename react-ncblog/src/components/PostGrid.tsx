
import { SimpleGrid, Text } from '@chakra-ui/react';
import usePosts from '../hooks/usePosts';
import BlogPostCard from './BlogPostCard';
import BlogPostCardSkeleton from './BlogPostCardSkeleton';

const PostGrid = () => {
  const { posts, error, isLoading } = usePosts();
  const skeletons = [1, 2, 3, 4, 5];

  return (
    <>
      {error && <Text>{error}</Text> }
      <SimpleGrid columns={{ sm : 1, md : 2, lg : 3, xl : 5}} spacing={10} padding={10}>
        {isLoading && skeletons.map(skeleton => (
        <BlogPostCardSkeleton key={skeleton}></BlogPostCardSkeleton>))}

        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />))}
      </SimpleGrid>
    </>
  )
}

export default PostGrid