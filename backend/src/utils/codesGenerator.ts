export function generateClientCode(nom: string, codesExistants: {code: string}[]): string {
  let i = 1;
  // code = nom de famille en majuscule (+ indice en 2 chiffres si doublon)
  let code = `${nom.toUpperCase().split(" ")[0]}`;

  while (codesExistants.find((c) => c.code === code)) {
    i++;
    code = `${nom.toUpperCase().split(" ")[0]}${i.toString().padStart(2, "0")}`;
  }

  return code;
}

export function generateDocumentCode(type: "D" | "F" | "A", codesExistants: {code: string}[]): string {
  const year = new Date().getFullYear().toString();
  let i = 1;
  // code = type + année en 4 chiffres + indice en 3 chiffres
  // type = D pour devis, F pour facture, A pour acompte
  let code = `${type}${year}-${i.toString().padStart(3, "0")}`;

  while (codesExistants.find((c) => c.code === code)) {
    i++;
    code = `${type}${year}-${i.toString().padStart(3, "0")}`;
  }

  return code;
}
