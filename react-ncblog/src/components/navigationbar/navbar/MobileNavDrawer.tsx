import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import NavButtons from "./NavButtons";
import NAV_ITEMS, { NavItem } from "./navitems";
import useAuth from "../useAuth";

interface Props {
  onCloseMain: () => void;
}
const VARIANT_COLOR = "teal";

const MobileNavDrawer = ({ onCloseMain }: Props) => {
  // const btnRef = React.useRef()
  const { userData } = useAuth();
  // const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  return (
    <>
      <DrawerOverlay />
      <DrawerContent p="0px" m="0px">
        {/* <DrawerCloseButton/> */}
        <DrawerHeader borderBottomWidth="1px">
          <HStack align="center">
            <IconButton
              onClick={onCloseMain}
              icon={<HamburgerIcon w={7} h={7} />}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
            {/* <NavLogo boxSize="30px"/> */}
            <Text>NabilConveys</Text>
          </HStack>
        </DrawerHeader>
        <DrawerBody>
          {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
          ))}
        </DrawerBody>
        {!userData.token && (
          <DrawerFooter borderTopWidth="1px">
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
              </Button>
            <Button colorScheme='blue'>Submit</Button> */}
            <NavButtons />
          </DrawerFooter>
        )}
      </DrawerContent>

      {/* <Stack
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
        >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
          ))}
        </Stack> */}
    </>
  );
};

interface Props2 {
  onCloseMain: () => void;
}

const MobileNavItem = (
  { label, children, href }: NavItem,
  { onCloseMain }: Props2
) => {
  const { isOpen, onToggle } = useDisclosure();
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverBgColor = useColorModeValue(
    `${VARIANT_COLOR}.300`,
    `${VARIANT_COLOR}.500`
  );
  const { colorMode } = useColorMode();
  return (
    <Stack spacing={1} onClick={children && onToggle}>
      <Flex
        py={2}
        px={3}
        as={NavLink}
        to={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        w="100%"
        _hover={{
          // textDecoration: "none",
          // bg: useColorModeValue('teal.400', 'teal.400')
          bg: useColorModeValue("teal.300", "#272727"),
          // bg: {linkHoverBgColor},
          rounded: "10px",
        }}
      >
        <Text
          fontWeight={600}
          // color={useColorModeValue("gray.600", "gray.200")}
          color={linkColor}
          onClick={onCloseMain}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box
                py={2}
                px={4}
                _hover={{
                  bg: colorMode === "light" ? "teal.300" : "#272727",
                  rounded: "10px",
                }}
              >
                <NavLink key={child.label} to={child.href ?? "#"}>
                  {child.label}
                </NavLink>
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default MobileNavDrawer;
