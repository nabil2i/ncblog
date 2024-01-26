import { Box, Flex, Grid, GridItem, Image, Show } from "@chakra-ui/react";
import HomeHero from "../assets/islam2.jpg";
import SignUpForm from "../components/auth/SignUpForm";
import { useSelector } from "react-redux";
import { authSatus } from "../app/features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const isAuthenticated = useSelector(authSatus);
  const redirect = new URLSearchParams(location.search).get("redirect");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect || "/");
    }
  }, [isAuthenticated, redirect, navigate]);

  return (
  <>
    <Box p={10}>
      <Grid
        borderWidth={{ lg: 1 }}
        borderRadius={16}
        boxShadow="lg"
        marginTop={{ base: "100px", lg: "30px" }}
        templateAreas={{ base: `"signupform"`, lg: `"hero signupform"` }}
        templateColumns={{ base: `"1fr"`, lg: "1fr 1fr" }}
        // templateAreas={{ base: `"signupform" "hero" `, lg: `"hero signupform"` }}
        // templateColumns={{ base: `"1fr"  "1fr"`, lg: "1fr 1fr" }}
        gap={0}
        justifyContent="center"
        alignContent="center"
      >
        <GridItem area="hero">
          <Flex minH={{ lg: "92vh" }} width="full" position={"relative"}>
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
                // height="100%"
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

        <GridItem area="signupform">
          <Flex minH={{ lg: "70vh" }} width="full" justifyContent="center">
            <Box
              // px={4}
              width="full"
              maxWidth="500px"
            >
              <SignUpForm />
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  </>
);

}

export default SignUpPage;
