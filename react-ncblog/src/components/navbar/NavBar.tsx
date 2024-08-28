import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  Flex,
  IconButton,
  Show,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useAdminLayout from "../admin/useAdminLayout";
import ColorModeSwitch from "./ColorModeSwitch";
import DesktopNav from "./DesktopNav";
import MobileNavDrawer from "./MobileNavDrawer";
import NavAuthButtons from "./NavAuthButtons";
import NavAuthButtonsBase from "./NavAuthButtonsBase";
import NavLogo from "./NavLogo";
import Profile from "./NavProfile";
import SearchInput from "./SearchInput";
import SearchInputModalIcon from "./SearchInputModalIcon";

const NavBar = () => {
  const { dispatch } = useAdminLayout();
  // const onToggle = state.onToggle;

  const { isOpen, onClose, onToggle } = useDisclosure();
  useEffect(() => {
    dispatch({ type: "SET_ON_CLOSE_MAIN", onCloseMain: onClose });
    dispatch({ type: "SET_IS_OPEN", isOpen: isOpen });
  }, [dispatch, isOpen, onClose]);

  const showNavAuthButtonsOnLarge = useBreakpointValue({ base: false, lg: true });
 
  return (
    <>
      <Box
        as="header"
        position="fixed"
        top="0"
        backgroundColor={useColorModeValue(
          "rgba(255, 255, 255, 1)",
          "rgba(0, 0, 0, 1)"
        )}
        w="full"
        zIndex="999"
        // backdropFilter="saturate(180%) blur(5px)"
        // maxWidth={"1000px"}
        // boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
        borderBottomWidth={1}
        borderColor="gray.100"
      >
        <NavAuthButtonsBase />

        <Flex
          as="nav"
          px={{ base: 4 }}
          minH={"60px"}
          // bg={useColorModeValue('white', 'gray.800')}
          // color={useColorModeValue('gray.600', 'white')}
          // py={{ base: 2 }}
          // borderBottom={1}
          // borderStyle={'solid'}
          // boxShadow={'dark-lg'}
          // borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={"center"}
          justify="space-between"
          w="full"
          h="full"
        >
          {/* START Logo */}
          <Flex
            align="center"
            // paddingRight={4}
          >
            <Box>
              {" "}
              <NavLogo boxSize="30px" />{" "}
            </Box>
          </Flex>
          {/* END Logo */}

          {/* START Desktop menu */}
          <Flex
            display={{ base: "none", lg: "flex" }}
            // align={"center"}
            h="full"
          >
            <DesktopNav />
          </Flex>
          {/* END Desktop logo and menu */}

          {/* START Search */}
          <Box
            px={8}
            flexGrow="1"
            display={{ base: "none", md: "flex", lg: "none" }}
          >
            <SearchInput />
          </Box>
          {/* END Search */}

          {/* START right end of menu */}
          <Stack align="center" direction={"row"} gap={2}>
            <Box display={{ base: "flex", md: "none", lg: "flex" }}>
              <SearchInputModalIcon />
            </Box>
            <ColorModeSwitch />
            {showNavAuthButtonsOnLarge && <NavAuthButtons />}
            <Profile />

            {/* START MobileNav */}
            <Box
              // py={{ base: 2 }}
              // paddingLeft={{ base: 4 }}
              display={{ lg: "none" }}
            >
              <IconButton
                onClick={onToggle}
                icon={<HamburgerIcon w={7} h={7} />}
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Box>
            <Drawer
              isOpen={isOpen}
              placement="left"
              isFullHeight
              size="full"
              onClose={onClose}

              // finalFocusRef={btnRef}
            >
              <Box p={0} m={0}>
                <Show above="base" below="lg">
                  <MobileNavDrawer />
                </Show>
              </Box>
            </Drawer>
            {/* END MobileNav */}
          </Stack>
          {/* END right end of menu */}
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
