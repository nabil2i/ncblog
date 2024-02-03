import { Button, Link } from "@chakra-ui/react";

const AddUserButton = () => {
  return (
    <Link href={`/dashboard/users/new`}>
      <Button colorScheme="gray">Create a user</Button>
    </Link>
  );
};

export default AddUserButton;
