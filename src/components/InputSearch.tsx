import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const InputSearch = () => {
  return (
    <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:border-primary min-h-10 rounded-2xl shadow-sm has-[[data-slot=input-group-control]:focus-visible]:border-2 has-[[data-slot=input-group-control]:focus-visible]:ring-1">
      <InputGroupInput
        placeholder="Search stores..."
        className="placeholder:text-muted-foreground text-foreground"
      />
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default InputSearch;
