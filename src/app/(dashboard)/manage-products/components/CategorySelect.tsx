"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { MdAdd, MdCheck, MdClose } from "react-icons/md";

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
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleAdd = (onChange: (value: string) => void) => {};

  const handleCancel = () => {
    setInputValue("");
    setInputError("");
    setShowInput(false);
  };

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
            <div className="flex gap-2">
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-input bg-background text-foreground focus:ring-ring focus:border-ring focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none focus-visible:ring-1 focus-visible:outline-none">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem value={category} key={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                className="h-9 gap-1 rounded-md px-3 text-xs shadow-sm"
                onClick={() => setShowInput(true)}
              >
                <MdAdd className="text-base" />
                New
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-2">
                <Input
                  autoFocus
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setInputError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAdd(field.onChange);
                    }
                    if (e.key === "Escape") handleCancel();
                  }}
                  placeholder="e.g. Gaming"
                  className="h-9"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  className="h-9 shrink-0 px-3"
                  onClick={() => handleAdd(field.onChange)}
                >
                  <MdCheck className="text-base" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-9 shrink-0 px-3 hover:-translate-y-0.5"
                  onClick={handleCancel}
                >
                  <MdClose className="text-base" />
                </Button>
              </div>
              {inputError && (
                <p className="text-destructive text-xs">{inputError}</p>
              )}
            </div>
          )}
        </Field>
      )}
    />
  );
};

export default CategorySelect;
