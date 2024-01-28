import { Box, Grid, GridItem } from "@chakra-ui/react";
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
  useTitle("Search");

  return (
    <Grid
      templateAreas={{ base: `"main"`, lg: `"main"` }}
      templateColumns={{ base: "1fr", lg: "1fr" }}
    >
      <GridItem area="main">
        {searchText && (
          <Box as="section">
            <PageHeading title={"Search"} />
            <SearchPostGrid
              paginate={(page) => {
                if (page === null) return null;
                setPage(page);
              }}
            />
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

export default SearchPage;
