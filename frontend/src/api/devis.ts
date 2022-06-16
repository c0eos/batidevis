import axios from "axios";
import { IDevis, IDevisLigne } from "../utils/schemas";

const API_URL = process.env.REACT_APP_API_URL || "";

export function getAllDevis(token: string | null): Promise<IDevis[]> {
  return axios.get(
    `${API_URL}/devis`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getOneDevisById(id: string | undefined, token: string | null): Promise<IDevis> {
  return axios.get(
    `${API_URL}/devis/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function updateOneDevisById(
  id: string | undefined,
  devisdata: IDevis,
  token: string | null,
): Promise<IDevis> {
  return axios.put(
    `${API_URL}/devis/${id}`,
    devisdata,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function createOneDevis(devisdata: IDevis, token: string | null): Promise<IDevis> {
  return axios.post(
    `${API_URL}/devis`,
    devisdata,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function deleteOneDevisById(id: string | undefined, token: string | null): Promise<IDevis> {
  return axios.delete(
    `${API_URL}/devis/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getAllDevisLignesById(
  id: number | undefined,
  token: string | null,
): Promise<IDevisLigne[]> {
  return axios.get(
    `${API_URL}/devis/${id}/lignes`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function updateAllDevisLignesById(
  id: string | undefined,
  devislignesdata: IDevisLigne[],
  token: string | null,
): Promise<IDevisLigne[]> {
  return axios.put(
    `${API_URL}/devis/${id}/lignes`,
    devislignesdata,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}
