import { Search2Icon } from "@chakra-ui/icons";
import { Button, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { NavLink } from "react-router-dom";


const VARIANT_COLOR = "teal";

const NavButtons = () => {
  return (
    <>
    <NavLink to="/login">
      <Button
        // as={'a'}
        fontSize={'sm'}
        // fontWeight={400}
        variant={'link'}
        colorScheme={VARIANT_COLOR}
        // href={'#'}
        _hover={{
          textDecoration: 'none',
          colorScheme: 'red'
        }}
        >
          Log in
        </Button>
    </NavLink>

      <NavLink to="/sign-up">
        <Button
          // as={'a'}
          display={ {base: 'none', md: 'inline-flex'}}
          fontSize={'sm'}
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
    <ColorModeSwitch />
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

export default NavButtons;
