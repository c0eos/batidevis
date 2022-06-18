import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClientSchema, IClient } from "../utils/schemas";
import Input from "./Input";
import Textarea from "./Textarea";

interface Props {
  client?: IClient;
  titre: string;
  mode: "add" | "edit";
  onSubmit: (clientdata: IClient) => void;
  onDelete?: () => void;
}

export default function ClientForm({
  client, titre, mode, onSubmit, onDelete,
}: Props) {
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
    <div className="mx-4 lg:mx-0 my-4">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="max-w-md px-4 lg:px-8 py-4 mx-auto lg:max-w-2xl bg-white shadow rounded"
      >
        <h1 className="text-xl font-bold text-center">{titre}</h1>

        {errors?.[""] && (
        <p
          className="mt-4 text-center text-red-600"
        >
          {
        // @ts-ignore
        errors?.[""]?.message
        }
        </p>
        )}

        <div className="flex justify-around pt-2 mt-2 text-2xl border-t-2 border-stone-300">

          <button type="submit" title="Sauvegarder">
            <i className="fa-solid fa-floppy-disk" />
          </button>

          {mode === "edit" && (
          <button type="button" title="Supprimer" onClick={onDelete}>
            <i className="hover:text-red-600 fa-solid fa-trash-can" />
          </button>
          )}
        </div>

        <div className="grid grid-cols-1 pt-2 mt-2 border-t-2 lg:grid-cols-3 border-stone-300">
          <div className="mb-6">
            <h2 className="text-stone-800">Personne</h2>
            <p className="mt-2 text-sm italic text-stone-400">Personne physique ou entreprise</p>
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

        <div className="grid grid-cols-1 pt-2 mt-8 border-t-2 border-stone-300 lg:grid-cols-3">
          <div className="mb-6">
            <h2 className="text-stone-800">Contact</h2>
            <p className="mt-2 text-sm italic text-stone-400">Moyen de contact et adresse</p>
          </div>
          <div className="col-span-2 lg:ml-4">
            <Input label="Email" register={register} data={client} errors={errors} type="email" autoComplete="hidden" placeholder="au moins 1" />
            <Input label="Téléphone fixe" accessor="telephone" register={register} data={client} errors={errors} type="tel" autoComplete="hidden" placeholder="au moins 1" />
            <Input label="Portable" register={register} data={client} errors={errors} type="tel" autoComplete="hidden" placeholder="au moins 1" />

            <Input label="Adresse" register={register} data={client} errors={errors} />
            <Input label="Adresse (suite)" accessor="adresseSuite" register={register} data={client} errors={errors} placeholder="facultatif" />
            <Input label="Code postal" accessor="codePostal" register={register} data={client} errors={errors} />
            <Input label="Ville" register={register} data={client} errors={errors} />
          </div>
        </div>
      </form>
    </div>

  );
}
