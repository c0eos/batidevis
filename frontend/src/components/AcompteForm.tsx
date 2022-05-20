import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";

export default function AcompteForm({ acompte } : {acompte:any}) {
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    defaultValues: acompte,
  });

  useEffect(() => {
    reset(acompte);
  }, [acompte]);

  const onSubmit = (data:any) => {
    console.log(data);
    console.log(errors);
    console.log(acompte);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto"
    >

      <Input label="Id" register={register} data={acompte} disabled />
      <Input label="Code" accessor="codeAcompte" register={register} data={acompte} disabled />
      <Input label="Sujet" register={register} data={acompte} />
      <Input label="Code client" accessor="codeClient" register={register} data={acompte} disabled />
      <Input label="Code devis" accessor="codeDevis" register={register} data={acompte} disabled />
      <Input label="Code facture" accessor="codeFacture" register={register} data={acompte} disabled />
      <Input label="Mis à jour" accessor="date" register={register} data={acompte} disabled />

      <div className="h-10" />

      <Input label="Total HT" accessor="totalHT" register={register} data={acompte} disabled />
      <Input label="Total TTC" accessor="totalTTC" register={register} data={acompte} disabled />
      <Input label="Total TVA" accessor="totalTVA" register={register} data={acompte} disabled />

      <input type="submit" value="submit" className="block w-32 mx-auto mt-4 py-2 bg-slate-400" />
    </form>
  );
}
