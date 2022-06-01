import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { priceFormat } from "../utils/cellFormaters";
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
}

export default function DevisForm({
  devis, titre, mode, onSubmit,
} : DevisProps) {
  const {
    register, handleSubmit, reset, setValue, control, formState: { errors },
  } = useForm({
    defaultValues: devis,
    mode: "all",
    resolver: yupResolver(DevisSchema),
  });

  const clients = useAppSelector((state) => state.clients);

  useEffect(() => {
    reset(devis);
  }, [devis]);

  const onError = (err: any) => {
    console.log(err);
  };

  const onSelect = (item: IClient) => {
    console.log(item);
    // @ts-ignore
    setValue("codeClient", item.code);
    // @ts-ignore
    setValue("nom", item.nom);
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

  const formatResult = (item: any) => (
    <>
      <span style={{ display: "block", textAlign: "left" }}>
        code:
        {item.code}
      </span>
      <span style={{ display: "block", textAlign: "left" }}>
        nom:
        {item.nom}
      </span>
    </>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="max-w-md mx-auto lg:max-w-2xl bg-slate-100 px-8 py-4"
    >
      <h1 className="text-center text-xl">{titre}</h1>

      <div className="mt-8 pt-2 border-t-2 grid grid-cols-1 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Données client</h2>
          <p className="text-sm text-slate-600 mt-2 italic">Personne physique ou entreprise</p>
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
          <Input label="Nom client" accessor="nom" register={register} data={devis} errors={errors} disabled />
          <Input label="Interlocuteur" register={register} data={devis} errors={errors} />
        </div>
      </div>

      <div className="mt-8 pt-2 border-t-2 grid grid-cols-1 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Travaux</h2>
          <p className="text-sm text-slate-600 mt-2 italic">bla bla</p>
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

      <div className="mt-8 pt-2 border-t-2 grid grid-cols-1 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Aspect financier</h2>
          <p className="text-sm text-slate-600 mt-2 italic">Totaux, remises et acomptes</p>
        </div>
        <div className="col-span-2  lg:ml-4">

          {/* <Input label="Acompte" register={register} data={devis} disabled /> */}
          {/* <Input label="Etat" register={register} data={devis} disabled /> */}
          {/* <Input label="flagAcompte" accessor="flagAcompte" register={register} data={devis} disabled /> */}
          {/* <Input label="flagEscompte" accessor="flagEscompte" register={register} data={devis} disabled /> */}

          <div className="">
            <div className="grid grid-cols-2">
              <div className="font-bold">Total HT</div>
              <div className="text-right">{`${priceFormat({ value: devis?.totalHT })} €`}</div>
            </div>

            <div className="grid grid-cols-2">
              <div className="font-bold">Total HT Net</div>
              <div className="text-right">{`${priceFormat({ value: devis?.totalHTNet })} €`}</div>
            </div>

            <div className="grid grid-cols-2">
              <div className="font-bold">Total TVA</div>
              <div className="text-right">{`${priceFormat({ value: devis?.totalTVA })} €`}</div>
            </div>

            <div className="grid grid-cols-2">
              <div className="font-bold">Total TTC</div>
              <div className="text-right">{`${priceFormat({ value: devis?.totalTTC })} €`}</div>
            </div>

            <div className="grid grid-cols-2 mt-4 bg-red-100">
              <div className="font-bold">Net à payer</div>
              <div className="text-right">{`${priceFormat({ value: devis?.netAPayer })} €`}</div>
            </div>
          </div>

        </div>
      </div>

      <p>ajouter acompte</p>
      <p>ajouter remise</p>
      <p>transformer en facture</p>

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
