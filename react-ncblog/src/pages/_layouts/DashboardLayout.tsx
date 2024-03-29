import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DashSidebar from "../../components/admin/dashsidebar/DashSidebar";

const DashboardLayout = () => {
  return (
    <>
      <Flex direction={{ base: "column", lg: "row" }}>
        <Box width={{ lg: "300px" }} display={{ base: "none", lg: "flex" }}>
          <DashSidebar />
        </Box>
        <Outlet />
      </Flex>
    </>
  );
};

export default DashboardLayout;
