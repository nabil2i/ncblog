import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Show,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import Profile from "./NavProfile";
import ColorModeSwitch from "./ColorModeSwitch";
import MobileNavDrawer from "./MobileNavDrawer";
import ModalSearchInput from "./ModalSearchInput";
import SearchInput from "./SearchInput";

const NavBar = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Box
        as="nav"
        // position="fixed"
        // top="0"
        // backgroundColor={useColorModeValue("rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)")}
        // backdropFilter="saturate(180%) blur(5px)"
        // w="100%"
        // marginBottom="10px"
      >
        <HStack justifyItems={"center"}>
          {/* <Box py={{ base: 2 }}
            paddingLeft={{ base: 4 }}
            display={{ md: 'none'}}>
            <NavLogo boxSize="40px"/>
          </Box> */}
          <Box
            py={{ base: 2 }}
            paddingLeft={{ base: 4 }}
            display={{ md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                <HamburgerIcon w={7} h={7} />
                // isOpen ? (
                //   // <CloseIcon w={3} h={3} />
                //   <CloseIcon w={5} h={5} />
                // ) : (
                //   // <HamburgerIcon w={5} h={5} />
                //   <HamburgerIcon w={7} h={7} />
                // )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Box>

          <Box
            py={{ base: 2 }}
            paddingRight={{ base: 4 }}
            paddingLeft={{ base: 0, md: 4 }}
            flexGrow="1"
            display={{ base: "flex", lg: "none" }}
          >
            {/* <SearchInput /> */}
            <ModalSearchInput />
          </Box>
        </HStack>

        <Flex
          // as="nav"
          // bg={useColorModeValue('white', 'gray.800')}
          // color={useColorModeValue('gray.600', 'white')}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          // borderBottom={1}
          // borderStyle={'solid'}
          // boxShadow={'dark-lg'}
          // borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={"center"}
        >
          {/* <Flex
            flex={{ base: 1,  md: "auto"}}  //flex: grow shrink basis; flew: 1 (auto shrink and basis)
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  // <CloseIcon w={3} h={3} />
                  <CloseIcon w={5} h={5} />
                ) : (
                  // <HamburgerIcon w={5} h={5} />
                  <HamburgerIcon w={7} h={7} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex> */}

          <Flex
            flex={{ base: 1 }} // spread the logo + desktop menu all line
            // justify={{ base: "center", md: "start" }}
            justify={{ base: "start" }}
            align={"center"}
          >
            <Box
              // display={{ base: 'none', md: "flex" }}
              display={{ md: "flex" }}
            >
              <NavLogo boxSize="40px" />
            </Box>
            {/* <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left'})}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            Logo
          </Text> */}

            <Flex
              display={{ base: "none", md: "flex" }}
              ml={5}
              align={"center"}
            >
              <DesktopNav />
            </Flex>
          </Flex>

          {/* Right end of menu */}
          <Stack
            // flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            align="center"
            direction={"row"}
            spacing={2}
          >
            <Show above="lg">
              <SearchInput />
            </Show>
            <ColorModeSwitch />
            <NavButtons />
            <Profile />
            {/* <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}
          >
            Sign in
          </Button>
          <Button
            as={'a'}
            display={ {base: 'none', md: 'inline-flex'}}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            href={'#'}
            _hover={{
              bg: 'green.300'
            }}
          >
            Sign up
          </Button> */}
          </Stack>

          {/* <HStack spacing={3}>
            <Show above="lg">
              <SearchInput />
            </Show>
            <NavButtons />
            <ColorModeSwitch />
            <Profile />
          </HStack> */}
        </Flex>

        {/* <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse> */}
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          // finalFocusRef={btnRef}
        >
          <Show above="base" below="md">
            <MobileNavDrawer onCloseMain={onClose} />
          </Show>
        </Drawer>
      </Box>
    </>
  );
};

export default NavBar;
