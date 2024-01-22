import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import PageHeading from "../components/common/PageHeading";
import UserPostGrid from "../components/posts/UserPostGrid";

const MyPostsPage = () => {
  return (
    <>
      <Box
      // mt={{ base: "50px", }}
      >
        <Grid
          templateAreas={{ base: `"main"` }}
          templateColumns={{ base: "1fr" }}
        >
          <GridItem area="main">
            {/* <VStack>
          <Headline></Headline>
          <Hero></Hero>
        </VStack> */}

            <VStack as="section">
              {/* <Box> <PostHeading /> </Box> */}
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
