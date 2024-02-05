import { Button, Flex, FormControl, Select, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../../app/features/users/usersApiSlice";
import User from "../../../entities/User";

const ChangeRolesAction = ({ user }: { user: User }) => {
  // console.log(userId)
  const navigate = useNavigate();
  // const [error, setError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const cancelRef = useRef<null | HTMLButtonElement>(null);
  const toast = useToast();

  const [updateUser, { isError, isSuccess }] = useUpdateUserMutation();
  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/dashboard?tab=users");
  //     setIsUpdating(false);
  //     setIsOpen(false);
  //     toast({
  //       title: "",
  //       description: "User deleted successfully",
  //       duration: 5000, // 5s
  //       isClosable: true,
  //       status: "success",
  //       position: "top",
  //     });
  //   }

  //   if (isError) {
  //     setIsUpdating(false);
  //     // setError(true);
  //     setIsOpen(false);
  //     toast({
  //       title: "",
  //       description: "Could  not delete the user",
  //       duration: 5000, // 5s
  //       isClosable: true,
  //       status: "error",
  //       position: "top",
  //       icon: <DeleteIcon />,
  //     });
  //   }
  // }, [isError, isSuccess, navigate, toast]);

  // const triggerUpdateUser = (userId: string) => {
  //   console.log("triggerid", userId);
  //   if (userId) {
  //     setIsUpdating(true);
  //     updateUser(userId);
  //   }
  // };

  const [selectedRoles, setSelectedRoles] = useState(user.roles);

  // const handleRolesChange = (e) => {
  //   setSelectedRoles(e.target.value);
  // };

  // const handleUpdateRoles = () => {
  //   updateUser.mutate({
  //     userId: user._id,
  //     data: {
  //       roles: selectedRoles,
  //     },
  //   });
  // };

  return (
    <>
      <Flex direction="column" gap={3}>
        <FormControl>
          <Select
            placeholder="Select roles"
            value={selectedRoles}
            onChange={handleRolesChange}
            multiple
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            {/* Add more roles as needed */}
          </Select>
        </FormControl>
        <Button colorScheme="teal">
          Update Roles
        </Button>
      </Flex>
    </>
  );
};

export default ChangeRolesAction;
