import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";

export default function FactureForm({ facture } : {facture:any}) {
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    defaultValues: facture,
  });

  useEffect(() => {
    reset(facture);
  }, [facture]);

  const onSubmit = (data:any) => {
    console.log(data);
    console.log(errors);
    console.log(facture);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto"
    >
      <Input label="Code client" accessor="codeClient" register={register} data={facture} />
      <Input label="Interlocuteur" register={register} data={facture} />
      <Input label="Info" register={register} data={facture} />
      <Input label="Sujet" register={register} data={facture} />

      <div className="h-10" />

      <Input label="Acompte" register={register} data={facture} disabled />
      <Input label="Etat" register={register} data={facture} disabled />
      <Input label="flagAcompte" accessor="flagAcompte" register={register} data={facture} disabled />
      <Input label="flagEscompte" accessor="flagEscompte" register={register} data={facture} disabled />
      <Input label="netAPayer" accessor="netAPayer" register={register} data={facture} disabled />
      <Input label="HTNetFin" accessor="HTNetFin" register={register} data={facture} disabled />
      <Input label="TVAReelle" accessor="TVAReelle" register={register} data={facture} disabled />
      <Input label="totalDeb" accessor="totalDeb" register={register} data={facture} disabled />
      <Input label="totalHT" accessor="totalHT" register={register} data={facture} disabled />
      <Input label="totalHTNet" accessor="totalHTNet" register={register} data={facture} disabled />
      <Input label="totalPR" accessor="totalPR" register={register} data={facture} disabled />
      <Input label="totalPV" accessor="totalPV" register={register} data={facture} disabled />
      <Input label="totalTTC" accessor="totalTTC" register={register} data={facture} disabled />
      <Input label="totalTVA" accessor="totalTVA" register={register} data={facture} disabled />
      <Input label="transFacture" accessor="transFacture" register={register} data={facture} disabled />
      <Input label="dateRG" accessor="dateRG" register={register} data={facture} disabled />
      <Input label="temps" accessor="temps" register={register} data={facture} disabled />
      <Input label="numOrdre" accessor="numOrdre" register={register} data={facture} disabled />

      <div className="h-10" />

      <Input label="Adresse" accessor="adresseTravaux" register={register} data={facture} required />
      <Input label="Adresse (suite)" accessor="adresseTravaux2" register={register} data={facture} />
      <Input label="Code postal" accessor="cpTravaux" register={register} data={facture} required />
      <Input label="Ville" accessor="villeTravaux" register={register} data={facture} required />

      <div className="h-10" />
      <Input label="Id" register={register} data={facture} disabled />
      <Input label="Code" register={register} data={facture} disabled />
      <Input label="Code devis" accessor="codeDevis" register={register} data={facture} disabled />
      <Input label="Mis à jour" accessor="date" register={register} data={facture} disabled />
      <Input label="Création" accessor="dateCreation" register={register} data={facture} disabled />

      <input type="submit" value="submit" className="block w-32 mx-auto mt-4 py-2 bg-slate-400" />
    </form>
  );
}
