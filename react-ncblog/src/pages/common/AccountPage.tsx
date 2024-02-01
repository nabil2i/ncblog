import { Box } from "@chakra-ui/react";
import AccountTab from "../../components/account/AccountTab";
import useTitle from "../../hooks/useTitle";

const AccountPage = () => {
  useTitle("Nabil Conveys - Account");
  // console.log("accountpage")

  return (
    <>
      <Box py={8} maxW="800px" mx="auto" px={4}>
        <AccountTab />
      </Box>
      {/* <Grid
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
      </Grid> */}
    </>
  );
};

export default AccountPage;
