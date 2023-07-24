import { ChatIcon, EmailIcon, StarIcon } from "@chakra-ui/icons";
import { List, ListIcon, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Tabs mt="10px" p="20px" colorScheme="green.300" variant="enclosed">
      <TabList>
        <Tab _selected={{ bg: "green" }}>Account Info</Tab>
        <Tab _selected={{ bg: "green" }}>History</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <List spacing={4}>
            <ListItem>
              <ListIcon as={EmailIcon}/>
              Email: johndoe@gmail.com
            </ListItem>
            <ListItem>
              <ListIcon as={ChatIcon}/>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores, sunt.
            </ListItem>
            <ListItem>
              <ListIcon as={StarIcon}/>
              Lorem ipsum dolor sit amet.
            </ListItem>
          </List>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Profile;
