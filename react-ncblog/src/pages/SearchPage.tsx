import { Box, Grid, GridItem } from "@chakra-ui/react";
import SearchPostGrid from "../components/posts/SearchPostGrid";
import { useSearchPostQueryStore } from "../store";

const SearchPage = () => {
  const setPage = useSearchPostQueryStore((s) => s.setPage);
  const searchText = useSearchPostQueryStore(
    (s) => s.searchPostQuery.searchText
  );

  console.log(searchText)

  return (
    <Grid
      templateAreas={{ base: `"main"`, lg: `"main"`}}
      templateColumns={{ base: "1fr", lg: "1fr"}}
    >
      <GridItem area="main">
        {searchText && (
          <Box
            // pt={{ base: "50px", lg: "0px" }}
          >
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
