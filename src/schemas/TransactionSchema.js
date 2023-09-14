import { z } from "zod";

export const transactionSchema = z.object({
  value: z
    .string()
    .nonempty("Valor obrigatório")
    .min(3, "O valor percisa ter no minímo 3 caracteres")
    .transform((value) => Number(value)),
  description: z
    .string()
    .nonempty("Senha obrigatória")
    .min(3, "A descrição precisa ter no mínimo 3 caracteres")
});
