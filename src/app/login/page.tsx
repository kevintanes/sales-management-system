"use client";

import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  username: z.string().min(5, "username must be atleast 5 characters"),
  password: z.string().min(5, "password must be atleast 5 characters"),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-linear-to-br from-blue-950 via-blue-900 to-blue-800">
      <div className="w-full max-w-md text-center text-white">
        {/* title */}
        <div className="mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl">
            <Image
              src="/advance-digitals.png"
              alt="advance digitals logo"
              height={36}
              width={36}
              className="object-contain"
            />
          </div>
          <h1 className="font-outfit text-3xl font-bold tracking-tight text-white">
            Advance Digitals
          </h1>
          <p className="mt-1 text-sm text-blue-200">Sales Management System</p>
        </div>

        {/* card */}
        <Card className="rounded-xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-4">
            <div className="mb-1.5 text-xl font-semibold tracking-tight">
              Masuk ke Sistem
            </div>
            <div className="text-sm text-blue-200">
              Masukkan username dan password Anda
            </div>
          </div>
          <form>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-0.5">
                    <FieldLabel htmlFor="username" className="text-blue-100">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Masukan username"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-0.5">
                    <FieldLabel htmlFor="password" className="text-blue-100">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Masukan password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button>Masuk</Button>
            </FieldGroup>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
