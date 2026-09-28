import { LucideFunnel } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type FilterOption = { value: string; label: string };

type FilterButtonProps = {
  categories: string[] | FilterOption[];
  defaultValue: string;
  placeholder: string;
  onValueChange?: (value: string) => void;
};

const FilterButton = ({
  categories,
  defaultValue,
  placeholder,
  onValueChange,
}: FilterButtonProps) => {
  const options: FilterOption[] = categories.map((category) =>
    typeof category === "string"
      ? { value: category, label: category }
      : category,
  );

  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className="border-input bg-background text-foreground focus:ring-ring focus:border-ring focus-visible:ring-ring min-h-10 min-w-40 rounded-2xl border px-3 text-sm shadow-sm focus:ring-1 focus:outline-none focus-visible:ring-1 focus-visible:outline-none">
        <LucideFunnel className="opacity-50" />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterButton;
