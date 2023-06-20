import { AbsoluteCenter, Box, Center, Grid, GridItem, HStack, Show, VStack } from "@chakra-ui/react";
import NavLogo from "./components/NavLogo";
import NavButtons from "./components/NavButtons";
import PostGrid from "./components/PostGrid";
import Headline from "./components/Headline";
import Hero from "./components/Hero";


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

        <GridItem area="nav-buttons" >
          <NavButtons></NavButtons>
        </GridItem>

        <GridItem area="main" >
          <VStack>
            <Headline></Headline>
            <Hero></Hero>
          </VStack>
          
          
          
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
