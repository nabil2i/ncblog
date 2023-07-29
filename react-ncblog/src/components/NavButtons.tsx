import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import authReducer from "../reducers/authReducer";
import { useReducer } from "react";
import useAuth from "../hooks/useAuth";
// import PropTypes from 'prop-types';

const VARIANT_COLOR = "teal";

// interface Props {
//   setToken: () => void;
// }

const NavButtons = () => {
  // const [userData, dispatch] = useReducer(authReducer, {});
  const {userData} = useAuth();

  if(!userData?.token)
  return (
    <>
      <NavLink to="/login">
        <Button
          // as={'a'}
          fontSize={"sm"}
          // fontWeight={400}
          variant={"link"}
          colorScheme={VARIANT_COLOR}
          // href={'#'}
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
          // href={'#'}
          // _hover={{
          //   bg: 'green.300'
          // }}
        >
          Sign up
        </Button>
      </NavLink>
      {/* <ColorModeSwitch /> */}
    </>
    // <Flex
    //   // alignItems="right"
    //   // gap="2"
    // >
    //   <Spacer />
    //   <HStack
    //     // justifyContent="space-between"
    //     // padding="10px"
    //     >
    //     {/* <HStack>
    //       <Search2Icon boxSize={6} />
    //       <Text >Search</Text>
    //     </HStack> */}

    //     <ColorModeSwitch />
    //   </HStack>
    // </Flex>
  );
};

// NavButtons.propTypes = {
//   setToken: PropTypes.func.isRequired
// }
export default NavButtons;
