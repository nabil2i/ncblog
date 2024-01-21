import { Avatar, Box, Card, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import useAuth from "../navigationbar/useAuth";
import DeleteAccount from "./DeleteAccount";
import EditEmail from "./EditEmail";
import EditName from "./EditName";
import EditPassword from "./EditPassword";

const AccountTab = () => {
  const { state } = useAuth();

  return (
    <>
      <Text size="2"></Text>
      <Grid templateColumns={{ base: "1", lg: "5" }} gap="5">
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap="4"
          mt="5"
          display={{ base: "flex", lg: "none" }}
        >
          {state.isAuthenticated && (
            <Avatar
              src={state.user?.img}
              // fallback={state.user?.firstname?.slice(0, 1)}
              size="9"
            />
          )}
        </Flex>

        <Flex align="center" justify="center" gap={10}>
          <Flex direction="column" flex="1" gap="3">
            <Card style={{ padding: 20, border: "1px solid #ccc" }}>

              <Flex align="center" justify="space-between">
                <Flex direction="column">
                  <Text className="text-gray-500">
                    <strong>Full Name</strong> {}
                  </Text>
                  <Text>
                    <strong>
                      {state.user?.firstname + " " + state.user?.lastname}
                    </strong>{" "}
                    {}
                  </Text>
                </Flex>
                <EditName />
              </Flex>

              <Divider orientation="horizontal" color="gray.500" my="3" />

              <Flex align="center" justify="space-between">
                <Flex direction="column">
                  <Text className="text-gray-500">
                    <strong>Email</strong> {}
                  </Text>
                  <Text>
                    <strong>{state.user?.email}</strong> {}
                  </Text>
                </Flex>
                <EditEmail />
              </Flex>

              <Divider orientation="horizontal" color="gray.500" my="3" />

              <Flex align="center" justify="space-between">
                <Flex direction="column">
                  <Text className="text-gray-500">
                    <strong>Password</strong> {}
                  </Text>
                  <Text>
                    <strong>***********</strong> {}
                  </Text>
                </Flex>
                <EditPassword />
              </Flex>
            </Card>
            <DeleteAccount />
          </Flex>

          <Box>
            <Flex
              direction="column"
              justify="center"
              align="center"
              gap="4"
              display={{ base: "none", lg: "flex" }}
            >
              {state.user?.isAuthenticated && (
                <Avatar
                  src={state.user?.img}
                  // fallback={userData.firstname?.slice(0, 1)}
                  size="9"
                />
              )}
            </Flex>
          </Box>
        </Flex>
      </Grid>
    </>
  );
};

export default AccountTab;
