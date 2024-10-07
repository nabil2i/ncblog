import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import CallToActionIera from "../../components/common/CallToActionIera";
import PageHeading from "../../components/common/PageHeading";
import PostGrid from "../../components/posts/PostGrid";
import useTitle from "../../hooks/useTitle";
import usePostQueryStore from "../../store";

const BlogPage = () => {
  const setPage = usePostQueryStore((s) => s.setPage);
  useTitle("Nabil Conveys - Blog");

  return (
    <Box>
      <Grid
        templateAreas={{ base: `"main"` }}
        templateColumns={{ base: "1fr" }}
      >
        <GridItem area="main">
          <VStack as="section">
            <PageHeading title={"Posts"} />
            <Box mx="auto" maxW="1440px" w="full">
              <PostGrid
                paginate={(page) => {
                  if (page === null) return null;
                  setPage(page);
                }}
              />
              <Box m={5} maxW="800px" px={4} mx="auto">
                <CallToActionIera />
              </Box>
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
export default BlogPage;
