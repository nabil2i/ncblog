import { Flex, Text } from "@chakra-ui/react";

interface Props {
  title: string;
}

const PageHeading = ({ title }: Props) => {
  return (
    <>
      <Flex
        background={"teal"}
        height="100px"
        width="100%"
        align="center"
        justify="center"
      >
        <Text fontSize={30} fontWeight={700} color="white">
          {title}
        </Text>
      </Flex>
    </>
  );
};

export default PageHeading;
