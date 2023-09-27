import { Grid, GridItem, Box } from "@chakra-ui/react";
import SearchPostGrid from "../components/SearchPostGrid";
import { useSearchPostQueryStore } from "../store";

const SearchPage = () => {
  const setPage = useSearchPostQueryStore((s) => s.setPage);
  const searchText = useSearchPostQueryStore((s) => s.searchPostQuery.searchText)

  return (
    <Grid
      templateAreas={
        /* `"nav-logo  nav-menu nav-search" "main main aside"` */
        {
          base: `"main"`,
          lg: `"main"`,
          // lg: `"nav" "main"`
        }
      }
      templateColumns={{
        base: "1fr",
        lg: "1fr",
      }}
    >
      <GridItem area="main">
        {searchText && 
          <Box pt={{ base: "50px", lg: "0px"}}>
            <SearchPostGrid paginate={(page) => {
              if (page === null) return null;
              setPage(page);
            }}/>
          </Box>
        }
      </GridItem>
    </Grid>
  );
};

export default SearchPage;
