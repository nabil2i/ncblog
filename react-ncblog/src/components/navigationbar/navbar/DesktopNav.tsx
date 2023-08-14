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

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} textAlign="center">
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                p={2}
                // fontSize={'sm'}
                // fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  // background: colorMode === 'light' ?  `${VARIANT_COLOR}.500` : `${VARIANT_COLOR}.500`,
                  color: linkHoverColor,
                  bg: linkHoverBgColor,
                  rounded: "md",
                }}
              >
                <NavLink to={navItem.href ?? "#"}>
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
      // bg: useColorModeValue('pink.50', 'gray.900')
      // bg: useColorModeValue('teal.400', 'teal.400')
      bg: useColorModeValue(`${VARIANT_COLOR}.300`, `${VARIANT_COLOR}.500`),
      // bg: 'teal.400'
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
