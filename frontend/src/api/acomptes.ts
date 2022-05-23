import axios from "axios";
import { IAcompte } from "../utils/schemas";

const API_URL = process.env.REACT_APP_API_URL || "";

export function getAllAcomptes(token: string | null): Promise<IAcompte[]> {
  return axios.get(
    `${API_URL}/acomptes`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getOneAcompteById(id: string | undefined, token: string | null): Promise<IAcompte> {
  return axios.get(
    `${API_URL}/acomptes/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}
