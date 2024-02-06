import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import iera from "../../assets/images/iera.png"

const CallToActionIera = () => {
  return (
    <>
      <Flex
        gap={4}
        direction={{ base: "column", md: "row" }}
        className="border border-teal-500 rounded-tl-3xl rounded-br-3xl"
        p={4}
      >
        <Flex direction="column"  justify="center"gap={2} flex="1" mx={{ base: "8", md: 0}}>
          <Box textAlign="center" fontSize={22}>
            Learn to share Islam with confidence as Prophet Muhammad (peace be
            upon him) instructed
          </Box>
          <Button
            as={Link}
            to={"https://training.iera.org/"}
            target="_blank"
            bg="teal"
            color="white"
            borderRadius={"full"}
            fontFamily={"Nunito"}
            fontSize={25}
          >
            iERA Online Training
          </Button>
        </Flex>
        <Flex bg="white" p={4} borderRadius={"20px"} flex="1" justify="center">
          <Image
            objectFit="cover"
            src={iera
              // "https://iera.org/wp-content/uploads/2023/02/iERA-Share-Islam-white-01.png"
            }
          />
        </Flex>
      </Flex>
    </>
  );
};

export default CallToActionIera;
