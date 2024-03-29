import { Flex, Image, Link, Text } from "@chakra-ui/react";
// import logo from '../assets/images/logo.webp';
import { NavLink } from "react-router-dom";
import NabilConveys1 from "../../assets/icons/NabilConveys1.webp";
// import usePostQueryStore from "../store";

interface Props {
  boxSize?: string;
  fontSize?: string;
}
const NavLogo = ({ boxSize }: Props) => {
  return (
    <Link as={NavLink} _hover={{ textDecoration: "none" }} to="/">
      <Flex
        flex={{ base: 1 }}
        // display={{ base: 'flex'}}
        align={"center"}
        gap={1}
      >
        <Flex
          // justify={{ base: 'center', md: 'start'}}
          justify={{ base: "start" }}
        >
          <Image
            src={NabilConveys1}
            boxSize={boxSize || 30}
            objectFit="cover"
          />
        </Flex>

        <Flex
        // display={{ base: "none", md: "flex", lg: "flex" }}
        >
          <Text fontSize={20} whiteSpace="nowrap" fontWeight={900}>
            NabilConveys
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export const NavLogoDrawer = ({ boxSize, fontSize }: Props) => {
  return (
    <Link as={NavLink} _hover={{ textDecoration: "none" }} to="/">
      <Flex
        flex={{ base: 1 }}
        // display={{ base: 'flex'}}
        align={"center"}
        gap={1}
      >
        <Flex justify={{ base: "start" }}>
          <Image
            src={NabilConveys1}
            boxSize={boxSize || 30}
            objectFit="cover"
          />
        </Flex>

        <Flex>
          <Text fontSize={fontSize || 20} whiteSpace="nowrap" fontWeight={900}>
            NabilConveys
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export default NavLogo;
