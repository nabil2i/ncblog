import { Box, Flex } from "@chakra-ui/react";
import Board from "../common/Board";

const DashBoard = () => {
  return (
    <Flex direction="column" maxW="1440px" p={4}>
      <Flex justify="space-between" align="center">
        <Box as="h1" fontSize={50}>Dashboard</Box>
      </Flex>
      <Board />
    </Flex>
  );
};

export default DashBoard;
