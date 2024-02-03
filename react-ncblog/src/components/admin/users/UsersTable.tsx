import {
  Box,
  Flex,
  Show,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpoint,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EntityId } from "@reduxjs/toolkit";
import ms from "ms";
import { useGetUsersQuery } from "../../../app/features/users/usersApiSlice";
import UserRow from "./UserRow";

const UsersTable = () => {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    // error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: ms("60s"),
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const users = data?.users;
  const showOnLargeScreen = useBreakpointValue({ base: false, lg: true });
  // const pagination = data?.pagination;
  // console.log(users)

  // const users = useSelector(selectAllUsers);
  // const isLoading = useSelector(getUsersStatus);
  // const error = useSelector(getUsersError);

  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(getUsers());
  // }, []);

  // const { data: payload, error, isLoading } = useUsers();
  // const data = payload?.data;

  if (isLoading)
    return (
      <Box p={10}>
        <Flex justify="center">
          <Spinner />
        </Flex>
      </Box>
    );

  if (isError) return <Text> We encountered a problem.</Text>;

  if (isSuccess) {
    if (users) {
      const { ids } = users;
      const tableContent = ids?.length ? (
        ids.map((userId: EntityId) => <UserRow key={userId} userId={userId} />)
      ) : (
        <Tr>
          <Td colSpan={6}> Nothing to show</Td>
        </Tr>
        // <Table.Row>
        //   <Table.Cell colSpan={2} className="text-center">
        //   Nothing to show
        //   </Table.Cell>
        // </Table.Row>
      );

      return (
        <>
        <TableContainer>   
          <Table>
            <Thead>
            <Tr>
              <Th colSpan={6} fontSize={{ base: "sm", md: "md" }}></Th>
            </Tr>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              {showOnLargeScreen &&
              <>
                <Th>Date created</Th>
                <Th>Email</Th>
                <Th>Roles</Th>
              </>
              }
              <Th>Actions</Th>
            </Tr>
            </Thead>

            <Tbody>{tableContent}</Tbody>
          </Table>
        </TableContainer>
          {/* <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Cell colSpan={2} className="text-center">
              
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{tableContent}</Table.Body>
        </Table.Root>
         */}
        </>
      );
    }
  }
};

export default UsersTable;
