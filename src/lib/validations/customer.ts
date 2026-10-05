import z from "zod";

export function normalizePhone(phone: string): string {
  let result = phone.replace(/[\s\-().]/g, "");

  // Ganti awalan kode negara Indonesia menjadi 0
  if (result.startsWith("+62")) {
    result = "0" + result.slice(3);
  } else if (result.startsWith("62")) {
    result = "0" + result.slice(2);
  }

  return result;
}

// Nomor valid: diawali 0, lalu 8 sampai 13 digit angka
function isValidPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  return /^0\d{8,13}$/.test(normalized);
}

export const customerSchema = z.object({
  storeName: z.string().trim().min(2, "Nama toko minimal 2 karakter"),
  ownerName: z.string().trim().min(2, "Nama pemilik minimal 2 karakter"),
  phone: z.string().trim().refine(isValidPhone, "Nomor telepon tidak valid"),
  email: z.union([
    z.literal(""),
    z.string().trim().toLowerCase().email("Email tidak valid"),
  ]),
  address: z.string().trim().min(5, "Alamat minimal 5 karakter"),
  city: z.string().trim().min(2, "Kota minimal 2 karakter"),
});

export type CustomerInput = z.infer<typeof customerSchema>;
