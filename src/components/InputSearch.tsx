import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const InputSearch = () => {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Search stores..." />
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default InputSearch;
