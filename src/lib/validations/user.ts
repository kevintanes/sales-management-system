import z from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .regex(/^[a-z0-9_.]+$/, "Username hanya boleh huruf kecil, angka, _ dan ."),
  email: z.string().email("Email tidak valid"),
  role: z.enum(["SUPERADMIN", "ADMIN", "SALES"]),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export const userUpdateSchema = userCreateSchema.extend({
  password: z.union([z.literal(""), z.string().min(8, "Password minimal 8 karakter")]),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
