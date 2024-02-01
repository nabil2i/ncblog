import { Card, Divider, Flex, Text } from "@chakra-ui/react";
import "react-circular-progressbar/dist/styles.css";
import useAuth from "../../hooks/useAuth";
import DeleteAccount from "./DeleteAccount";
import EditEmail from "./EditEmail";
import EditName from "./EditName";
import EditPassword from "./EditPassword";
import EditProfilePicture from "./EditProfilePicture";

const AccountTab = () => {
  const { firstname, lastname, email, roles } = useAuth();

  return (
    <>
      <Flex display="column" gap="8">
        <Flex
          direction="column"
          align="center"
          display={{ base: "flex", lg: "none" }}
        >
          <EditProfilePicture />
        </Flex>

        <Flex gap={8} mt={{ base: 8, lg: 0 }}>
          <Flex direction="column" flex="1">
            <Card style={{ padding: 20, border: "1px solid #ccc" }}>
              <Flex align="center" justify="space-between">
                <Flex direction="column">
                  <Text className="text-gray-500">
                    <strong>Full Name</strong> {}
                  </Text>
                  <Text>
                    <strong>{firstname + " " + lastname}</strong> {}
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
                    {roles.length > 2 &&
                      roles
                        .slice(0, roles.length - 1)
                        .map((role) => <strong key={role}>{role}, </strong>)}
                    {roles.slice(roles.length - 1).map((role) => (
                      <strong key={role}>{role}</strong>
                    ))}
                  </Text>
                </Flex>
              </Flex>

              <Divider orientation="horizontal" color="gray.500" my="3" />

              <Flex align="center" justify="space-between">
                <Flex direction="column">
                  <DeleteAccount />
                </Flex>
              </Flex>
            </Card>
          </Flex>

          <Flex
            direction="column"
            justify="center"
            align="center"
            gap="4"
            display={{ base: "none", lg: "flex" }}
          >
            <EditProfilePicture />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default AccountTab;
