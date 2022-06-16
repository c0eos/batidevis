import axios from "axios";
import { IFacture, IFactureLigne } from "../utils/schemas";

const API_URL = process.env.REACT_APP_API_URL || "";

export function getAllFactures(token: string | null): Promise<IFacture[]> {
  return axios.get(
    `${API_URL}/factures`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getOneFactureById(id: string | undefined, token: string | null): Promise<IFacture> {
  return axios.get(
    `${API_URL}/factures/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function updateOneFactureById(
  id: string | undefined,
  facturedata: IFacture,
  token: string | null,
): Promise<IFacture> {
  return axios.put(
    `${API_URL}/factures/${id}`,
    facturedata,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getAllFactureLignesById(
  id: number | undefined,
  token: string | null,
): Promise<IFactureLigne[]> {
  return axios.get(
    `${API_URL}/factures/${id}/lignes`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function updateAllFactureLignesById(
  id: string | undefined,
  facturelignesdata: IFactureLigne[],
  token: string | null,
): Promise<IFactureLigne[]> {
  return axios.put(
    `${API_URL}/factures/${id}/lignes`,
    facturelignesdata,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}
