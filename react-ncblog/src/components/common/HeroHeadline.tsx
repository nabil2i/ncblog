import { Box, Heading, Text } from "@chakra-ui/react";

const Headline = () => {
  return (
    <Box m="5" textAlign="center">
      <Heading as="h1" size={{ base: "3xl", lg: "2xl" }}>
        {" "}
        NabilConveys
      </Heading>
      <Text m="0" mt="1" fontSize="2xl">
        {" "}
        Conveying the message of God Almighty to the pondering souls.
      </Text>
    </Box>
  );
};

export default Headline;
