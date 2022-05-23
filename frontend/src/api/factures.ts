import axios from "axios";
import { IFacture } from "../utils/schemas";

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
