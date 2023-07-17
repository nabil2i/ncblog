import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { Heading, Spinner, VStack, Text, Box, Flex, Center, SimpleGrid, GridItem } from "@chakra-ui/react";
import PostImage from "../components/PostImage";

const PostPage = () => {
  const { id } = useParams();
  const { data: post, isLoading, error } = usePost(id!);

  if (isLoading) return <VStack marginTop={2}><Spinner /></VStack>;

  if (error || !post) throw error;

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 1}}>
        <GridItem>
          <Center>
            <Flex
              direction="column"
              width= "1000px"
              // height="100%"
              // alignContent={"center"}
              // justifyContent={"center"}
              >
                <Heading>{post.title}</Heading>
                <Center m={5}>
                  <PostImage/>
                </Center>
                <Text>{post.body}</Text>
                <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, voluptates. Et molestiae adipisci iure expedita! Voluptatum doloribus recusandae aperiam expedita neque vero non accusantium, ipsa, soluta excepturi dolorem dolore nobis possimus! Sed minima sit reiciendis facere illum officiis blanditiis molestias aliquid architecto quod distinctio rerum harum maiores eius ratione consequuntur est, ipsa fuga! Itaque mollitia sit excepturi, magni est tempora aliquid illo ab accusantium? Dolores nostrum incidunt impedit tenetur, cumque quibusdam laborum similique nulla nemo nihil placeat deserunt facere culpa alias commodi perspiciatis modi rem. Quasi veritatis repellat recusandae libero cupiditate non quaerat obcaecati itaque eum perferendis. Voluptate, eius modi!</Text>
            </Flex>
          </Center>
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default PostPage;
