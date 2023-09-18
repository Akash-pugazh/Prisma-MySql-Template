import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3).max(20),
  price: z.number(),
});

export type productType = z.infer<typeof productSchema>;
