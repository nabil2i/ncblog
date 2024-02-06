import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorMode } from "@chakra-ui/react";
import { EntityId, EntityState } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import UserRow from "./UserRow";
import User from "../../../entities/User";

interface Props {
  isSuccess: boolean;
  users: EntityState<User, EntityId>
}

const UsersTable = ({ isSuccess, users }: Props) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  if (isSuccess) {
    if (users) {
      const { ids } = users;
      const tableContent = ids.length ? (
        ids.map((userId: EntityId) => <UserRow key={userId} userId={userId} />)
      ) : (
        <Tr>
          <Td colSpan={2} textAlign="center"> Nothing to show</Td>
        </Tr>
      )

      return (
        <Flex direction="column" w={{ base: "full", md: "auto" }} shadow="md" p={2} rounded="md" bg={ colorMode === 'light' ? '' : 'gray.900'}>
          <Flex justify="space-between" align="center" fontWeight="bold" p={3}>
            <Box as="h3" > Recent Users</Box>
            <Button variant="outline" colorScheme="teal" onClick={() => navigate("/dashboard?tab=users")}>
              See all users
            </Button>
          </Flex>

          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>User Profile</Th>
                  <Th>username</Th>
                </Tr>
              </Thead>
              <Tbody>{tableContent}</Tbody>
            </Table>
          </TableContainer>
        </Flex>
      );
    }
  }
};

export default UsersTable;
