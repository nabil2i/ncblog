
import { Text } from '@chakra-ui/react';
import usePosts from '../hooks/usePosts';

const PostGrid = () => {
  const { posts, error} = usePosts();

  return (
    <>
      {error && <Text>{error}</Text> }
      <ul>
        {posts.map(post => <li key={post.id}> {post.title} </li>)}
      </ul>
    </>
  )
}

export default PostGrid