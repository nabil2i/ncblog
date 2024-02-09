import { Box, Flex, IconButton, Image, Link, Text } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import NabilConveys1 from "../../assets/icons/NabilConveys1.webp";
import useAdminLayout from "../admin/useAdminLayout";
import { NavLink } from "react-router-dom";

interface Props {
  boxSize?: string;
  fontSize?: string;
}

const LogoSearch = ({ boxSize, fontSize }: Props) => {
  const { state, dispatch } = useAdminLayout();
  const navSize = state.navSize;

  return (
    <Flex
      w="full"
      align="center"
      justify="space-between"
      bg="teal"
      pl={{ base: 0, lg: 4 }}
      py={"20px"}
      // p={4}
      // ml={4}
      // direction={navSize === "large" ? "row" : "column"}
      // gap={4}
      // p={3}
      // minH="60px"
    >
      <Link  as={NavLink} to="/admin" _hover={{ textDeration: "none" }}>
        <Box display="flex" alignItems="center" gap={1} pl={{ base: 4, lg: 0 }}>
          <Image
            src={NabilConveys1}
            boxSize={boxSize || 30}
            objectFit="cover"
          />

          <Text
            color="white"
            display={navSize === "large" ? "flex" : "none"}
            fontSize={fontSize || 14}
            whiteSpace="nowrap"
            fontWeight={900}
          >
            NabilConveys
          </Text>
        </Box>
      </Link>

      <Box display={{ base: "flex", lg: "none" }}>
        <IconButton
          background="none"
          // mt={2}
          _hover={{ backgroundg: "none" }}
          icon={<FiMenu />}
          onClick={() => dispatch({ type: "TOGGLE_MOBILE_SIDEBAR" })}
          aria-label={"Sidebar"}
          variant="ghost"
          color="white"
        />
      </Box>

      {/* <IconButton
          aria-label={"Search"}
          variant="ghost"
          icon={<AiOutlineSearch />}
          fontSize={26}
          color="gray.400"
          borderRadius={"50%"}
        /> */}
    </Flex>
  );
};

export default LogoSearch;
