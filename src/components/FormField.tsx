import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";

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
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

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
          <div className="relative">
            <Input
              {...field}
              id={name}
              type={isPasswordField && showPassword ? "text" : type}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              className={cn(isPasswordField && "pr-9", inputClassName)}
            />
            {isPasswordField && (
              <div className="absolute inset-y-0 right-1 flex items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-blue-300 hover:bg-white/10 hover:text-white active:translate-y-0"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
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
