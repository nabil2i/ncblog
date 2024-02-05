import { Box, Flex } from "@chakra-ui/react";
// import AddUserButton from "../../components/admin/users/AdduserButton";
import CommentsTable from "../../components/admin/comments/CommentsTable";

const Dashcomments = () => {
  return (
    <Flex direction="column" maxW="1440px" p={4}>
      <Flex justify="space-between" align="center">
        <Box>comments</Box>
        {/* <AddUserButton /> */}
      </Flex>
      <Box>
        <CommentsTable />
      </Box>
    </Flex>
  );
};

export default Dashcomments;
