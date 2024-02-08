import { Box, Flex } from "@chakra-ui/react";
import Board from "../common/Board";

const DashBoard = () => {
  return (
    <Flex direction="column" maxW="1440px" mx="auto" p={4}>
      <Box as="h1" fontSize={50}>
        Dashboard
      </Box>
      <Board />
    </Flex>
  );
};

export default DashBoard;
