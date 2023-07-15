import { Heading } from "@chakra-ui/react";
// import { PostQuery } from "../App";
import usePostQueryStore from "../store";

// interface Props {
//   postQuery: PostQuery;
// }

const PostHeading = (
  // { postQuery }: Props
  ) => {
  let heading;
  
  const searchText = usePostQueryStore(s => s.postQuery.searchText);


  if (searchText){
    heading = `Search Posts containing: ${searchText || ''}`;
  }
  else {
    heading = "Posts";
  }
  return <Heading as="h2" marginY={5} fontSize='5xl'>{heading}</Heading>;
};

export default PostHeading;
