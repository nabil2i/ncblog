import { Box, Grid, GridItem } from "@chakra-ui/react";
import CallToAction from "../../components/common/CallToActionIera";
import PageHeading from "../../components/common/PageHeading";
import SearchPostGrid from "../../components/posts/SearchPostGrid";
import useTitle from "../../hooks/useTitle";
import { useSearchPostQueryStore } from "../../store";

const SearchPage = () => {
  const setPage = useSearchPostQueryStore((s) => s.setPage);
  const searchText = useSearchPostQueryStore(
    (s) => s.searchPostQuery.searchText
  );
  // console.log(searchText)
  useTitle("Nabil Conveys - Search");

  return (
    <Grid
      templateAreas={{ base: `"main"`, lg: `"main"` }}
      templateColumns={{ base: "1fr", lg: "1fr" }}
    >
      <GridItem area="main">
        {searchText && (
          <Box as="section">
            <PageHeading title={"Search"} />
            <Box maxW="1440px" mx="auto">
              <SearchPostGrid
                paginate={(page) => {
                  if (page === null) return null;
                  setPage(page);
                }}
              />
              <Box m={5}>
                <CallToAction />
              </Box>
            </Box>
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

export default SearchPage;
