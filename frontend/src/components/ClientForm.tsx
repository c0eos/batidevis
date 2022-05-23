import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClientSchema, IClient } from "../utils/schemas";
import Input from "./Input";
import Textarea from "./Textarea";

interface ClientProps {
  client?: IClient;
  titre: string;
  mode: "add" | "edit";
  onSubmit: (clientdata: IClient) => void;
}

export default function ClientForm({
  client, titre, mode, onSubmit,
}: ClientProps) {
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    defaultValues: client,
    mode: "all",
    resolver: yupResolver(ClientSchema),
  });

  useEffect(() => {
    reset(client);
  }, [client]);

  const onError = (err: any) => {
    console.log(err);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="max-w-md mx-auto lg:max-w-2xl bg-slate-100 px-8 py-4"
    >
      <h1 className="text-center text-xl">{titre}</h1>
      <div className="mt-8 pt-2 border-t-2 grid grid-cols-1 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Personne</h2>
          <p className="text-sm text-slate-600 mt-2 italic">Personne physique ou entreprise</p>
        </div>
        <div className="col-span-2 lg:ml-4">
          <Input label="Civilité" accessor="civilite" register={register} data={client} errors={errors} placeholder="facultatif" />
          <Input label="Nom" register={register} data={client} errors={errors} />
          {mode === "edit" && (
            <Input label="Code" register={register} data={client} errors={errors} />
          )}
          <Input label="Interlocuteur" register={register} data={client} errors={errors} placeholder="facultatif" />
          <Textarea label="Info" register={register} data={client} errors={errors} placeholder="facultatif" />
        </div>
      </div>

      <div className="mt-8 pt-2 border-t-2 grid grid-cols-1 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Contact</h2>
          <p className="text-sm text-slate-600 mt-2 italic">Moyen de contact et adresse</p>
        </div>
        <div className="col-span-2  lg:ml-4">
          <Input label="Email" register={register} data={client} errors={errors} type="email" autoComplete="hidden" placeholder="au moins 1" />
          <Input label="Téléphone fixe" accessor="telephone" register={register} data={client} errors={errors} type="tel" autoComplete="hidden" placeholder="au moins 1" />
          <Input label="Portable" register={register} data={client} errors={errors} type="tel" autoComplete="hidden" placeholder="au moins 1" />

          <Input label="Adresse" register={register} data={client} errors={errors} />
          <Input label="Adresse (suite)" accessor="adresseSuite" register={register} data={client} errors={errors} placeholder="facultatif" />
          <Input label="Code postal" accessor="codePostal" register={register} data={client} errors={errors} />
          <Input label="Ville" register={register} data={client} errors={errors} />
        </div>
      </div>

      {errors?.[""] && (
      <p
        className="text-red-600 text-center mt-4"
      >
        {
        // @ts-ignore
        errors?.[""]?.message
        }
      </p>
      )}

      <input type="submit" value="Sauvegarder" className="block w-full lg:w-1/2 mx-auto mt-8 py-2 bg-slate-600 text-white hover:cursor-pointer" />
    </form>
  );
}
