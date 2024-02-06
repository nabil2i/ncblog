import { Box, Flex } from "@chakra-ui/react";
// import AddUserButton from "../../components/admin/users/AdduserButton";
import UsersTable from "../../components/admin/users/UsersTable";

const DashUsers = () => {
  return (
    <Flex direction="column" maxW="1440px" p={4}>
      <Flex justify="space-between" align="center">
        <Box as="h1" fontSize={50}>Users</Box>
        {/* <AddUserButton /> */}
      </Flex>
      <Box>
        <UsersTable />
      </Box>
    </Flex>
  );
};

export default DashUsers;
