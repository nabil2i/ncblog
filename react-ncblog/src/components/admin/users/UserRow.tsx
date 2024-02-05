import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Td,
  Tr,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { EntityId } from "@reduxjs/toolkit";
import dateFormat from "dateformat";
import { memo } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useGetUsersQuery } from "../../../app/features/users/usersApiSlice";
import { getRole } from "../../../utils/user";
import DeleteUserAction from "./DeleteUserAction";
import RoleBadge from "./RoleBadge";

const UserRow = ({ userId }: { userId: EntityId }) => {
  const showOnLargeScreen = useBreakpointValue({ base: false, lg: true });

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.users.entities[userId],
    }),
  });
  // console.log(user)

  const { colorMode } = useColorMode();
  const roles = user?.roles ? user.roles : ["No role"];
  const role = getRole(roles);
  // console.log(user?.img);
  // console.log(role);

  // // NORMAL SELECTOR
  // const user = useSelector((state: RootState) => selectUserById(state, id));
  // console.log(user);

  if (user)
    return (
      <>
        <Tr
          _hover={{
            cursor: "pointer",
            bg: colorMode === "light" ? "teal.300" : "black",
          }}
        >
          <Td>
            <Avatar src={user.img} />
          </Td>
          <Td whiteSpace={"nowrap"}>
            <Flex direction="column" gap={2}>
              <Box fontSize={{ base: "20", lg: "initial" }}>
                {user.firstname + " " + user.lastname}
              </Box>
              <Flex display={{ lg: "none" }} direction="column" gap={3}>
                <Box color="gray">
                  {dateFormat(user.createdAt, "mmm dS, yyyy")}
                </Box>
                <Box>{user.email}</Box>
              </Flex>
            </Flex>
          </Td>
          {showOnLargeScreen && (
            <>
              <Td whiteSpace={"nowrap"}>
                {dateFormat(user.createdAt, "mmm dS, yyyy")}
              </Td>
              <Td>{user.email}</Td>
              <Td>
                <RoleBadge role={role} />
              </Td>
            </>
          )}
          <Td>
            <Flex align="center" gap={4}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MdOutlineMoreHoriz />}
                ></MenuButton>
                <MenuList>
                  {/* <ChangeRolesAction user={user} /> */}
                  <DeleteUserAction userId={user._id as string} />
                </MenuList>
              </Menu>
            </Flex>
          </Td>
        </Tr>
      </>
    );
  else return null;
};

const memoizedUser = memo(UserRow);

export default memoizedUser;
