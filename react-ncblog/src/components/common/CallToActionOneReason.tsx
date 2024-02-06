import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import onereason from "../../assets/images/onereason.png"

const CallToActionOneReason = () => {
  return (
    <>
      <Flex
        gap={4}
        direction={{ base: "column", md: "row" }}
        className="border border-teal-500 rounded-tl-3xl rounded-br-3xl"
        p={4}
      >
        <Flex bg="black" p={4} borderRadius={"20px"} flex="1" justify="center">
          <Image objectFit="cover" src={onereason} minH="200px"/>
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
            borderRadius={"full"}
            fontFamily={"Nunito"}
            fontSize={25}
          >
            Find out more on OneReason.org
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default CallToActionOneReason;