import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  CloseButton,
  Collapse,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavLogoDrawer } from "./NavLogo";
import NAV_ITEMS, { NavItem } from "./navitems";
import { isExternalURL } from "../../../utils/urls";

interface Props {
  onCloseMain: () => void;
}

// const VARIANT_COLOR = "teal";

const MobileNavDrawer = ({ onCloseMain }: Props) => {
  // const btnRef = React.useRef()
  // const { state } = useAuth();

  return (
    <>
      <DrawerOverlay />
      <DrawerContent p="0px" m="0px">
        {/* <DrawerCloseButton/> */}
        <DrawerHeader borderBottomWidth="1px">
          <Flex align="center" justify="space-between">
            <Flex>
              {/* <IconButton
                onClick={onCloseMain}
                icon={<HamburgerIcon w={7} h={7} />}
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              /> */}
              <NavLogoDrawer boxSize="30px" />
            </Flex>
            <CloseButton onClick={onCloseMain} size="lg" />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          {NAV_ITEMS.map((navItem) => (
            <MobileNavItem
              key={navItem.label}
              onCloseMain={onCloseMain}
              {...navItem}
            />
          ))}
        </DrawerBody>
        {/* {!state.isAuthenticated && (
          <DrawerFooter borderTopWidth="1px">
            <NavAuthButtons />
          </DrawerFooter>
        )} */}
      </DrawerContent>
    </>
  );
};

interface MobileNavItemeProps {
  onCloseMain: () => void;
}

const MobileNavItem = ({
  label,
  children,
  href,
  onCloseMain,
}: NavItem & MobileNavItemeProps) => {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const { colorMode } = useColorMode();

  const onClick = (
    children: NavItem[] | undefined,
    href: string | undefined
  ) => {
    if (children) onToggle();
    else if (href) {
      if (isExternalURL(href)) {
        window.open(href, "_blank");
      } else {
        navigate(href);
      }
      onCloseMain();
    }
  };

  return (
    <Stack spacing={1} onClick={() => onClick(children, href)} w="full">
      <Flex
        py={2}
        px={5}
        as={isExternalURL(href || "") ? "a" : NavLink}
        justify={"space-between"}
        align={"center"}
        w="full"
        color={linkColor}
        _hover={{
          bg: useColorModeValue("teal.300", "#272727"),
          rounded: "10px",
          color: "white",
          cursor: "pointer",
        }}
        // href={isExternalURL(href || "") ? href : undefined}
        target={isExternalURL(href || "") ? "_blank" : undefined}
        rel={isExternalURL(href || "") ? "noopener noreferrer" : undefined}
      >
        <Text fontWeight={600}> {label} </Text>
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
          ml={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box
                key={child.label}
                ml={1}
                py={2}
                px={4}
                width="full"
                _hover={{
                  bg: colorMode === "light" ? "teal.300" : "#272727",
                  rounded: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {isExternalURL(child.href || "") ? (
                  <a href={child.href} target="_blank" rel="noopener noreferrer" className="w-full">
                    {child.label}
                  </a>
                ) : (
                  <NavLink className="w-full" to={child.href ?? "#"}>{child.label}</NavLink>
                )}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default MobileNavDrawer;
