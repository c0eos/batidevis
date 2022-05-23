import axios from "axios";
import { IClient } from "../utils/schemas";

const API_URL = process.env.REACT_APP_API_URL || "";

export function getAllClients(token: string | null): Promise<IClient[]> {
  return axios.get(
    `${API_URL}/clients`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getOneClientById(id: string | undefined, token: string | null): Promise<IClient> {
  return axios.get(
    `${API_URL}/clients/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}
