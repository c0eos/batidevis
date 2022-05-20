import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";

export default function ClientForm({ client } : {client:any}) {
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    defaultValues: client,
  });

  useEffect(() => {
    reset(client);
  }, [client]);

  const onSubmit = (data:any) => {
    console.log(data);
    console.log(errors);
    console.log(client);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto"
    >
      <Input label="Civilité" accessor="civilite" register={register} data={client} />
      <Input label="Nom" register={register} data={client} required />
      <Input label="Interlocuteur" register={register} data={client} />
      <Input label="Info" register={register} data={client} />

      <div className="h-10" />

      <Input label="Email" register={register} data={client} />
      <Input label="Téléphone" accessor="telephone" register={register} data={client} />
      <Input label="Portable" register={register} data={client} />
      <Input label="Fax" register={register} data={client} />

      <div className="h-10" />

      <Input label="Adresse" register={register} data={client} required />
      <Input label="Adresse (suite)" accessor="adresse2" register={register} data={client} />
      <Input label="Code postal" accessor="codePostal" register={register} data={client} required />
      <Input label="Ville" register={register} data={client} required />
      <Input label="Pays" register={register} data={client} />

      <div className="h-10" />
      <Input label="Id" register={register} data={client} disabled />
      <Input label="CA" register={register} data={client} disabled />
      <Input label="Code" register={register} data={client} disabled />
      <Input label="Compte" register={register} data={client} disabled />
      <Input label="Solde" register={register} data={client} disabled />
      <Input label="Mis à jour" accessor="updated" register={register} data={client} disabled />

      <input type="submit" value="submit" className="block w-32 mx-auto mt-4 py-2 bg-slate-400" />
    </form>
  );
}
