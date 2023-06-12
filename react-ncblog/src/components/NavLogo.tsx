import { HStack, Image, Text } from "@chakra-ui/react"
// import logo from '../assets/logo.webp';
import NabilConveys1 from '../assets/NabilConveys1.webp';

const NavLogo = () => {
  return (
    <HStack p="10px">
      <Image src={NabilConveys1} boxSize="60px"/>
      <Text fontSize={20}>Nabil Conveys</Text>
    </HStack>
  )
}

export default NavLogo