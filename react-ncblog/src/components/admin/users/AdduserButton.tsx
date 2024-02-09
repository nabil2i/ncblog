import { Button, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const AddUserButton = () => {
  return (
    <Link
      as={NavLink}
      _hover={{ textDecoration: "none" }}
      to={`/dashboard/users/new`}
    >
      <Button colorScheme="gray">Create a user</Button>
    </Link>
  );
};

export default AddUserButton;
