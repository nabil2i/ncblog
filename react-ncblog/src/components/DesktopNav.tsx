import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Link, Popover, PopoverContent, PopoverTrigger, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import NAV_ITEMS, { NavItem } from "./navitems";

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4} >
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                // fontSize={'sm'}
                // fontWeight={500}

                // color={"linkedin.50"}
                _hover={{
                  TextDecoder: 'none',
                  // color: ,
                }}
              >
                <NavLink
                  to={navItem.href ?? '#'}>
                    <Text whiteSpace={'nowrap'}>
                      {navItem.label}
                    </Text>
                </NavLink>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                // bg={PopoverContent}
                p={4}
                rounded={'xl'}
                minW={'sm'}
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

const DesktopSubNav = ({ label, href, subLabel}: NavItem) => (
  <Link
    role={'group'}
    display={'block'}
    p={2}
    rounded={'md'}
    _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
  >
    <NavLink
      to={href ?? '#'}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
            >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </NavLink>
  </Link>
)

export default DesktopNav;
