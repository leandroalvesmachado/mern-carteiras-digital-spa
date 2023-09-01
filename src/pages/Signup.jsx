import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorInput from "../components/ErrorInput";

const signupSchema = z.object({
  name: z
    .string()
    .nonempty("E-mail obrigatório")
    .min(3, "O nome precisa ter no minímo 3 caracteres")
    .transform((name) => {
      return name.trim().split(" ").map((word) => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      })
      .join()
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("E-mail inválido")
    .toLowerCase(),
  password: z.string().min(6, "A senha precisa ter no minímo 6 caracteres"),
  confirmPassword: z.string().min(6, "A senha precisa ter no minímo 6 caracteres"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"]
});

export default function Signup() {
  const {
    register,
    handleSubmit, 
    formState: { errors }
  } = useForm({ resolver: zodResolver(signupSchema) });

  function handleSubmitForm(data) {
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem] relative">
      <Link to="/signin">
        <BiArrowBack className="text-white absolute top-3 left-3 text-2xl hover:text-sky-600" />
      </Link>
      <img src={logo} alt="Logo" className="w-44" />
      <form 
        onSubmit={handleSubmit(handleSubmitForm)} 
        className="flex flex-col items-center justify-center gap-4 w-full text-2xl"
      >
        <Input type="text" placeholder="Full Name" register={register} name="name" />
        {errors.name && <ErrorInput text={errors.name.message} />}
        <Input type="email" placeholder="Email" register={register} name="email" />
        {errors.email && <ErrorInput text={errors.email.message} />}
        <Input type="password" placeholder="Password" register={register} name="password" />
        {errors.password && <ErrorInput text={errors.password.message} />}
        <Input type="password" placeholder="Confirm Password" register={register} name="confirmPassword" />
        {errors.confirmPassword && <ErrorInput text={errors.confirmPassword.message} />}
        <Button type="submit" text="SIGNUP" />
      </form>
    </div>
  )
}
