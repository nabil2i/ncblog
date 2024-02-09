import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { NavLogoDrawer } from "../navbar/NavLogo";
import SOCIAL_ITEMS from "./socialitems";

const Footer = () => {
  const emailAddress = import.meta.env.DEV
    ? import.meta.env.VITE_REACT_APP_EMAIL_ADDRESS
    : import.meta.env.VITE_REACT_APP_EMAIL_ADDRESS;

  return (
    <Box as="footer" background={"black"} color="white" w="100%">
      <Box maxW="1440px" mx="auto">
        {/* <Divider orientation="horizontal" color="gray.500" my="4" /> */}
        <Box px={{ base: 8, lg: 20 }} py={14} as="section">
          <Flex
            justify="space-between"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            gap={6}
          >
            <Flex direction="column" gap={4}>
              <Flex direction="column" gap={2}>
                <Box>
                  <NavLogoDrawer boxSize="60px" fontSize="30px" />
                </Box>
                <Box>
                  Conveying the message of God Almighty to the pondering souls
                </Box>
              </Flex>
              <Flex>
                <Text>
                  <Link fontWeight={400} color="teal.200" href="#">
                    Conditions of Use
                  </Link>{" "}
                  |{" "}
                  <Link fontWeight={400} color="teal.200" href="#">
                    Privacy & Policy
                  </Link>
                </Text>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Heading as="h4" fontSize={23} pb={2}>
                Links
              </Heading>
              <Flex direction="column" gap={2}>
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/books">Books</Link>
                <Link href="/about">About</Link>
                {/* <Link href="#">Conditions of Use</Link>
                <Link href="#">Privacy & Policy</Link> */}
              </Flex>
            </Flex>
            <Flex direction="column">
              <Heading as="h4" fontSize={23} pb={2}>
                Contact
              </Heading>
              <Flex direction="column" gap={2}>
                <Link
                  fontWeight={400}
                  color="teal.200"
                  href={`mailto:${emailAddress}`}
                >
                  {emailAddress}
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        </Box>

        <Divider orientation="horizontal" color="gray.500" />

        <Box maxW="1440px" mx="auto">
        <Flex
          py={4}
          px={{ base: 8, lg: 20 }}
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Flex>
            <Text fontSize="sm">
              &copy; {new Date().getFullYear()} NabilConveys. All Rights
              Reserved
            </Text>
          </Flex>
          <Flex gap={2}>
            {SOCIAL_ITEMS.map((item) => (
              <Box key={item.label}>
                <Flex gap={2}>
                  <Link href={item.href} target="_blank">
                    <Icon as={item.icon} boxSize={6} />
                  </Link>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Flex>
        {/* <Flex direction="column" gap={4}>
          <Flex justify="space-between" flexWrap={{ base: "wrap", lg: "nowrap" }} gap={4}>
            <Flex direction="column" >
              <Flex direction="column" gap={2} flexGrow={{ lg: "1" }}>
                <Box >
                  <NavLogoDrawer boxSize="60px" fontSize="30px"/>
                </Box>
                <Box fontSize={20}>Conveying the message of God Almighty to the pondering souls</Box>
              </Flex>
              <Box display={{ base: "none", lg: "flex"}}>
                <Text mt={4} fontSize="sm">
                  &copy; {new Date().getFullYear()} NabilConveys
                </Text>
              </Box>
            </Flex>
        
            <Flex direction="column">
              <Heading as="h4" fontSize={23} pb={2}>Social</Heading>
              <Flex direction="column" gap={2}>
                {SOCIAL_ITEMS.map((item) => (
                  <Box key={item.label}>
                    <Flex gap={2}>
                      <Link href={item.href} target="_blank">
                        <Icon as={item.icon} boxSize={6} />
                      </Link>
                      <Link href={item.href} target="_blank">
                        <Text>{item.label}</Text>
                      </Link>
                    </Flex>
                  </Box>
                ))}
              </Flex>
            </Flex>
        
            <Flex direction="column">
              <Heading as="h4" fontSize={23} pb={2}>Links</Heading>
              <Flex direction="column" gap={2}>
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/books">Books</Link>
              </Flex>
            </Flex>
        
            <Flex direction="column">
              <Heading as="h4" fontSize={23} pb={2}>Links</Heading>
              <Flex direction="column" gap={2}>
                <Link href="#">Conditions of Use</Link>
                <Link href="#">Privacy & Policy</Link>
              </Flex>
            </Flex>
          </Flex>
          <Hide above="lg" >
            <Flex>
              <Box>
                <Text mt={4} fontSize="sm">
                  &copy; {new Date().getFullYear()} NabilConveys
                </Text>
              </Box>
            </Flex>
          </Hide>
        </Flex> */}
        {/* <Grid
          templateAreas={{
            base: `"logo" "socials" "links links2" "copyright"`,
            lg: `"logo socials links links2"`
          }}
          templateColumns={{
            base: `"auto" "auto" "auto auto" "auto"`,
            lg: "auto",
          }}
          templateRows={{
            base: `auto auto auto auto`,
            lg: "auto",
          }}
          justifyItems={{ lg: "center" }}
          gap={{ base: 4 }}
          >
            <GridItem area={"logo"}>
              <Flex direction="column" justify={{ lg: "flex-end"}}>
                <Flex direction="column" gap={2} flexGrow={{ lg: "1" }}>
                  <Box >
                    <NavLogoDrawer boxSize="60px" fontSize="30px"/>
                  </Box>
                  <Box fontSize={20}>Conveying the message of God Almighty to the pondering souls</Box>
                </Flex>
                <Box display={{ base: "none", lg: "flex"}}>
                  <Text mt={4} fontSize="sm">
                    &copy; {new Date().getFullYear()} NabilConveys
                  </Text>
                </Box>
              </Flex>
            </GridItem>
            <GridItem area={"socials"}>
              <Flex direction="column">
                <Heading as="h4" fontSize={23} pb={2}>Social</Heading>
                <Flex direction="column" gap={2}>
                  {SOCIAL_ITEMS.map((item) => (
                    <Box key={item.label}>
                      <Flex gap={2}>
                        <Link href={item.href} target="_blank">
                          <Icon as={item.icon} boxSize={6} />
                        </Link>
                        <Link href={item.href} target="_blank">
                          <Text>{item.label}</Text>
                        </Link>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Flex>
            </GridItem>
            <GridItem area={"links"}>
              <Flex direction="column">
                <Heading as="h4" fontSize={23} pb={2}>Links</Heading>
                <Flex direction="column" gap={2}>
                  <Link href="/">Home</Link>
                  <Link href="/blog">Blog</Link>
                  <Link href="/books">Books</Link>
                </Flex>
              </Flex>
            </GridItem>
            <GridItem area={"links2"}>
              <Flex direction="column">
                <Heading as="h4" fontSize={23} pb={2}>Links</Heading>
                <Flex direction="column" gap={2}>
                  <Link href="#">Conditions of Use</Link>
                  <Link href="#">Privacy & Policy</Link>
                </Flex>
              </Flex>
            </GridItem>
            <Hide above="lg" >
              <GridItem area={"copyright"}>
                <Flex>
                  <Box>
                    <Text mt={4} fontSize="sm">
                      &copy; {new Date().getFullYear()} NabilConveys
                    </Text>
                  </Box>
                </Flex>
              </GridItem>
            </Hide>
        </Grid>   */}
      </Box>
    </Box>
  );
};

export default Footer;

{
  /* <Flex
        direction="column"
        align="center"
        justify="center"
        // borderTop="1px"
        // bg="gray.900"
        // color="white"
        // color={useColorModeValue("white", "black")}
        // paddingY={4}
        // background={useColorModeValue("gray.900", "gray.100")}
      > 
    </Flex>*/
}
