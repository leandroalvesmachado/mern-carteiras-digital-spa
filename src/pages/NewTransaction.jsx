import { Link, useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from "../schemas/TransactionSchema";
import Input from "../components/Input";
import ErrorInput from "../components/ErrorInput";
import Button from "../components/Button";
import { createNewTransaction } from "../services/transaction";
import { useState } from "react";

export default function NewTransaction() {
  // recuperando parametro da url
  const { type } = useParams();
  const {
    register,
    handleSubmit, 
    formState: { errors }
  } = useForm({ resolver: zodResolver(transactionSchema) });
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState("");

  async function onSubmitForm(data) {
    try {
      const body = {...data, type};
      await createNewTransaction(body);

      navigate("/");
    } catch (error) {
      setApiErrors(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 roudend p-8 gap-7 relative">
      <header>
        <Link to="/">
          <BiArrowBack className="text-white absolute top-3 left-3 text-2xl" />
        </Link>
        <h1 className="text-white font-bold text-5xl">New {type}</h1>
      </header>
      {apiErrors && (
        <ErrorInput text={apiErrors} />
      )}
      <form 
        onSubmit={handleSubmit(onSubmitForm)} 
        className="flex flex-col items-center justify-center gap-4 w-full text-2xl"
      >
        <Input
          type="number"
          placeholder="Value"
          register={register}
          name="value"
        />
        {errors.value && (
          <ErrorInput text={errors.value.message} />
        )}
        <Input
          type="text"
          placeholder="Description"
          register={register}
          name="description"
        />
        {errors.description && (
          <ErrorInput text={errors.description.message} />
        )}
        <Button type="submit" text="SAVE" />
      </form>
    </div>
  )
}
