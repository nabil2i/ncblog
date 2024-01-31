import { Avatar, Box, Card, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import DeleteAccount from "./DeleteAccount";
import EditEmail from "./EditEmail";
import EditName from "./EditName";
import EditPassword from "./EditPassword";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { authSatus } from "../../app/features/auth/authSlice";

const AccountTab = () => {
  const { firstname, lastname, img, email, roles } = useAuth();
  const isAuthenticated = useSelector(authSatus);

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
          {isAuthenticated && (
            <Avatar
              src={img}
              // fallback={firstname?.slice(0, 1)}
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
                      {firstname + " " + lastname}
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
                    <strong>{email}</strong> {}
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

              <Flex align="center" justify="space-between">
                <Flex direction="column">
                  <Text className="text-gray-500">
                    <strong>Roles</strong> {}
                  </Text>
                  <Text>
                    {roles.length > 2 && roles.slice(0, roles.length - 1).map((role) => (<strong key={role}>{role}, </strong>))}
                    {roles.slice(roles.length - 1).map((role) => (<strong key={role}>{role}</strong>))}
                  </Text>
                </Flex>
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
              {isAuthenticated && (
                <Avatar
                  src={img}
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
