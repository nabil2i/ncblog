import { Box, Flex, Heading, ListIcon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAdminLayout from "../useAdminLayout";
import { AdminNavItem } from "./adminnavitems";

interface Props {
  item: AdminNavItem;
}

const DashboardNavItem = ({ item }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  // console.log(tab, "from dashboard navigation")

  const { state } = useAdminLayout();
  const onCloseMain = state.onCloseMain;

  const isActive =
    tab === item.tab || (!tab && location.pathname === "dashboard");
  // console.log(isActive)
  // const isActive = item.href && location.pathname.startsWith(item.href);

  const { label } = item;

  if (item.type === "link") {
    const { icon, href } = item;

    const onClick = () => {
      navigate(`${href}`);
      onCloseMain();
    };
    return (
      <Box
      // display="flex"
      // alignItems="center"
      // justifyContent="center"
      // my={6}
      >
        <Box
          // as={NavLink} _hover={{ textDecoration: "none" }}
          // to={href as string}
          display="flex"
          fontWeight="medium"
          alignItems="center"
          // justifyContent={navSize === "small" ? "center" : ""} // delete
          gap={0}
          w="full"
          h="full"
          bg={isActive ? "teal" : ""}
          onClick={onClick}
          _hover={{
            textDecoration: "none",
            cursor: "pointer",
            // color: "white",
            bg: "teal",
          }}
        >
          <Flex align="center" justify="center">
            <ListIcon as={icon} fontSize={22} m={4} _hover={{ bg: "teal" }} />
          </Flex>

          {/* {navSize === "large" && ( */}
          <Flex>
            <Text>{label}</Text>
          </Flex>
          {/* )} */}
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

export default DashboardNavItem;
