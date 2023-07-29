import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Show,
  Stack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import NavButtons from "./NavButtons";
import NavLogo from "./NavLogo";
import SearchInput from "./SearchInput";
import Profile from "./Profile";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  // const [ token, setToken] = useState();

  return (
    <>
      <Box
      // position="static"
      // backgroundColor="rgba(255, 255, 255, 0.8)"
      // backdropFilter="saturate(180%) blur(5px)"
      // w="100%"
      >

        <HStack justifyItems={"center"}
          >
          <Box py={{ base: 2 }}
            paddingLeft={{ base: 4 }}
            display={{ md: 'none'}}>
            <NavLogo />
          </Box>

          <Box py={{ base: 2 }}
              paddingRight={{ base: 4 }} paddingLeft={{ base: 0, md: 4}}
              flexGrow="1"
              display={{ base: 'flex', lg: 'none'}}>
            <SearchInput />
          </Box>
        </HStack>

        <Flex
          as="nav"
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
          
          <Flex
            flex={{ base: 1,  md: "auto"}}  //flex: grow shrink basis; flew: 1 (auto shrink and basis)
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>

          <Flex
            flex={{ base: 1 }} // spread the logo + desktop menu all line
            justify={{ base: "center", md: "start" }}
            align={"center"}
          >
            <Box
              display={{ base: 'none', md: "flex" }}
            >
              <NavLogo />
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
              ml={10}
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
            <NavButtons />
            <ColorModeSwitch />
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

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>

      {/* // old implementation
        <Flex
      // padding="10px"
      py="2"
      px="4"
      align={'center'}
      // justifyContent="space-between"
      // borderStyle={'solid'}
      // borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <NavLogo/>
      <Spacer />
      <HStack spacing={5}>
        <Show above="lg">
          <SearchInput/>
        </Show>
        <NavButtons/>
      </HStack>
    </Flex> */}
    </>
  );
};

export default NavBar;
