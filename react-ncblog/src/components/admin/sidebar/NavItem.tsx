import { Box, Flex, Heading, ListIcon, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import useAdminLayout from "../useAdminLayout";
import { AdminNavItem } from "./adminnavitems";

interface Props {
  item: AdminNavItem;
}

const NavItem = ({ item }: Props) => {
  const { state, dispatch } = useAdminLayout();
  const navSize = state.navSize;

  const location = useLocation();

  const isActive = item.href && location.pathname.startsWith(item.href);

  const { label } = item;

  if (item.type === "link") {
    const { icon, href } = item;

    return (
      <Box
      // display="flex"
      // alignItems="center"
      // justifyContent="center"
      // my={6}
      >
        <Box
          as={NavLink}
          to={href as string}
          display="flex"
          fontWeight="medium"
          alignItems="center"
          // justifyContent={navSize === "small" ? "center" : ""} // delete
          gap={0}
          w="full"
          h="full"
          bg={isActive ? "teal" : ""}
          onClick={() => dispatch({ type: "TOGGLE_MOBILE_SIDEBAR" })}
          // color={isActive ? "white" : ""}
          // activeClassName={"custom-active-nav-item"}
          // colorScheme={isActive ? "red" : "gray.400"}
          // p={navSize === "small" ? 2 : 4}
          // className={isActive ? '.custom-active-nav-item' : ""}
          // className={({isActive}) => (isActive ? "custom-active-nav-item" : "")}
          _hover={{
            textDecoration: "none",
            // color: "white",
            bg: "teal",
          }}
        >
          <Flex align="center" justify="center">
            <ListIcon as={icon} fontSize={22} m={4} _hover={{ bg: "teal" }} />
          </Flex>

          {navSize === "large" && (
            <Flex>
              <Text>{label}</Text>
            </Flex>
          )}
        </Box>
      </Box>
    );
  }

  // if has children, return the header
  return (
    <Heading
      color="gray.400"
      fontWeight="medium"
      textTransform="uppercase"
      fontSize="sm"
      borderTopWidth={1}
      borderColor="gray.100"
      // pt={navSize === "large" ? 3 : 0}
      // my={6}
    >
      {/* {navSize === "large" && <Text>{label}</Text>} */}
    </Heading>
  );
};

export default NavItem;
