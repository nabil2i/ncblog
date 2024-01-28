import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import PageHeading from "../../components/common/PageHeading";
import PostGrid from "../../components/posts/PostGrid";
import useTitle from "../../hooks/useTitle";
import usePostQueryStore from "../../store";

const BlogPage = () => {
  const setPage = usePostQueryStore((s) => s.setPage);
  useTitle("Blog");

  return (
    <Box>
      <Grid
        templateAreas={{ base: `"main"` }}
        templateColumns={{ base: "1fr" }}
      >
        <GridItem area="main">
          <VStack as="section">
            <PageHeading title={"Posts"} />
            <Box mx="auto" maxW="1440px">
              <PostGrid
                paginate={(page) => {
                  if (page === null) return null;
                  setPage(page);
                }}
              />
            </Box>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
export default BlogPage;