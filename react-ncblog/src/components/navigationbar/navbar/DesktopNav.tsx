import { Flex, List, ListItem } from "@chakra-ui/react";
import DesktopNavItem from "./DesktopNavItem";
import NAV_ITEMS from "./navitems";

const DesktopNav = () => {
  return (
    <Flex
      direction={"row"}
      // spacing={4}
    >
      <List
        display="flex"
        // p={0} m={0}
      >
        {NAV_ITEMS.map((navItem) => (
          <ListItem
            key={navItem.label}
            flex={1}
            mx={4}
            listStyleType="none"
            // display="inline-block"
          >
            <DesktopNavItem navItem={navItem} />
          </ListItem>
        ))}
      </List>
      {/* {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}
        >
          <DesktopNavItem navItem={navItem} />
        </Box>
      ))} */}
    </Flex>
  );
};

export default DesktopNav;
