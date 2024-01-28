import {
  Box,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AccountTab from "../../components/account/AccountTab";
import PageHeading from "../../components/common/PageHeading";
import useTitle from "../../hooks/useTitle";

const AccountPage = () => {
  useTitle("Account");

  return (
    <>
      <Grid
        templateAreas={{ base: `"main"` }}
        templateColumns={{ base: "1fr" }}
      >
        <GridItem area="main">
          <Box as="section">
            <PageHeading title={"Account"} />
            <Box p={10}>
              <Tabs variant="enclosed">
                <TabList>
                  <Tab _selected={{ bg: "teal", color: "white" }}>
                    User Details
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <AccountTab />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default AccountPage;
