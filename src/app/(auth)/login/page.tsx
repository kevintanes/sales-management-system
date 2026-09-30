"use client";

import Card from "@/components/Card";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdOutlineVerified } from "react-icons/md";
import z from "zod";
import { loginAction } from "@/lib/auth/actions";

type ButtonCustomProps = {
  title: string;
  username: string;
  password: string;
  userPass: string;
  icon: React.ReactElement<{ className: string }>;
  onClick: (username: string, password: string) => void;
};

const formSchema = z.object({
  username: z.string().min(5, "username must be atleast 5 characters"),
  password: z.string().min(5, "password must be atleast 5 characters"),
});

const ButtonCustom = ({
  title,
  username,
  password,
  userPass,
  icon,
  onClick,
}: ButtonCustomProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onClick(username, password)}
      className="h-fit justify-start gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-left transition-all hover:border-white/20 hover:bg-white/20 hover:text-white"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
        {React.cloneElement(icon, { className: "h-3.5 w-3.5 text-amber-400" })}
      </div>
      <div>
        <h6 className="text-xs font-semibold">{title}</h6>
        <p className="text-xs text-blue-300">{userPass}</p>
      </div>
    </Button>
  );
};

const LoginPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setServerError(null);
    startTransition(async () => {
      const result = await loginAction(
        values.username.trim().toLowerCase(),
        values.password,
      );
      if (!result.success) {
        setServerError(result.error);
        return;
      }
      router.push("/");
      router.refresh(); // penting: supaya server component re-render dengan cookie baru
    });
  };

  const fillDemo = (username: string, password: string) => {
    form.setValue("username", username);
    form.setValue("password", password);
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-linear-to-br from-blue-950 via-blue-900 to-blue-800">
      <div className="w-full max-w-md text-center text-white">
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

        <Card className="rounded-xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-4">
            <div className="mb-1.5 text-xl font-semibold tracking-tight">
              Masuk ke Sistem
            </div>
            <div className="text-sm text-blue-200">
              Masukkan username dan password Anda
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {serverError && (
                <p className="rounded-md bg-red-500/20 px-3 py-2 text-sm text-red-200">
                  {serverError}
                </p>
              )}

              <FormField
                control={form.control}
                name="username"
                label="Username"
                placeholder="Masukan username"
                inputClassName="border-white/20 bg-white/10 text-white placeholder:text-blue-300/60 focus:border-blue-400"
                labelClassName="text-blue-100"
              />

              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Masukan password"
                type="password"
                inputClassName="border-white/20 bg-white/10 text-white placeholder:text-blue-300/60 focus:border-blue-400"
                labelClassName="text-blue-100"
              />

              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="mt-2 w-full"
                disabled={isPending}
              >
                {isPending ? "Memproses..." : "Masuk"}
              </Button>

              <Separator className="bg-white/10" />

              <p className="border-white/10 text-xs text-blue-300">
                Demo — Klik untuk isi otomatis:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <ButtonCustom
                  title="Admin HQ"
                  username="admin"
                  password="admin123"
                  userPass="admin / admin123"
                  icon={<MdOutlineVerified />}
                  onClick={fillDemo}
                />
                <ButtonCustom
                  title="Sales"
                  username="sales1"
                  password="sales123"
                  userPass="sales1 / sales123"
                  icon={<HiOutlineLightningBolt />}
                  onClick={fillDemo}
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
