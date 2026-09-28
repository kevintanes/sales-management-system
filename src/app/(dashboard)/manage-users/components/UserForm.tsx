"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { createUserAction, updateUserAction } from "../actions";
import {
  UserCreateInput,
  UserUpdateInput,
  userCreateSchema,
  userUpdateSchema,
} from "@/lib/validations/user";
import { JwtPayload } from "@/lib/auth/jwt";

type UserFormValues = UserCreateInput | UserUpdateInput;

interface UserFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<UserFormValues>;
  userId?: string;
  currentUserRole: JwtPayload["role"];
  isSelf?: boolean;
  onSuccess: () => void;
}

const ROLE_OPTIONS: JwtPayload["role"][] = ["SUPERADMIN", "ADMIN", "SALES"];

const UserForm = ({
  mode,
  defaultValues,
  userId,
  currentUserRole,
  isSelf,
  onSuccess,
}: UserFormProps) => {
  const [isPending, startTransition] = useTransition();
  const schema = mode === "create" ? userCreateSchema : userUpdateSchema;

  const form = useForm<UserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      role: "SALES",
      password: "",
      ...defaultValues,
    },
  });

  const roleOptions = ROLE_OPTIONS.filter(
    (role) => role !== "SUPERADMIN" || currentUserRole === "SUPERADMIN",
  );

  const onSubmit = (values: UserFormValues) => {
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createUserAction(values as UserCreateInput)
          : await updateUserAction(userId as string, values as UserUpdateInput);

      if (!result.success) {
        form.setError("root", { message: result.error });
        return;
      }

      onSuccess();
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField control={form.control} name="name" label="Name" placeholder="John Doe" />
        <FormField
          control={form.control}
          name="username"
          label="Username"
          placeholder="john.doe"
        />
        <FormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="john@example.com"
        />

        <Controller
          name="role"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel className="text-sm leading-none font-medium">
                Role
              </FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSelf}
              >
                <SelectTrigger className="border-input bg-background text-foreground focus:ring-ring focus:border-ring focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none focus-visible:ring-1 focus-visible:outline-none">
                  <SelectValue placeholder="Select role.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roleOptions.map((role) => (
                      <SelectItem value={role} key={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          label={
            mode === "edit" ? "Password (kosongkan jika tidak diubah)" : "Password"
          }
          type="password"
          placeholder="********"
        />
      </FieldGroup>

      {form.formState.errors.root && (
        <p className="text-destructive mt-4 text-sm">
          {form.formState.errors.root.message}
        </p>
      )}

      <Button
        className="mt-8 w-full"
        variant="primary"
        size="lg"
        type="submit"
        disabled={isPending}
      >
        Save User
      </Button>
    </form>
  );
};

export default UserForm;
