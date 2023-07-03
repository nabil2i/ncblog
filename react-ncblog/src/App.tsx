import { Box, Flex, Grid, GridItem, HStack, Show, VStack } from "@chakra-ui/react";
import CategorySelector from "./components/CategorySelector";
import Headline from "./components/Headline";
import Hero from "./components/Hero";
import NavButtons from "./components/NavButtons";
import NavLogo from "./components/NavLogo";
import PostGrid from "./components/PostGrid";

function App() {
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
        <GridItem area="search" bg="green">
          Search
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
          <NavButtons></NavButtons>
        </GridItem>

        <GridItem area="main">
          <VStack>
            <Headline></Headline>
            <Hero></Hero>
          </VStack>
          <Flex>
            <Box>
              <CategorySelector />
            </Box>
          </Flex>
          <PostGrid></PostGrid>
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
