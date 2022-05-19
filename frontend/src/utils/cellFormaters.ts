export function priceFormat({ value }: {value:number}) {
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function dateFormat({ value }: {value:string | number | Date}) {
  return new Date(value).toLocaleDateString();
}
