import { IDevisLigne, IFactureLigne } from "../utils/schemas";
import { priceFormat } from "../utils/formatters";

interface Props {
    register: any;
    index: number;
    field: any
    errors: any;
}

export default function DocumentLigne({
  register, index, field, errors,
}: Props) {
  const alertIfError = (errors: any, index: number, accessor: string) => {
    if (errors?.lignes?.[index]?.[accessor]?.message) {
      console.log(errors.lignes[index][accessor].message);
      return "bg-red-100";
    }
    return "";
  };

  return (
    <tr className="">
      <th scope="row" className="">
        <input
          {...register(`lignes.${index}.libelle`)}
          className={`${alertIfError(errors, index, "libelle")}`}
        />
      </th>
      <td>
        <input
          {...register(`lignes.${index}.unite`)}
          className={alertIfError(errors, index, "unite")}
        />
      </td>
      <td>
        <input
          {...register(`lignes.${index}.qte`)}
          type="number"
          min={0}
          step={0.01}
          className={alertIfError(errors, index, "qte")}
        />
      </td>
      <td>
        <input
          {...register(`lignes.${index}.pvEuro`)}
          type="number"
          inputMode="numeric"
          min={0}
          step={0.01}
          className={alertIfError(errors, index, "pvEuro")}
        />
      </td>
      <td>
        <input
          {...register(`lignes.${index}.tva`)}
          className={alertIfError(errors, index, "tva")}
        />
      </td>
      <td width={40}>
        <input
          value={priceFormat(field.pvEuro * field.qte)}
          disabled
        />
      </td>
    </tr>
  );
}
