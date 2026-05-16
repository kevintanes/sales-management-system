import { LucideFunnel } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type FilterButtonProps = {
  categories: string[];
  defaultValue: string;
  placeholder: string;
};

const FilterButton = ({
  categories,
  defaultValue,
  placeholder,
}: FilterButtonProps) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="border-input bg-background text-foreground focus:ring-ring focus:border-ring focus-visible:ring-ring min-h-10 min-w-40 rounded-2xl border px-3 text-sm shadow-sm focus:ring-1 focus:outline-none focus-visible:ring-1 focus-visible:outline-none">
        <LucideFunnel className="opacity-50" />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {categories.map((category) => (
            <SelectItem value={category} key={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterButton;
