import { Box, Heading, Text } from "@chakra-ui/react";

const Headline = () => {
  return (
    <Box m="5" textAlign="center">
      <Heading as='h2' size='2xl' > Welcome to NabilConveys</Heading>
      <Text m="0" mt="1">
        {" "}
        Conveying the message of God Almighty to the pondering souls.
      </Text>
    </Box>
  );
};

export default Headline;
