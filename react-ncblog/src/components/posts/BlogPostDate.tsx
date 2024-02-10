import { Text } from "@chakra-ui/react";
import dateFormat from "dateformat";
import "moment-timezone";

interface Props {
  date: Date | undefined;
}
const BlogPostDate = ({ date }: Props) => {
  return (
    <Text as="time" fontSize={"md"} color="gray">
      {
        dateFormat(date, "mmm dd, yyyy")
        // new Intl.DateTimeFormat(
        //   'en-US',
        //   {
        //     year: 'numeric',
        //     month: 'long',  //2-digit',
        //     day: '2-digit'
        //     // hour: '2-digit',
        //     // minute: '2-digit',
        //     // second: '2-digit'
        //   }
        // ).format(Date.now())
      }
    </Text>
  );
};

export default BlogPostDate;
