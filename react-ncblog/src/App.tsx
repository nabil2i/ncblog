import { Grid, GridItem, Show } from '@chakra-ui/react'
import NavLogo from './components/NavLogo'

function App() {
  return (
    <>
      <Grid templateAreas={ 
        /* `"nav-logo  nav-menu nav-search" "main main aside"` */
        {
        base: `"nav-logo" "main"`,
         lg: `"nav-logo  nav-menu nav-search" "main main aside"`
        // lg: `"nav" "main"`
        }  
      }> 
        {/* <GridItem area='nav' bg='coral'>Nav</GridItem> */}
        <GridItem area='nav-logo' bg='coral'><NavLogo></NavLogo></GridItem>
        <GridItem area='main' bg='dodgerblue'>Main</GridItem>
        <Show above="lg">
          <GridItem area='nav-menu' bg='red'>Menu</GridItem>
          <GridItem area='nav-search' bg='grayal'>Search</GridItem>
          <GridItem area='aside' bg='gold'>Aside</GridItem>
        </Show>
        
      </Grid>
    </>
  )
}

export default App
