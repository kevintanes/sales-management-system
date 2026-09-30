export type Role = "SUPERADMIN" | "ADMIN" | "SALES";

export type CurrentUser = {
  userId: string;
  username: string;
  role: Role;
};
