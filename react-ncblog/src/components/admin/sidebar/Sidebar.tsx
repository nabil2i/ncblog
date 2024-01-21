import { Flex } from "@chakra-ui/react";
import LogoSearch from "../../common/LogoSearch";
import AvatarBox from "./AvatarBox";
import Navigation from "./Navigation";

interface Props {
  navSize: string;
  toggleMobileSidebar?: () => void;
  showMobileSidebar?: boolean;
}

const Sidebar = ({ navSize, toggleMobileSidebar }: Props) => {
  return (
    <>
      <Flex
        direction="column"
        w="full"
        h="full"
        minH="100vh"
        justify="space-between"
        bg={"#2e3238"}
        color={"white"}
      >
        <Flex direction="column" justify="flex-start">
          {/* Logo */}
          <LogoSearch
            navSize={navSize}
            toggleMobileSidebar={toggleMobileSidebar}
          />

          {/* Navitems */}
          <Navigation
            navSize={navSize}
            toggleMobileSidebar={toggleMobileSidebar}
          />
        </Flex>

        {/* Avatar */}
        <AvatarBox navSize={navSize} />
      </Flex>
    </>
  );
};

export default Sidebar;
