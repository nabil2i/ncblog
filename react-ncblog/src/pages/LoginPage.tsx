import { Box, Flex, Grid, GridItem, Image, Show } from "@chakra-ui/react";
import HomeHero from "../assets/islam2.jpg";
import LoginForm from "../components/LoginForm";

const LoginPage = () => (
  <>
    <Box p={10}>
      <Grid
        borderWidth={{ lg: 1 }}
        borderRadius={16}
        boxShadow="lg"
        marginTop={{ base: "100px", lg: "30px" }}
        templateAreas={{ base: `"loginform"`, lg: `"hero loginform"` }}
        templateColumns={{ base: `"1fr"`, lg: "1fr 1fr" }}
        // templateAreas={{ base: `"loginform" "hero" `, lg: `"hero loginform"` }}
        // templateColumns={{ base: `"1fr"  "1fr"`, lg: "1fr 1fr" }}
        gap={0}
        justifyContent="center"
        alignContent="center"
      >
        <GridItem area="hero">
          <Flex minH={{ lg: "70vh" }} width="full" position={"relative"}>
            {" "}
            <Show above="lg">
              <Image
                src={HomeHero}
                borderTopLeftRadius={{ lg: 16 }}
                borderBottomLeftRadius={{ lg: 16 }}
              />
              <Box
                position={"absolute"}
                background="rgba(0, 0, 0, 0.4)"
                height="100%"
                borderTopLeftRadius={{ lg: 16 }}
                borderBottomLeftRadius={{ lg: 16 }}
              >
                {/* <Text
                  fontSize={50}
                  pt={150}
                  textAlign="center"
                  textColor={"white"}
                >
                  WELCOME TO NABILCONVEYS
                </Text> */}
              </Box>
            </Show>
          </Flex>
        </GridItem>

        <GridItem area="loginform" background="">
          <Flex minH={{ lg: "70vh" }} width="full" justifyContent="center">
            <Box px={4} width="full" maxWidth="450px">
              <LoginForm />
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  </>
);

export default LoginPage;
