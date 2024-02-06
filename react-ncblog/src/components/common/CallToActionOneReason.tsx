import { Box, Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import onereason from "../../assets/images/onereason.png";

const CallToActionOneReason = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        gap={4}
        direction={{ base: "column", md: "row" }}
        className="border border-teal-500 rounded-tl-3xl rounded-br-3xl"
        p={4}
      >
        <Flex bg="white" p={4} borderRadius={"20px"} flex="1" justify="center">
          <Image objectFit="cover" src={onereason} />
        </Flex>
        <Flex
          direction="column"
          justify="center"
          gap={2}
          flex="1"
          mx={{ base: "8", md: 0 }}
        >
          <Box textAlign="center" fontSize={22}>
            Why people hold back from discussing the belief in God? What's your
            goal in life?
          </Box>
          <Button
            as={Link}
            to={"https://onereason.org/"}
            target="_blank"
            bg="teal"
            color="white"
            _hover={{ bg: colorMode === "light" ? "gray" : "gray" }}
            borderRadius={"full"}
            fontFamily={"Nunito"}
            fontSize={25}
            // color="white"
          >
            Find out more on OneReason.org
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default CallToActionOneReason;
