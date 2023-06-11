import { HStack, Image, Text } from "@chakra-ui/react"
// import logo from '../assets/logo.webp';
import NabilConveys1 from '../assets/NabilConveys1.webp';

const NavLogo = () => {
  return (
    <HStack>
      <Image src={NabilConveys1} boxSize="60px"/>
      <Text>Nabil Conveys</Text>
    </HStack>
  )
}

export default NavLogo