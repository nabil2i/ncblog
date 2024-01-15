import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import {BsChevronDown} from 'react-icons/bs'

const CategorySelector = () => {
  return (
    // render a dropdown list with Menu component
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Category
      </MenuButton>
      <MenuList>
        <MenuItem>Category 1</MenuItem>
        <MenuItem>Category 2</MenuItem>
        <MenuItem>Category 3</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
