import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().nonempty("E-mail obrigatório").email(),
  password: z.string().nonempty("Senha obrigatória").min(6, "A senha precisa ter no mínimo 6 caracteres")
});
