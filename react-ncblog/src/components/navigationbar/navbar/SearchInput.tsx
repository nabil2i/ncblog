import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchPostQueryStore } from "../../../store";


const SearchInput = () =>

  {
    const ref = useRef<HTMLInputElement>(null);
    const setSearchText = useSearchPostQueryStore((s) => s.setSearchText);
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    return (
      <>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (ref.current) {
              const searchText = ref.current.value;
              setSearchText(searchText);
              // navigate(`/search/${ref.current.value}`);
              setSearchParams({ q: searchText });
              navigate(`/search?q=${searchParams.get('q')}`);
            }
          }}
        >
          <InputGroup>
            <InputLeftElement children={<BsSearch />} />
            <Input
              ref={ref}
              borderRadius={20}
              placeholder="Search blog..."
              variant="filled"
            />
          </InputGroup>
        </form>
      </>
    );
  };

export default SearchInput;
