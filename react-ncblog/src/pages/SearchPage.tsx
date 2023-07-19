import { Grid, GridItem } from "@chakra-ui/react";
import SearchPostGrid from "../components/SearchPostGrid";

const SearchPage = () => {
  // const setPage = usePostQueryStore((s) => s.setPage);

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
        {/* <PostGrid
          // postQuery={postQuery}
          paginate={(page) => {
            if (page === null) return null;
            setPage(page);
          }}
        ></PostGrid> */}

        <SearchPostGrid />
        {/* <PostGrid
          // postQuery={postQuery}
          paginate={(page) => {
            if (page === null) return null;
            setPage(page);
          }}
        ></PostGrid> */}
      </GridItem>
    </Grid>
  );
};

export default SearchPage;
