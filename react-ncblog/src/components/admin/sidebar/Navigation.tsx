import { Flex, List, ListItem } from "@chakra-ui/react";
import NavItem from "./NavItem";
import ADMIN_NAV_ITEMS from "./adminnavitems";

const Navigation = () => {
  return (
    <Flex
      overflowY="auto"
      maxHeight="calc(100vh - 100px)"
      direction="column"
      overflowX={"hidden"}
    >
      <List>
        {ADMIN_NAV_ITEMS.map((item, index) => (
          <ListItem key={index}>
            <NavItem item={item} />
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};
export default Navigation;
