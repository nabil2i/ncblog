import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../../components/admin/dashsidebar/DashSidebar";
import PostsTable from "../../components/admin/posts/PostsTable";

const DashboardPage = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  const { isOpen, onClose, onToggle } = useDisclosure();

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
        <Box width={{ lg: "300px" }}>
          <DashSidebar />
        </Box>
        <Box w="full">
          {/* {tab === "profile" && <AccountTab />} */}
          {tab === "posts" && <PostsTable />}
        </Box>
      </Flex>
    </>
  );
};

export default DashboardPage;
