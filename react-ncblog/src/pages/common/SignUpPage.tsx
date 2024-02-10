import { Box, Flex, Grid, GridItem, Image, Show, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSatus } from "../../app/features/auth/authSlice";
import HomeHero from "../../assets/images/islam2.jpg";
import SignUpForm from "../../components/auth/SignUpForm";
import useTitle from "../../hooks/useTitle";

const SignUpPage = () => {
  const isAuthenticated = useSelector(authSatus);
  const redirect = new URLSearchParams(location.search).get("redirect");
  const navigate = useNavigate();

  useTitle("Nabil Conveys - Sign Up");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect || "/");
    }
  }, [isAuthenticated, redirect, navigate]);

  return (
    <>
      <Box p={10} mx="auto" maxW="1440px">
        <Grid
          borderWidth={{ lg: 1 }}
          borderRadius={16}
          boxShadow={{ base: "none", md: "lg" }}
          // marginTop={{ base: "100px", lg: "30px" }}
          templateAreas={{ base: `"signupform"`, lg: `"hero signupform"` }}
          templateColumns={{ base: `"1fr"`, lg: "1fr 1fr" }}
          // templateAreas={{ base: `"signupform" "hero" `, lg: `"hero signupform"` }}
          // templateColumns={{ base: `"1fr"  "1fr"`, lg: "1fr 1fr" }}
          gap={0}
          justifyContent="center"
          alignContent="center"
        >
          <GridItem area="hero">
            <Flex height="full" width="full" position={"relative"}>
              <Show above="lg">
                <Image
                  src={HomeHero}
                  borderTopLeftRadius={{ lg: 16 }}
                  borderBottomLeftRadius={{ lg: 16 }}
                  overflow="cover"
                  aspectRatio={16 / 9}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  position="absolute"
                  background="rgba(0, 0, 0, 0.8)"
                  bottom={0}
                  w="full"
                  p={2}
                  // left="50%"
                  // transform="translateX(-50%)"
                  // borderTopLeftRadius={16 }
                  // borderBottomLeftRadius={16}
                >
                  <Text fontSize={25}>NabilConveys Blog</Text>
                </Box>
              </Show>
            </Flex>
          </GridItem>

          <GridItem area="signupform">
            <Flex minH={{ lg: "70vh" }} width="full" justifyContent="center">
              <Box px={4} py={8} width="full" minW="400px" maxW="500px">
                <SignUpForm />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default SignUpPage;
