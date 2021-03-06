/* eslint-disable no-template-curly-in-string */
import * as yup from "yup";

// messages
yup.setLocale({
  mixed: {
    default: "Donnée invalide",
    required: "Donnée requise",
    notType: "Donnée invalide",
  },
  string: {
    email: "Adresse email invalide",
    min: "Doit contenir au moins ${min} caractères",
  },
});

// schema communs

const string = yup.string().trim();
const optionalString = string.optional().nullable();
const phone = yup.string().transform((value) => {
  if (!value) {
    return "";
  }
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }
  return value;
});

const BaseSchema = yup.object().shape({
  id: yup.number().integer().positive(),
  code: optionalString,
  dateCreation: yup.date(),
});

const AdresseSchema = yup.object().shape({
  adresse: string.required(),
  adresseSuite: optionalString,
  codePostal: string.required().transform((value) => value.replace(/\D/g, "")).matches(/^[0-9]{5}$/, "Code postal invalide"),
  ville: string.uppercase().required().min(2).matches(/^[a-zA-Z0-9- ]+$/, "Ville invalide"),
});

const DocumentSchema = BaseSchema
  .concat(AdresseSchema)
  .shape({
    codeClient: string.required(),
    sujet: string.required(),
    interlocuteur: string.required(),
    info: optionalString,
    totalDeb: yup.number(),
    totalPR: yup.number(),
    totalPV: yup.number(),
    totalHT: yup.number(),
    totalHTNet: yup.number(),
    HTNetFin: yup.number(),
    totalTVA: yup.number(),
    TVAReelle: yup.number(),
    totalTTC: yup.number(),
    acompte: yup.number(),
    netAPayer: yup.number(),
    flagEscompte: yup.boolean(),
    flagAcompte: yup.boolean(),
  });

const LigneSchema = yup.object().shape({
  codeDocument: string.required(),
  id: yup.number().integer().positive(),
  numLigne: yup.number().integer().required(),
  numBuf: yup.number().integer().required(),
  idSousTotal: yup.number().integer().nullable(),
  nivTr: yup.number().integer(),
  nivOuv: yup.number().integer(),
  type: optionalString,
  numerotation: yup.number().integer().nullable(),
  codeElement: optionalString,
  libelle: string.required(),
  deb: yup.number(),
  fgF: yup.number(),
  fgMo: yup.number(),
  fgMat: yup.number(),
  fg: yup.number(),
  pr: yup.number(),
  ben: yup.number(),
  coef: yup.number(),
  pv: yup.number(),
  pvEuro: yup.number().required(),
  pvNet: yup.number(),
  pvNetEuro: yup.number(),
  qte: yup.number().required(),
  tva: yup.number(),
  compte: optionalString,
  unite: optionalString,
  temps: yup.number(),
  nonEdit: yup.number(),
  variante: yup.number(),
});

// schema utilisés

const UserSchema = yup.object().shape({
  id: yup.number().integer().positive(),
  email: string.email().required(),
  password: string.required(),
});

const ClientSchema = BaseSchema
  .concat(AdresseSchema)
  .shape({
    nom: string.required().min(2),
    civilite: optionalString,
    interlocuteur: optionalString,
    telephone: phone.matches(/^0[1-589]( \d\d){4}$/, { excludeEmptyString: true, message: "Numéro téléphone fixe invalide" }),
    portable: phone.matches(/^0[67]( \d\d){4}$/, { excludeEmptyString: true, message: "Numéro portable invalide" }),
    email: optionalString.email(),
    info: optionalString,
  });

const DevisSchema = DocumentSchema.shape({
  transFacture: yup.boolean(),
});

const FactureSchema = DocumentSchema.shape({
  codeDevis: string.required(),
});

const AcompteSchema = BaseSchema.shape({
  codeDevis: optionalString,
  codeFacture: optionalString,
  codeClient: string.required(),
  sujet: string.required(),
  totalHT: yup.number(),
  totalTVA: yup.number(),
  totalTTC: yup.number(),
});

const DevisLigneSchema = LigneSchema.shape({
});

const FactureLigneSchema = LigneSchema.shape({
  avt: yup.number(),
  qteOrigine: yup.number(),
  pvOrigine: yup.number(),
});

// interfaces a partir des schemas yup

interface IUser extends yup.InferType<typeof UserSchema> {}
interface IClient extends yup.InferType<typeof ClientSchema> {}
interface IDevis extends yup.InferType<typeof DevisSchema> {}
interface IDevisLigne extends yup.InferType<typeof DevisLigneSchema> {}
interface IFacture extends yup.InferType<typeof FactureSchema> {}
interface IFactureLigne extends yup.InferType<typeof FactureLigneSchema> {}
interface IAcompte extends yup.InferType<typeof AcompteSchema> {}

export {
  UserSchema,
  ClientSchema,
  DevisSchema,
  DevisLigneSchema,
  FactureSchema,
  FactureLigneSchema,
  AcompteSchema,
};

export type {
  IUser,
  IClient,
  IDevis,
  IDevisLigne,
  IFacture,
  IFactureLigne,
  IAcompte,
};
