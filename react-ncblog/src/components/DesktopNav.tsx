import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Link, Popover, PopoverContent, PopoverTrigger, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import NAV_ITEMS, { NavItem } from "./navitems";

const DesktopNav = () => {
  const page = window.location.pathname;
  console.log(page);

  return (
    <Stack direction={'row'} spacing={4} >
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover
            trigger={'hover'}
            placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                
                p={2}
                // fontSize={'sm'}
                // fontWeight={500}

                // color={"linkedin.50"}
                _hover={{
                  textDecoration: 'none',
                  color: 'green'
                  // color: ,
                }}
              >
                <NavLink
                  to={navItem.href ?? '#'}
                  // style={({ isActive }) => ({ 
                  //   color: !isActive ? 'greenyellow' : ''})}
                  >
                    <Text whiteSpace={'nowrap'}>
                      {navItem.label}
                    </Text>
                    <i className="fas fa-sign-out-alt"></i>
                </NavLink>
              </Box>
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
  <Box
    role={'group'}
    display={'block'}
    p={2}
    rounded={'md'}
    _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
  >
    <NavLink
      to={href ?? '#'}
      // style={({ isActive }) => ({ 
      //   color: isActive ? 'greenyellow' : 'white' })}
        >
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
  </Box>
)

export default DesktopNav;
