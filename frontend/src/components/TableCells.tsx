export function InputCell({
  row: { index },
  column: { id, inputProps },
  register, // This is a custom function that we supplied to our table instance
  errors,
}:any) {
  const alertIfError = (errors: any, index: number, accessor: string) => {
    if (errors?.lignes?.[index]?.[accessor]?.message) {
      console.log(errors.lignes[index][accessor].message);
      return "bg-red-100";
    }
    return "bg-transparent";
  };

  return (
    <input
      {...register(`lignes.${index}.${id}`)}
      {...inputProps}
    //   onChange={(e) => { e.target.value = parseFloat(e.target.value).toFixed(2); }}
      className={`w-full px-2 py-1 ${alertIfError(errors, index, id)}`}
    />
  );
}

export function TextareaCell({
  row: { index },
  column: { id },
  register, // This is a custom function that we supplied to our table instance
  errors,
}:any) {
  const alertIfError = (errors: any, index: number, accessor: string) => {
    if (errors?.lignes?.[index]?.[accessor]?.message) {
      console.log(errors.lignes[index][accessor].message);
      return "bg-red-100";
    }
    return "bg-transparent";
  };

  return (
    <textarea
      {...register(`lignes.${index}.${id}`)}
      rows={3}
      className={`w-full px-2 py-1 ${alertIfError(errors, index, id)}`}
    />
  );
}
