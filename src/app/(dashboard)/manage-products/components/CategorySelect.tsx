"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CategorySelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

const DUMMY_CATEGORIES = [
  "Audio",
  "TV",
  "Laptop",
  "Phone",
  "Tablet",
  "Accessories",
];

const CategorySelect = <T extends FieldValues>({
  control,
  name,
}: CategorySelectProps<T>) => {
  const [categories, setCategories] = useState<string[]>(DUMMY_CATEGORIES);
  const [showInput, setShowInput] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel className="text-sm leading-none font-medium">
            Category
          </FieldLabel>
          {!showInput ? (
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select category..."
                  className="border-input bg-background text-foreground focus:ring-ring h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <div>aa</div>
          )}
        </Field>
      )}
    />
  );
};

export default CategorySelect;
