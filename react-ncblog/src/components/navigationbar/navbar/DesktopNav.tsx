import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import NAV_ITEMS, { NavItem } from "./navitems";
import usePostQueryStore from "../../../store";

const VARIANT_COLOR = "teal";

const DesktopNav = () => {
  const { isOpen } = useDisclosure();

  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const linkHoverBgColor = useColorModeValue(
    `${VARIANT_COLOR}.300`,
    `${VARIANT_COLOR}.500`
  );
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const setSearchText = usePostQueryStore(s => s.setSearchText);

  // const isActive = (match: any, location: any) => {
  //   return location.pathname === (navItem.href || '/');
  // };
  
  return (
    <Stack direction={"row"} spacing={4} >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} textAlign="center">
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger >
              <Box
                px={2}  py={5}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                  bg: linkHoverBgColor,
                  // rounded: "md",
                }}
              >
                <NavLink to={navItem.href ?? "#"}
                  // activeClassName="active-link"
                  onClick={() => { 
                    if (navItem.label === "home") {
                      setSearchText("")
                    }
                    }}>
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
                </NavLink>
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
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => (
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
    <NavLink to={href ?? "#"}>
      <Stack direction={"row"} align={"center"}>
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
      </Stack>
    </NavLink>
  </Box>
);

export default DesktopNav;

