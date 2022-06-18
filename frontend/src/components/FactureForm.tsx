import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { priceFormat } from "../utils/formatters";
import { FactureSchema, IFacture } from "../utils/schemas";
import Input from "./Input";
import Textarea from "./Textarea";

interface Props {
  facture?: IFacture,
  titre: string,
  onSubmit: (facturedata: IFacture) => void,
}

export default function FactureForm({
  facture, titre, onSubmit,
} : Props) {
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    defaultValues: facture,
    mode: "all",
    resolver: yupResolver(FactureSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    reset(facture);
  }, [facture]);

  const onError = (err: any) => {
    console.log(err);
  };

  const onEdit = () => {
    navigate("lignes");
  };

  return (
    <div className="mx-4 lg:mx-0 my-4">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="max-w-md px-8 py-4 mx-auto lg:max-w-2xl bg-white shadow rounded"
      >
        <h1 className="text-xl font-bold text-center">{titre}</h1>

        <div className="flex justify-around pt-2 mt-2 text-2xl border-t-2 border-stone-300">
          <button type="submit" className="" title="Sauvegarder">
            <i className="fa-solid fa-floppy-disk" />
          </button>

          <button type="button" title="Éditer le contenu" onClick={onEdit}>
            <i className="fa-solid fa-pen-to-square" />
          </button>
        </div>

        <div className="grid grid-cols-1 pt-2 mt-2 border-t-2 border-stone-300 lg:grid-cols-3">
          <div className="mb-6">
            <h2 className="text-stone-800">Données client</h2>
            <p className="mt-2 text-sm italic text-stone-400">Personne physique ou entreprise</p>
          </div>
          <div className="col-span-2 lg:ml-4">
            <Input label="Code facture" accessor="code" register={register} data={facture} errors={errors} disabled />
            <Input label="Code devis associé" accessor="codeDevis" register={register} data={facture} errors={errors} disabled />
            <Input id="code-client" label="Code client" accessor="codeClient" register={register} data={facture} errors={errors} disabled />
            <Input label="Interlocuteur" register={register} data={facture} errors={errors} />
          </div>
        </div>

        <div className="grid grid-cols-1 pt-2 mt-8 border-t-2 border-stone-300 lg:grid-cols-3">
          <div className="mb-6">
            <h2 className="text-stone-800">Travaux</h2>
            <p className="mt-2 text-sm italic text-stone-400">Adresse et informations complémentaires</p>
          </div>
          <div className="col-span-2 lg:ml-4">
            <Textarea label="Sujet" register={register} data={facture} errors={errors} />
            <Input label="Adresse" accessor="adresse" register={register} data={facture} errors={errors} />
            <Input label="Adresse (suite)" accessor="adresseSuite" register={register} data={facture} errors={errors} />
            <Input label="Code postal" accessor="codePostal" register={register} data={facture} errors={errors} />
            <Input label="Ville" register={register} data={facture} errors={errors} />
            <Textarea label="Info" register={register} data={facture} errors={errors} />
          </div>
        </div>

        <div className="grid grid-cols-1 pt-2 mt-8 border-t-2 border-stone-300 lg:grid-cols-3">
          <div className="mb-6">
            <h2 className="text-stone-800">Aspect financier</h2>
            <p className="mt-2 text-sm italic text-stone-400">Totaux et TVA</p>
          </div>
          <div className="col-span-2 lg:ml-4">
            <div className="">
              <div className="grid grid-cols-2">
                <div className="font-bold">Total HT</div>
                <div className="text-right">{`${priceFormat(facture?.totalHT)} €`}</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="font-bold">Total TVA</div>
                <div className="text-right">{`${priceFormat(facture?.totalTVA)} €`}</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="font-bold">Total TTC</div>
                <div className="text-right">{`${priceFormat(facture?.totalTTC)} €`}</div>
              </div>
            </div>

          </div>
        </div>

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

      </form>
    </div>
  );
}
