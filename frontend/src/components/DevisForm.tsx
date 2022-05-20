import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";

export default function DevisForm({ devis } : {devis:any}) {
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    defaultValues: devis,
  });

  useEffect(() => {
    reset(devis);
  }, [devis]);

  const onSubmit = (data:any) => {
    console.log(data);
    console.log(errors);
    console.log(devis);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto"
    >
      <Input label="Code client" accessor="codeClient" register={register} data={devis} />
      <Input label="Interlocuteur" register={register} data={devis} />
      <Input label="Info" register={register} data={devis} />

      <div className="h-10" />

      <Input label="Acompte" register={register} data={devis} disabled />
      <Input label="Etat" register={register} data={devis} disabled />
      <Input label="flagAcompte" accessor="flagAcompte" register={register} data={devis} disabled />
      <Input label="flagEscompte" accessor="flagEscompte" register={register} data={devis} disabled />
      <Input label="netAPayer" accessor="netAPayer" register={register} data={devis} disabled />
      <Input label="HTNetFin" accessor="HTNetFin" register={register} data={devis} disabled />
      <Input label="TVAReelle" accessor="TVAReelle" register={register} data={devis} disabled />
      <Input label="totalDeb" accessor="totalDeb" register={register} data={devis} disabled />
      <Input label="totalHT" accessor="totalHT" register={register} data={devis} disabled />
      <Input label="totalHTNet" accessor="totalHTNet" register={register} data={devis} disabled />
      <Input label="totalPR" accessor="totalPR" register={register} data={devis} disabled />
      <Input label="totalPV" accessor="totalPV" register={register} data={devis} disabled />
      <Input label="totalTTC" accessor="totalTTC" register={register} data={devis} disabled />
      <Input label="totalTVA" accessor="totalTVA" register={register} data={devis} disabled />
      <Input label="transFacture" accessor="transFacture" register={register} data={devis} disabled />

      <div className="h-10" />

      <Input label="Adresse" accessor="adresseTravaux" register={register} data={devis} required />
      <Input label="Adresse (suite)" accessor="adresseTravaux2" register={register} data={devis} />
      <Input label="Code postal" accessor="cpTravaux" register={register} data={devis} required />
      <Input label="Ville" accessor="villeTravaux" register={register} data={devis} required />

      <div className="h-10" />
      <Input label="Id" register={register} data={devis} disabled />
      <Input label="Code" register={register} data={devis} disabled />
      <Input label="Mis à jour" accessor="date" register={register} data={devis} disabled />

      <input type="submit" value="submit" className="block w-32 mx-auto mt-4 py-2 bg-slate-400" />
    </form>
  );
}
