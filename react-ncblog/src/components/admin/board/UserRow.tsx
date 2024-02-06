import { Avatar, Td, Tr, useColorMode } from "@chakra-ui/react";
import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { useGetUsersQuery } from "../../../app/features/users/usersApiSlice";

const UserRow = ({ userId }: { userId: EntityId }) => {
  // const showOnLargeScreen = useBreakpointValue({ base: false, lg: true });

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.users.entities[userId],
    }),
  });
  // console.log(user)

  const { colorMode } = useColorMode();

  // console.log(user?.img);
  // console.log(role);

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
          <Td>{user.username}</Td>
        </Tr>
      </>
    );
  else return null;
};

const memoizedUser = memo(UserRow);

export default memoizedUser;
