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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineVerified } from "react-icons/md";
import z from "zod";

type ButtonCustomProps = {
  title: string;
  userPass: string;
  icon: React.ReactElement<{ className: string }>;
};

const formSchema = z.object({
  username: z.string().min(5, "username must be atleast 5 characters"),
  password: z.string().min(5, "password must be atleast 5 characters"),
});

const ButtonCustom = ({ title, userPass, icon }: ButtonCustomProps) => {
  return (
    <Button
      variant="tertiary"
      className="h-fit gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-left transition-all hover:border-white/20 hover:bg-white/20"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
        {React.cloneElement(icon, {
          className: "h-3.5 w-3.5 text-amber-400",
        })}
      </div>
      <div>
        <h6 className="text-xs font-semibold">{title}</h6>
        <p className="text-xs text-blue-300">{userPass}</p>
      </div>
    </Button>
  );
};

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
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
              <Button variant="secondary">Masuk</Button>

              <Separator className="bg-white/10" />

              <p className="border-white/10 text-xs text-blue-300">
                Demo — Klik untuk isi otomatis:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <ButtonCustom
                  title="Admin HQ"
                  userPass="admin / admin123"
                  icon={<MdOutlineVerified />}
                />
                <ButtonCustom
                  title="Sales"
                  userPass="sales1 / sales123"
                  icon={<HiOutlineLightningBolt />}
                />
              </div>
            </FieldGroup>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
