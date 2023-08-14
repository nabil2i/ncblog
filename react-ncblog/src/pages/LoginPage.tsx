import { Grid, GridItem, Flex, SimpleGrid, Box, Image, Center } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
// import HomeHero from '../assets/landing.svg'
import HomeHero from '../assets/islam.jpg'

const LoginPage = () => (
  <>
    <Grid 
      templateAreas={{ base: `"loginform" "hero" `, lg: `"hero loginform"` }}
      templateColumns={{ base: `"1fr"  "1fr"`, lg: "1fr 1fr" }}
      gap={4}
      justifyContent="center"
    >
      <GridItem area="hero" >
        <Flex pr="150px"
        minH= {{ lg: "80vh"}} width="full" align="center" justifyContent="center"
        >
        <Center>
        <Image src={HomeHero}
          
        />

        </Center>
        </Flex>
      </GridItem>

      <GridItem area="loginform">
        <Flex minH= {{ lg: "80vh"}} width="full" align="center" justifyContent="center">
          <Box borderWidth={1}
            px={4}
            width="full"
            maxWidth="500px"
            borderRadius={4}
            textAlign="center"
            boxShadow="lg">
            <LoginForm />
          </Box>
        </Flex>
      </GridItem>
    </Grid>

    {/* <SimpleGrid columns={{base: 1, md:2}} spacing={2}>
        <GridItem bg="blue">

        </GridItem>

        <GridItem bg="green">
          <Flex width="full" align="center">
          <LoginForm />
        </Flex>
        </GridItem>
       
      </SimpleGrid> */}
  </>
);

export default LoginPage;
