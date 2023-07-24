import { UnlockIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import NavButtons from "../NavButtons";

const AdminNavBar = () => {
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Logged out",
      description: "Successfully logged out.",
      duration: 3000, // 5s
      isClosable: true,
      status: "success",
      position: "top",
      icon: <UnlockIcon />,
    });
  };

  return (
    <>
      <Box>
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
            flex={{ base: 2 }}
            justify={{ base: "center", md: "start" }}
            align={"center"}
            gap="10px"
          >
            <Heading>NabConveys Admin</Heading>
            <Spacer />
            <Avatar />
            <Text>John</Text>
            <Button colorScheme="green" onClick={showToast}>
              Logout
            </Button>
            <NavButtons />

            <Flex
              display={{ base: "none", md: "flex" }}
              align={"center"}
            ></Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default AdminNavBar;
