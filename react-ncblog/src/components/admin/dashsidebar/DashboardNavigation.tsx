import { Flex, List, ListItem } from "@chakra-ui/react";
import DashboardNavItem from "./DashboardNavItem";
import ADMIN_NAV_ITEMS from "./adminnavitems";

const DashboardNavigation = () => {
  return (
    <Flex
      overflowY="auto"
      // maxHeight="calc(100vh - 100px)"
      direction="column"
      overflowX={"hidden"}
    >
      <List>
        {ADMIN_NAV_ITEMS.map((item, index) => (
          <ListItem key={index}>
            <DashboardNavItem item={item} />
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};
export default DashboardNavigation;
