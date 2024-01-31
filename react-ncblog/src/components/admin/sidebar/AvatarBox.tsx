import { Avatar, Flex, Text } from "@chakra-ui/react";
import useAuth from "../../../hooks/useAuth";
import useAdminLayout from "../useAdminLayout";

const AvatarBox = () => {
  const { firstname, lastname, email, img } = useAuth();
  const { state } = useAdminLayout();
  const navSize = state.navSize;

  return (
    <>
      <Flex
        // direction={navSize === "large" ? "row" : "column-reverse"}
        align="center"
        justify="space-between"
        gap={2}
        m={1}
        w="full"
        // p={4}
        p={3}
        borderWidth={navSize === "large" ? -1 : 0}
        // borderColor="gray.100"
        borderRadius="full"
      >
        <Flex align="center" justify="center">
          <Avatar
            name=""
            size="sm"
            bg="teal.300"
            m={-1}
            src={img}
          />
        </Flex>
        {navSize === "large" && (
          <Flex
            w="full"
            direction="column"
            gap={4}
            justify="center"
            align="flex-start"
          >
            <Text
              fontSize="sm"
              fontWeight="bold"
              pb={0}
              lineHeight={0}
              whiteSpace="nowrap"
              color="white"
            >
              {firstname + " " + lastname}
            </Text>
            <Text
              as="small"
              color="gray.500"
              fontSize={12}
              lineHeight={0}
              whiteSpace="nowrap"
            >
              {email}
            </Text>
          </Flex>
        )}
        {/* <IconButton
          aria-label="Settings"
          icon={<MdOutlineMoreHoriz />}
          borderRadius="full"
          color="gray.400"
          variant="ghost"
          fontSize={20}
        /> */}
      </Flex>
    </>
  );
};

export default AvatarBox;
