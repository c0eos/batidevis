import axios from "axios";
import { IDevis } from "../utils/schemas";

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
