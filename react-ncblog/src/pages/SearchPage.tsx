import { Box, Center, Flex, Grid, GridItem, Heading, VStack } from "@chakra-ui/react";
import usePostQueryStore from "../store";
import { useParams } from "react-router-dom";
import PostGrid from "../components/PostGrid";
import SimpelPostGrid from "../components/SimpelPostGrid";

const SearchPage = () => {
  // const setPage = usePostQueryStore((s) => s.setPage);
  
  return(
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
        
        <SimpelPostGrid/>
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
