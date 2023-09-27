import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
// import usePostQueryStore from "../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePostQueryStore, { useSearchPostQueryStore } from "../../../store";

// interface Props {
//   onSearch: (searchText: string) => void
// }

const SearchInput = (
  // { onSearch }: Props
  ) => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useSearchPostQueryStore(s => s.setSearchText);
  const navigate = useNavigate();

  // const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
    {/* <form style={{ width: '100%'}} onSubmit={(event) => { */}
      <form onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          setSearchText(ref.current.value);
          navigate(`/search/${ref.current.value}`);
          // setSearchParams({ q: 'active'});
          // navigate(`/search?q=${searchParams}`);
        }
        
      }}>
        <InputGroup>
          <InputLeftElement children={<BsSearch/>}/>
          <Input ref={ref} borderRadius={20} placeholder="Search blog..." variant="filled" />
        </InputGroup>
      </form>
    </>
  );
};

export default SearchInput;
