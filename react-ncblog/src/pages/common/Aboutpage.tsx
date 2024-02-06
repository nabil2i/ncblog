import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import CallToActionOneReason from "../../components/common/CallToActionOneReason";
import CallToActionIera from "../../components/common/CallToActionIera";

const AboutPage = () => {
  return (
    <Box>
      <Grid
        templateAreas={{ base: `"main"` }}
        templateColumns={{ base: "1fr" }}
      >
        <GridItem area="main">
          <VStack as="section">
            <Box maxW="800px" mx="auto" w="full">
              <Flex direction="column" mt={5} gap={4} p={5}>
                <Flex direction="column" gap={4}>
                  <Heading textAlign="center">Nabil Conveys Blog</Heading>
                  <Text>
                    NabilConveys Blog is a blog that aims to convey the message
                    of God Almighty to the pondering souls, by discussing a
                    variety of topics related to beliefs and religion in
                    general, Islam is particular, life and more. <br></br>People
                    ultimately question themselves at some point in their lives
                    about where they come from, what's the real purpose of their
                    existence, and where are they going when they die. Some,
                    because of their life experiences, what goes on in the
                    world, the fact that they don't understand why certain
                    things happen, have come to adopt agnostic or atheistic
                    beliefs, rejecting the existence of God. Other refrain
                    themselves from talking about God and the purpose of life
                    for other reasons. <br></br>
                    In this context, NabilConveys Blog places itself as a simple
                    layman's attempt to have conversations with his fellow
                    brother and sister to better understand the purpose of life.
                  </Text>
                </Flex>
                <Flex align="end" direction="column">
                  <Box>See you soon</Box>
                </Flex>
              </Flex>
              <Flex m={5}>
                {/* <CallToActionOneReason /> */}
                <CallToActionIera />
              </Flex>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AboutPage;
