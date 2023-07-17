import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { Heading, Spinner, VStack, Text, Box, Flex, Center } from "@chakra-ui/react";

const PostPage = () => {
  const { id } = useParams();
  const { data: post, isLoading, error } = usePost(id!);

  if (isLoading) return <VStack marginTop={2}><Spinner /></VStack>;

  if (error || !post) throw error;

  return (
    <>
    <Center>
    <Flex  direction="column" height="100%" alignContent={"center"} justifyContent={"center"}>
        <Heading>{post.title}</Heading>
        <Text>{post.body}</Text>
    </Flex>
    </Center>
      

    </>
  );
};

export default PostPage;
