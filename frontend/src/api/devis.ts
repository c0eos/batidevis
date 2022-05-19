import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

export function getAllDevis(token: string | null) {
  return axios.get(
    `${API_URL}/devis`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getOneDevisById(id: string, token: string | null) {
  return axios.get(
    `${API_URL}/devis/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}
