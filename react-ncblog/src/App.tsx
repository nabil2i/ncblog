import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavLogo from "./components/NavLogo";
import NavButtons from "./components/NavButtons";

function App() {
  return (
    <>
      <Grid
        templateAreas={
          /* `"nav-logo  nav-menu nav-search" "main main aside"` */
          {
            base: `"search search" "nav-logo nav-buttons" "main main"`,
            lg: `"search search search" "nav-logo  nav-menu nav-buttons" "main main aside"`,
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
        <GridItem area="main" bg="dodgerblue">
          Main
        </GridItem>
        <GridItem area="nav-buttons" >
          <NavButtons></NavButtons>
        </GridItem>
        <Show above="lg">
          <GridItem area="nav-menu" bg="red">
            Menu
          </GridItem>

          <GridItem area="aside" bg="gold">
            Aside
          </GridItem>
        </Show>
      </Grid>
    </>
  );
}

export default App;
