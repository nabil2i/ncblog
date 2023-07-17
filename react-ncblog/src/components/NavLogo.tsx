import { HStack, Image, Text } from "@chakra-ui/react";
// import logo from '../assets/logo.webp';
import NabilConveys1 from "../assets/NabilConveys1.webp";
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link to='/'>
      <HStack p="10px">
        <Image src={NabilConveys1} boxSize="50px" objectFit="cover" />
        <Text fontSize={20} whiteSpace="nowrap">
          Nabil Conveys
        </Text>
      </HStack>
    </Link>
  );
};

export default NavLogo;
