import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const FormField = <T extends FieldValues>({
  control,
  label,
  name,
  className,
  placeholder,
  type = "text",
  inputClassName,
  labelClassName,
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={className}>
          <FieldLabel
            htmlFor={name}
            className={cn("text-sm leading-none font-medium", labelClassName)}
          >
            {label}
          </FieldLabel>
          <Input
            {...field}
            id={name}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            className={inputClassName}
          />
          {fieldState.invalid && (
            <FieldError
              errors={[fieldState.error]}
              className="text-left text-red-950"
            />
          )}
        </Field>
      )}
    />
  );
};

export default FormField;
