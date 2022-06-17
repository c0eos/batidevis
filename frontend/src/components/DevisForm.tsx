import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { priceFormat } from "../utils/formatters";
import { useAppSelector } from "../utils/reduxHooks";
import { DevisSchema, IClient, IDevis } from "../utils/schemas";
import Input from "./Input";
import Textarea from "./Textarea";
import Search from "./Search";

interface DevisProps {
  devis?: IDevis,
  titre: string,
  mode: "add" | "edit",
  onSubmit: (devisdata: IDevis) => void,
  onTransfertFacture?: () => void,
  onDelete?: () => void,
}

export default function DevisForm({
  devis, titre, mode, onSubmit, onTransfertFacture, onDelete,
} : DevisProps) {
  const {
    register, handleSubmit, reset, setValue, control, formState: { errors },
  } = useForm({
    defaultValues: devis,
    mode: "all",
    resolver: yupResolver(DevisSchema),
  });

  const clients = useAppSelector((state) => state.clients);
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    reset(devis);
  }, [devis]);

  const onError = (err: any) => {
    console.log(err);
  };

  const onSelect = (item: IClient) => {
    // @ts-ignore
    setValue("codeClient", item.code);
    // @ts-ignore
    setValue("interlocuteur", item.interlocuteur || item.nom);
    // @ts-ignore
    setValue("adresse", item.adresse);
    // @ts-ignore
    setValue("adresseSuite", item.adresseSuite);
    // @ts-ignore
    setValue("codePostal", item.codePostal);
    // @ts-ignore
    setValue("ville", item.ville);
  };

  const onEdit = () => {
    navigate("lignes");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="max-w-md px-8 py-4 mx-auto lg:max-w-2xl bg-slate-100"
    >
      <h1 className="text-xl text-center">{titre}</h1>

      <div className="flex justify-around pt-2 mt-2 text-2xl border-t-2">
        {!devis?.transFacture === true && (
        <button type="submit" className="" title="Sauvegarder">
          <i className="fa-solid fa-floppy-disk" />
        </button>
        )}

        {mode === "edit" && !devis?.transFacture === true && (
        <button type="button" title="Éditer le contenu" onClick={onEdit}>
          <i className="fa-solid fa-pen-to-square" />
        </button>
        )}

        {mode === "edit" && (
        <button
          type="button"
          title={devis?.transFacture ? "Accéder à la facture" : "Tranférer en facture"}
          onClick={onTransfertFacture}
        >
          <i className="fa-solid fa-share" />
        </button>
        )}

        {mode === "edit" && !devis?.transFacture === true && (
          <button type="button" title="Supprimer" onClick={onDelete}>
            <i className="hover:text-red-600 fa-solid fa-trash-can" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 pt-2 mt-2 border-t-2 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Données client</h2>
          <p className="mt-2 text-sm italic text-slate-600">Personne physique ou entreprise</p>
        </div>
        <div className="col-span-2 lg:ml-4">

          <Search
            options={clients.items}
            onSelect={onSelect}
          />

          {mode === "edit" && (
          <Input label="Code devis" accessor="code" register={register} data={devis} errors={errors} disabled />
          )}
          <Input id="code-client" label="Code client" accessor="codeClient" register={register} data={devis} errors={errors} disabled />
          <Input label="Interlocuteur" register={register} data={devis} errors={errors} />
        </div>
      </div>

      <div className="grid grid-cols-1 pt-2 mt-8 border-t-2 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Travaux</h2>
          <p className="mt-2 text-sm italic text-slate-600">Adresse et informations complémentaires</p>
        </div>
        <div className="col-span-2 lg:ml-4">
          <Textarea label="Sujet" register={register} data={devis} errors={errors} />
          <Input label="Adresse" accessor="adresse" register={register} data={devis} errors={errors} />
          <Input label="Adresse (suite)" accessor="adresseSuite" register={register} data={devis} errors={errors} />
          <Input label="Code postal" accessor="codePostal" register={register} data={devis} errors={errors} />
          <Input label="Ville" register={register} data={devis} errors={errors} />
          <Textarea label="Info" register={register} data={devis} errors={errors} />
        </div>
      </div>

      <div className="grid grid-cols-1 pt-2 mt-8 border-t-2 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Aspect financier</h2>
          {/* <p className="mt-2 text-sm italic text-slate-600">Totaux, remises et acomptes</p> */}
          <p className="mt-2 text-sm italic text-slate-600">Totaux et TVA</p>
        </div>
        <div className="col-span-2 lg:ml-4">

          {/* <Input label="Acompte" register={register} data={devis} disabled /> */}
          {/* <Input label="Etat" register={register} data={devis} disabled /> */}
          {/* <Input label="flagAcompte" accessor="flagAcompte" register={register} data={devis} disabled /> */}
          {/* <Input label="flagEscompte" accessor="flagEscompte" register={register} data={devis} disabled /> */}

          <div className="">
            <div className="grid grid-cols-2">
              <div className="font-bold">Total HT</div>
              <div className="text-right">{`${priceFormat(devis?.totalHT)} €`}</div>
            </div>

            {/* <div className="grid grid-cols-2">
              <div className="font-bold">Total HT Net</div>
              <div className="text-right">{`${priceFormat({ value: devis?.totalHTNet })} €`}</div>
            </div> */}

            <div className="grid grid-cols-2">
              <div className="font-bold">Total TVA</div>
              <div className="text-right">{`${priceFormat(devis?.totalTVA)} €`}</div>
            </div>

            <div className="grid grid-cols-2">
              <div className="font-bold">Total TTC</div>
              <div className="text-right">{`${priceFormat(devis?.totalTTC)} €`}</div>
            </div>

            {/* <div className="grid grid-cols-2 mt-4 bg-red-100">
              <div className="font-bold">Net à payer</div>
              <div className="text-right">{`${priceFormat( devis?.netAPayer )} €`}</div>
            </div> */}
          </div>

        </div>
      </div>

      {/* <p>//TODO ajouter acompte</p> */}
      {/* <p>//TODO ajouter remise</p> */}
      {/* <p>//TODO transformer en facture</p> */}

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
  );
}
