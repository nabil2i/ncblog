import { Box, Flex, Grid, GridItem, Image, Show } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authSatus } from "../../app/features/auth/authSlice";
import LoginForm from "../../components/auth/LoginForm";
import useTitle from "../../hooks/useTitle";
import HomeHero from "../../assets/images/islam2.jpg";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(authSatus);
  const redirect = new URLSearchParams(location.search).get("redirect");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect || "/");
    }
  }, [navigate, redirect, isAuthenticated]);

  useTitle("Login");

  return (
    <>
      <Box p={10} mx="auto" maxW="1440px">
        <Grid
          borderWidth={{ lg: 1 }}
          borderRadius={16}
          boxShadow="lg"
          marginTop={{ base: "100px", lg: "30px" }}
          templateAreas={{ base: `"loginform"`, lg: `"hero loginform"` }}
          templateColumns={{ base: `"1fr"`, lg: "1fr 1fr" }}
          gap={0}
          justifyContent="center"
          alignContent="center"
        >
          <GridItem area="hero" as="section">
            <Flex minH={{ lg: "100%" }} height="full" width="full" position={"relative"}>
              {" "}
              <Show above="lg">
                <Image
                  src={HomeHero}
                  borderTopLeftRadius={{ lg: 16 }}
                  borderBottomLeftRadius={{ lg: 16 }}
                  overflow="cover"
                  aspectRatio={16 / 9}
                />
                <Box
                  position={"absolute"}
                  background="rgba(0, 0, 0, 0.4)"
                  height="100%"
                  borderTopLeftRadius={{ lg: 16 }}
                  borderBottomLeftRadius={{ lg: 16 }}
                ></Box>
              </Show>
            </Flex>
          </GridItem>

          <GridItem area="loginform" background="" as="section">
            <Flex minH={{ lg: "70vh" }} width="full" justifyContent="center">
              <Box px={4} width="full" maxWidth="600px">
                <LoginForm />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
