import { HStack, Image, Text } from "@chakra-ui/react"
// import logo from '../assets/logo.webp';
import NabilConveys1 from '../assets/NabilConveys1.webp';

const NavLogo = () => {
  return (
    <HStack p="10px">
      <Image src={NabilConveys1} boxSize="50px"/>
      <Text fontSize={20} whiteSpace="nowrap">Nabil Conveys</Text>
    </HStack>
  )
}

export default NavLogo