import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

type InputSearchProps = {
  placeholder: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const InputSearch = ({ placeholder, defaultValue, onChange }: InputSearchProps) => {
  return (
    <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:border-primary min-h-10 rounded-2xl shadow-sm has-[[data-slot=input-group-control]:focus-visible]:border-2 has-[[data-slot=input-group-control]:focus-visible]:ring-1">
      <InputGroupInput
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="placeholder:text-muted-foreground text-foreground w-full md:w-64"
      />
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default InputSearch;
