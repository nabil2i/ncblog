import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../../components/admin/dashsidebar/DashSidebar";
import PostsTable from "../../components/admin/posts/PostsTable";
import AddPostButton from "../../components/admin/posts/AddPostButton";

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
      <Flex direction={{ base: "column", lg: "row" }} >
        <Box width={{ lg: "300px" }} display={{ base: "none", lg: "flex"}}>
          <DashSidebar />
        </Box>
        <Box w="full">
          {/* {tab === "profile" && <AccountTab />} */}
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
          {!tab && <Box>Dashboard</Box>}
        </Box>
      </Flex>
    </>
  );
};

export default DashboardPage;
