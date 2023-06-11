import  React, { useState, useEffect } from 'react'
import apiClient from '../services/api-client';
import { Text } from '@chakra-ui/react';

interface Post {
  id: number;
  title: string;
}

const PostGrid = () => {
 const [ posts, setPosts ] = useState<Post[]>([]);
 const [error, setError ] = useState('');

 useEffect(() => {
  apiClient
    .get('/posts')
    .then(res => setPosts(res.data))
    .catch(err => setError(err.message));
 })

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