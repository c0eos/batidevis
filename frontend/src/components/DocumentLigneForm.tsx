import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { DevisLigneSchema, IDevisLigne } from "../utils/schemas";
import DocumentLigne from "./DocumentLigne";

interface Props {
    lignes: IDevisLigne[];
    onSubmit: (lignesdata: IDevisLigne[]) => void;
}

export default function DocumentLigneForm({ lignes, onSubmit }: Props) {
  const schema = yup.object().shape({
    lignes: yup.array().of(DevisLigneSchema),
  });
  const {
    handleSubmit, control, formState: { errors }, reset, register, watch,
  } = useForm({
    defaultValues: lignes,
    mode: "all",
    resolver: yupResolver(schema),
  });
  const {
    fields, append, prepend, remove, swap, move, insert, update,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "lignes",
  });

  const onError = (err: any) => {
    console.log(err);
  };

  useEffect(() => {
    // @ts-ignore
    reset({ lignes });
  }, [lignes]);

  // @ts-ignore
  const watchFieldArray = watch("lignes");

  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFieldArray[index],
  }));

  const localOnSubmit = (data: any) => {
    // schema.validate(data.lignes, { abortEarly: true })
    //   .then((validatedData) => {
    //     console.log(validatedData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // console.log(data.lignes[0]);

    // DevisLigneSchema.validate(data.lignes[0], { abortEarly: true })
    //   .then((validatedData) => {
    //     // console.log(validatedData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    onSubmit(data.lignes);
  };

  return (
    <form onSubmit={handleSubmit(localOnSubmit, onError)}>
      <table>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Unite</th>
            <th>Qte</th>
            <th>PvEuro</th>
            <th>PvTTC</th>
            <th>Tva</th>
          </tr>
        </thead>
        <tbody>

          {controlledFields.map((field, index) => (
            <DocumentLigne key={index} register={register} field={field} index={index} errors={errors} />
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() => {
          append({
            libelle: "",
            unite: "",
            qte: 0,
            pvEuro: 0,
            tva: 0,
          });
        }}
        className="block"
      >
        append
      </button>
      <input type="submit" />
    </form>

  );
}
