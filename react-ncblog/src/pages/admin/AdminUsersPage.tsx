import { Box, Flex } from "@chakra-ui/react";
import UsersTable from "../../components/admin/users/UsersTable";
// import AddUserButton from "../../components/admin/users/AddUserButton";

const UsersPage = () => {
  return (
    <>
      <Box>
        <Flex direction="column" maxW="1440px" p={4}>
          <Flex justify="space-between" align="center">
            <Box>Users</Box>
            {/* <AddUserButton /> */}
          </Flex>
          <Box>
            <UsersTable />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default UsersPage;
