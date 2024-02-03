import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AccountTab from "../../components/account/AccountTab";
import DashSidebar from "../../components/admin/dashsidebar/DashSidebar";
import DashPosts from "./DashPosts";
import DashUsers from "./DashUsers";

const DashboardPage = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  // const { isOpen, onClose, onToggle } = useDisclosure();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <>
      <Flex direction={{ base: "column", lg: "row" }}>
        <Box
          width={{ lg: "300px" }}
          display={{ base: "none", lg: "flex" }}
          position="relative"
        >
          <DashSidebar />
        </Box>
        <Box w="full">
          {tab === "profile" && <AccountTab />}
          {tab === "posts" && <DashPosts />}
          {tab === "users" && <DashUsers />}
          {!tab && <Box>Dashboard</Box>}
        </Box>
      </Flex>
      {/* <Box w="full">
        {tab === "posts" &&
          <Flex direction="column" maxW="1440px" p={4}>
            <Flex justify="space-between" align="center">
              <Box>Posts</Box>
              <AddPostButton />
            </Flex>
            <Box>
              <PostsTable />
            </Box>
          </Flex>
        }
        {tab === "users" &&
          <Flex direction="column" maxW="1440px" p={4}>
            <Flex justify="space-between" align="center">
              <Box>Users</Box>
              <AddPostButton />
            </Flex>
            <Box>
              <UsersTable />
            </Box>
          </Flex>
        }
        {!tab && <Box>Dashboard</Box>}
      </Box> */}
    </>
  );
};

export default DashboardPage;
