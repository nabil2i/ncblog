import { Box, Flex, Grid, GridItem, HStack, Show, Spacer, VStack } from "@chakra-ui/react";
import CategorySelector from "./components/CategorySelector";
import Headline from "./components/Headline";
import Hero from "./components/Hero";
import NavButtons from "./components/NavButtons";
import NavLogo from "./components/NavLogo";
import PostGrid from "./components/PostGrid";
import SearchInput from "./components/SearchInput";
import { useState } from "react";
import PostHeading from "./components/PostHeading";
import usePostQueryStore from "./store";
// export interface PostQuery {
//   searchText: string;
//   page: number;
//   perPage: number;
// }

function App() {
  // const [ searchText, setSearchText] = useState("");
  // const [ postQuery, setPostQuery ] = useState<PostQuery>({} as PostQuery)
  // set the number of query per page
  // postQuery.perPage =  3;
  const setPage = usePostQueryStore(s => s.setPage);

  return (
    <>
      <Grid
        templateAreas={
          /* `"nav-logo  nav-menu nav-search" "main main aside"` */
          {
            base: `"search search" "nav-logo nav-buttons"  "main main"`,
            lg: `"search search search" "nav-logo  nav-menu nav-buttons" "main main main"`,
            // lg: `"nav" "main"`
          }
        }
        templateColumns={{
          base: "1fr 1fr",
          lg: "1fr 1fr 1fr",
        }}
      >
        {/* <GridItem area='nav' bg='coral'>Nav</GridItem> */}
        <GridItem area="search">
          <HStack marginTop={5} paddingLeft={50} paddingRight={50} paddingBottom={10}>
            <SearchInput
              // onSearch={(searchText) => setPostQuery({ ...postQuery, searchText })}
            />
          </HStack>
        </GridItem>

        <GridItem area="nav-logo">
          <NavLogo></NavLogo>
        </GridItem>

        <Show above="lg">
          <GridItem area="nav-menu" bg="red">
            Menu
          </GridItem>

          {/* <GridItem area="aside" bg="gold">
            Aside
          </GridItem> */}
        </Show>

        <GridItem area="nav-buttons">
          <Flex>
            <Spacer />
            <Box paddingTop={5}>
              <NavButtons ></NavButtons>
            </Box>
          </Flex>
        </GridItem>

        <GridItem area="main">
          <VStack>
            <Headline></Headline>
            <Hero></Hero>
          </VStack>
            <VStack>
              <Box>
                <PostHeading
                  // postQuery={postQuery}
                />
              </Box>

              <Flex>
                <Box>
                  <CategorySelector />
                </Box>
              </Flex>
              
            </VStack>

          <PostGrid
            // postQuery={postQuery}
            paginate={(page) => {
              if (page === null) return null;
              setPage(page)
            }
          }
          ></PostGrid>
          
        </GridItem>

        {/* <GridItem area="headline">
          <Headline></Headline>
        </GridItem>

        <GridItem area="hero">
          
        </GridItem> */}
      </Grid>
    </>
  );
}

export default App;
