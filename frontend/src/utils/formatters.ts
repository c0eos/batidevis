export function priceFormat(value: number | undefined): string {
  if (value === undefined) {
    return "0.00";
  }
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function dateFormat(value : string | number | Date): string {
  return new Date(value).toLocaleDateString();
}
