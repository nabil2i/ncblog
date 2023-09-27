import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      borderTop="1px"
      // bg="gray.900"
      // color="white"
      paddingY={4}
    >
      {/* First Row: Social Icons */}
      <Flex gap={4}>
        <Link
          href="https://www.facebook.com/profile.php?id=100092339263574&sk=followers"
          target="_blank"
        >
          <Icon as={FaFacebook} boxSize={6} />
        </Link>
        <Link href="https://www.instagram.com/nabilconveys/" target="_blank">
          <Icon as={FaInstagram} boxSize={6} />
        </Link>
        <Link href="https://twitter.com/nabilconveys" target="_blank">
          <Icon as={FaTwitter} boxSize={6} />
        </Link>
        <Link href="https://www.youtube.com/@NabilConveys" target="_blank">
          <Icon as={FaYoutube} boxSize={6} />
        </Link>
        <Link href="https://whatsapp.com/channel/0029Va4PVWkLNSZwUOVJbA2X" target="_blank">
          <Icon as={FaWhatsapp} boxSize={6} />
        </Link>
      </Flex>

      {/* Second Row: Text Links */}
      <Flex mt={4} gap={4}>
        <Link href="#">Conditions of Use</Link>
        <Link href="#">Privacy & Policy</Link>
        {/* <Link href="#">Press Room</Link> */}
      </Flex>

      {/* Third Row: Copyright */}
      <Text mt={4} fontSize="sm">
        &copy; {new Date().getFullYear()} NabilConveys
      </Text>
    </Flex>
  );
};

export default Footer;
