import { Divider, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { authSatus } from "../../app/features/auth/authSlice";
import NavAuthButtons from "./NavAuthButtons";

const NavAuthButtonsBase = () => {
  const isAuthenticated = useSelector(authSatus);

  return (
    <>
      <Flex w="full" direction="column">
        <Flex w="full" justify="end"  my={ isAuthenticated ? 0 : 2 } mr={2}>
          <NavAuthButtons />
        </Flex>
        <Flex w="full">
          {!isAuthenticated && <Divider orientation="horizontal" />}
        </Flex>
      </Flex>
    </>
  );
};

export default NavAuthButtonsBase;
