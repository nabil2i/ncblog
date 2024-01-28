import { Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/icons/NabilConveys1.webp";
const Dashboard = () => {
  return (
    <>
      <Flex h="92%" maxW="600px" mx="auto" p={8} justify="space-around">
        <Image src={logo} />
      </Flex>
    </>
  );
};

export default Dashboard;
