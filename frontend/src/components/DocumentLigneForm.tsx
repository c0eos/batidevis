import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { priceFormat } from "../utils/formatters";
import {
  DevisLigneSchema, IDevis, IDevisLigne, IFacture, IFactureLigne,
} from "../utils/schemas";
import TableLignes from "./TableLignes";
import { TextareaCell } from "./TableCells";

interface Props {
    lignes: IDevisLigne[] | IFactureLigne[];
    document: IDevis | IFacture | undefined;
    onSubmit: (lignesdata: any[]) => void;
}

export default function DocumentLigneForm({ lignes, document, onSubmit }: Props) {
  const params = useParams();
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
    onSubmit(data.lignes);
  };

  const onAppend = () => {
    const newLigne = {
      codeDocument: document?.code,
      libelle: "",
      unite: "U",
      qte: 0,
      pvEuro: 0,
      tva: 0,
      numBuf: 0,
      numLigne: 0,
    };
    append(newLigne);
  };

  const onRemove = (index: number) => {
    remove(index);
  };

  const columns = useMemo(() => [
    {
      Header: "Libellé",
      accessor: "libelle",
      width: 600,
      Cell: TextareaCell,
    },
    {
      Header: "Unité",
      accessor: "unite",
      width: 125,
    },
    {
      Header: "Quantité",
      accessor: "qte",
      width: 125,
      inputProps: {
        type: "number",
        min: "0",
        step: "0.01",
      },
    },
    {
      Header: "Prix unitaire",
      accessor: "pvEuro",
      width: 125,
      inputProps: {
        type: "number",
        min: "0",
        step: "0.01",
      },
    },
    {
      Header: "TVA",
      accessor: "tva",
      width: 125,
      inputProps: {
        type: "number",
        min: "0",
        max: "100",
        step: "0.01",
      },
    },
    {
      Header: "Total HT",
      width: 125,
      Cell: (props: any) => {
        const ligne = props.row.original;
        return (
          <p className="px-2 py-1">
            {priceFormat(ligne.pvEuro * ligne.qte)}
          </p>
        );
      },
    },
    {
      Header: " ",
      width: 50,
      Cell: (props: any) => (
        <button
          type="button"
          onClick={() => onRemove(props.row.id)}
          className="w-full"
        >
          <i className="hover:text-red-600 fa-solid fa-ban" />
        </button>
      ),
    },
  ], []);

  return (
    <div className="mx-4 lg:mx-0 my-4">

      <form
        onSubmit={handleSubmit(localOnSubmit, onError)}
        className="max-w-full px-4 lg:px-8 py-4 mx-auto w-fit bg-white shadow rounded"
      >
        <h1 className="text-xl font-bold text-center">{`Édition du document ${document?.code}`}</h1>

        <div className="flex justify-around max-w-xs mx-auto mt-4 text-2xl py-2">
          <button
            type="submit"
            title="Sauvegarder"
          >
            <i className="fa-solid fa-floppy-disk" />
          </button>

          <button
            type="button"
            title="Insérer une ligne"
            className=""
            onClick={onAppend}
          >
            <i className="fa-solid fa-plus" />
          </button>
        </div>

        <TableLignes
          data={controlledFields}
          columns={columns}
          register={register}
          errors={errors}
          onRemove={onRemove}
        />

      </form>
    </div>
  );
}
