import { Box, Flex, HStack, Show, Spacer, VStack } from "@chakra-ui/react";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack
      padding="10px"
      justifyContent="space-between"
    >
      {/* <Link to="/"><NavLogo/></Link> */}
      <NavLogo/>
      <HStack >
        <Show above="lg">
          <SearchInput/>
        </Show>
        <NavButtons/>
      </HStack>
    </HStack>
  );
};

export default NavBar;
