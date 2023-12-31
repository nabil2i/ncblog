import { Flex, HStack, Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";
// import logo from '../assets/logo.webp';
import NabilConveys1 from "../../../assets/NabilConveys1.webp";
import { Link } from "react-router-dom";
// import usePostQueryStore from "../store";

interface Props {
  boxSize: string
}
const NavLogo = ({boxSize}: Props) => {
  return (
    <Link to='/'>
      <Flex
        flex={{ base: 1 }}
        // display={{ base: 'flex'}}
        align={'center'}
        gap={1}

      >

        <Flex
          // justify={{ base: 'center', md: 'start'}}
          justify={{ base: 'start'}}
          >
          <Image src={NabilConveys1} boxSize={boxSize}  objectFit="cover"/>
        </Flex>

        <Flex
          display={{ base: 'none', lg:'flex'}}>
          <Text fontSize={20} whiteSpace="nowrap" fontWeight={900} >
            NabilConveys
          </Text>
        </Flex>

      </Flex>
    </Link>
  );
};

export default NavLogo;
