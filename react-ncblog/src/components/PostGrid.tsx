
import { SimpleGrid, Text } from '@chakra-ui/react';
import usePosts from '../hooks/usePosts';
import BlogPostCard from './BlogPostCard';

const PostGrid = () => {
  const { posts, error} = usePosts();

  return (
    <>
      {error && <Text>{error}</Text> }
      <SimpleGrid columns={{ sm : 1, md : 2, lg : 3, xl : 5}} spacing={10} padding={10}>
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />))}
      </SimpleGrid>
    </>
  )
}

export default PostGrid