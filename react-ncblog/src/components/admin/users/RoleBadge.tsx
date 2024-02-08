import { Badge } from "@chakra-ui/react";

const RoleBadge = ({ role }: { role: string }) => {
  const therole = role.toLowerCase();
  // console.log(role);
  const color =
    therole === "superadmin"
      ? "teal"
      : therole === "admin"
      ? "green"
      : therole === "writer"
      ? "purple"
      : therole === "standard"
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
        {role || "No role"}
      </Badge>
    </>
  );
};

export default RoleBadge;
