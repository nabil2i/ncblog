import { Button, HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authSatus } from "../../app/features/auth/authSlice";
// import PropTypes from 'prop-types';

const VARIANT_COLOR = "teal";

const NavAuthButtons = () => {
  const isAuthenticated = useSelector(authSatus);
  // const { state } = useAuth();
  // console.log(state)

  if (!isAuthenticated)
    return (
      <>
        <HStack>
          <NavLink to="/login">
            <Button
              // as={'a'}
              fontSize={"sm"}
              // fontWeight={400}
              variant={"link"}
              colorScheme={VARIANT_COLOR}
              _hover={{
                textDecoration: "underline",
                colorScheme: "red",
              }}
            >
              Log in
            </Button>
          </NavLink>

          <NavLink to="/sign-up">
            <Button
              // as={'a'}
              // display={{ base: "none", md: "inline-flex" }}
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize={"sm"}
              // fontWeight={600}
              // color={'white'}
              colorScheme={VARIANT_COLOR}
              // bg={'green.400'}
              // _hover={{
              //   bg: 'green.300'
              // }}
            >
              Sign up
            </Button>
          </NavLink>
        </HStack>
      </>
    );
};

// NavAuthButtons.propTypes = {
//   setToken: PropTypes.func.isRequired
// }
export default NavAuthButtons;
