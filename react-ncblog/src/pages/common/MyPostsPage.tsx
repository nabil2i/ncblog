import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import PageHeading from "../../components/common/PageHeading";
import UserPostGrid from "../../components/posts/UserPostGrid";
import useTitle from "../../hooks/useTitle";

const MyPostsPage = () => {
  useTitle("My Posts");

  return (
    <>
      <Box>
        <Grid
          templateAreas={{ base: `"main"` }}
          templateColumns={{ base: "1fr" }}
        >
          <GridItem area="main">
            <VStack as="section">
              <PageHeading title={"My Posts"} />
              <UserPostGrid />
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default MyPostsPage;
