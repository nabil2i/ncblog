import { Badge } from "@chakra-ui/react";

const RoleBadge = ({ role }: { role: string }) => {
  const therole = role.toLowerCase();
  // console.log(role);
  const color =
    therole === "admin"
      ? "green"
      : therole === "editor"
      ? "purple"
      : therole === "regular"
      ? "default"
      : "red";
  return (
    <>
      <Badge
        variant="solid"
        colorScheme={color}
        fontSize={"14px"}
        px={2}
        borderRadius={"4px"}
      >
        {role}
      </Badge>
    </>
  );
};

export default RoleBadge;
