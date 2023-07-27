import { Grid, GridItem, Flex, Box, Image } from "@chakra-ui/react";
import SignUpForm from "../components/SignUpForm";
import HomeHero from '../../public/landing.svg'

const SignUpPage = () => (
  <>
    <Grid
      templateAreas={{ base: `"loginform" "hero" `, lg: `"hero loginform"` }}
      templateColumns={{ base: `"1fr"  "1fr"`, lg: "1fr 1fr" }}
      gap={4}
      justifyContent="center"
    >
      <GridItem area="hero" >
        <Flex pr="150px"
          minH={{ lg: "80vh" }} width="full" align="center" justifyContent="center"
        >
          <Image src={HomeHero}/>
        </Flex>
      </GridItem>

      <GridItem area="loginform">
        <Flex minH={{ lg: "80vh" }} width="full" align="center" justifyContent="center">
          <Box borderWidth={1}
            px={4}
            width="full"
            maxWidth="500px"
            borderRadius={4}
            textAlign="center"
            boxShadow="lg">
            <SignUpForm />
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

export default SignUpPage;
