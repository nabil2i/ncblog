import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import PageHeading from "../../components/common/PageHeading";
import UserPostGrid from "../../components/posts/UserPostGrid";
import useTitle from "../../hooks/useTitle";
import { useUserPostQueryStore } from "../../store";

const MyPostsPage = () => {
  const setPage = useUserPostQueryStore((s) => s.setPage);
  useTitle("Nabil Conveys - My Posts");

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
              <UserPostGrid
                paginate={(page) => {
                  if (page === null) return null;
                  setPage(page);
                }}
              />
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default MyPostsPage;
