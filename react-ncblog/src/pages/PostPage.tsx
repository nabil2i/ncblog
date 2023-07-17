import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { Heading, Spinner, VStack, Text } from "@chakra-ui/react";

const PostPage = () => {
  const { id } = useParams();
  const { data: post, isLoading, error } = usePost(id!);

  if (isLoading) return <VStack marginTop={2}><Spinner /></VStack>;

  if (error || !post) throw error;

  return (
    <>
      <Heading>{post.title}</Heading>
      <Text>{post.body}</Text>
    </>
  );
};

export default PostPage;
