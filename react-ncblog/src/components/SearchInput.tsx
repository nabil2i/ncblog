import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import usePostQueryStore from "../store";

// interface Props {
//   onSearch: (searchText: string) => void
// }

const SearchInput = (
  // { onSearch }: Props
  ) => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = usePostQueryStore(s => s.setSearchText);

  return (
    // <form style={{ width: '100%'}} onSubmit={(event) => {
    <form onSubmit={(event) => {
      event.preventDefault();
      if (ref.current) setSearchText(ref.current.value);
    }}>
      <InputGroup>
      <InputLeftElement children={<BsSearch/>}/>
        <Input ref={ref} borderRadius={20} placeholder="Search blog..." variant="filled" />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
