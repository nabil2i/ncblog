import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { isExternalURL } from "../../../utils/urls";
import { NavItem } from "./navitems";

interface Props {
  navItem: NavItem;
}

const VARIANT_COLOR = "teal";

const DesktopNavItem = ({ navItem }: Props) => {
  const location = useLocation();
  const { isOpen, onClose } = useDisclosure();
  const isActive = navItem.href === location.pathname;

  // const linkColor = useColorModeValue("gray.600", "gray.200");
  // const linkHoverColor = useColorModeValue("gray.800", "white");
  const linkHoverBgColor = useColorModeValue(
    `${VARIANT_COLOR}.500`,
    `${VARIANT_COLOR}.500`
  );
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  // const setSearchText = usePostQueryStore((s) => s.setSearchText);

  const onClick = (navItem: NavItem) => {
    console.log(navItem);
    if (!navItem.children && navItem.href) {
      if (isExternalURL(navItem.href)) {
        console.log(navItem.href);
        window.open(navItem.href, navItem.target);
      }
    }
  };

  return (
    <Box>
      <Popover trigger={"hover"} placement={"bottom-start"} onClose={onClose}>
        <PopoverTrigger>
          <Box
            alignItems="center"
            justifyContent="center"
            // px={2}
            // py={5}
            // h="full"
            // w="full"
            // color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverBgColor,
              // bg: linkHoverBgColor,
              // rounded: "md",
            }}
            // bg={isActive ? linkHoverBgColor : ""}
            color={isActive ? linkHoverBgColor : ""}
          >
            <Flex
              onClick={() => onClick(navItem)}
              as={
                isExternalURL(navItem.href || "")
                  ? (Link as React.ElementType)
                  : (NavLink as React.ElementType)
              }
              target={
                isExternalURL(navItem.href || "") ? navItem.target : undefined
              }
              rel={
                isExternalURL(navItem.href || "")
                  ? "noopener noreferrer"
                  : undefined
              }
              to={
                isExternalURL(navItem.href || "")
                  ? undefined
                  : (navItem.href as string) || "#"
              }
              _hover={{ textDecoration: "none", cursor: "pointer" }}
              // onClick={() => {
              //   if (navItem.label === "home") {
              //     setSearchText("");
              //   }
              // }}
            >
              <Flex justify={"space-between"}>
                <Text whiteSpace={"nowrap"}>{navItem.label}</Text>
                <i className="fas fa-sign-out-alt"></i>
                {navItem.children && (
                  <Icon
                    as={ChevronDownIcon}
                    transition={"all .25s ease-in-out"}
                    transform={isOpen ? "rotate(180deg)" : ""}
                    w={6}
                    h={6}
                  />
                )}
              </Flex>
            </Flex>
          </Box>
        </PopoverTrigger>

        {navItem.children && (
          <PopoverContent
            border={4}
            boxShadow={"xl"}
            bg={popoverContentBgColor}
            p={4}
            rounded={"xl"}
            minW={"sm"}
          >
            <Stack>
              {navItem.children.map((child) => (
                <DesktopSubNav key={child.label} {...child} />
              ))}
            </Stack>
          </PopoverContent>
        )}
      </Popover>
    </Box>
  );
};

const DesktopSubNav = ({ label, href, subLabel, target }: NavItem) => {
  const navigate = useNavigate();

  const onClick = (href: string, target?: string) => {
    if (href && isExternalURL(href)) {
      window.open(href, target);
    } else {
      navigate(href);
    }
  };

  return (
    <Box
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{
        color: "white",
        bg: useColorModeValue(`${VARIANT_COLOR}.300`, `${VARIANT_COLOR}.500`),
      }}
    >
      <Flex
        as={isExternalURL(href || "") ? Link : NavLink}
        onClick={() => onClick(href as string, target)}
        // to={isExternalURL(href || "") ? href : "#"}
        target={isExternalURL(href || "") ? target : undefined}
        rel={isExternalURL(href || "") ? "noopener noreferrer" : undefined}
        align={"center"}
        justify="space-between"
        _hover={{ textDecoration: "none" }}
      >
        {/* <Stack direction={"row"} align={"center"} justify="space-between"> */}
        <Box textAlign={"left"}>
          <Text
            transition={"all .3s ease"}
            // _groupHover={{ color: useColorModeValue('white', 'black') }} // pink.400
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon
            color={useColorModeValue(
              `${VARIANT_COLOR}.500`,
              `${VARIANT_COLOR}.300`
            )}
            w={5}
            h={5}
            as={ChevronRightIcon}
          />
        </Flex>
        {/* </Stack> */}
      </Flex>
    </Box>
  );
};

export default DesktopNavItem;
