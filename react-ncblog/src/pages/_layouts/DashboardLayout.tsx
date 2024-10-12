import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DashSidebar from "../../components/admin/dashsidebar/DashSidebar";
import Notification from "../../components/common/Notification";

const DashboardLayout = () => {
  return (
    <>
      <Notification />
      <Flex direction={{ base: "column", lg: "row" }}>
        <Box maxW={{ lg: "300px" }} display={{ base: "none", lg: "flex" }}>
          <DashSidebar />
        </Box>
        <Outlet />
      </Flex>
    </>
  );
};

export default DashboardLayout;
