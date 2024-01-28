import { Text } from "@chakra-ui/react";
import { formatDate } from "../../utils/date";

const ElapsedDate = ({ date }: { date: Date }) => {
  const commentDate = typeof date === "string" ? new Date(date) : date;
  return (
    <Text size="2" color="gray">
      {formatDate(commentDate)}
    </Text>
  );
};

export default ElapsedDate;
