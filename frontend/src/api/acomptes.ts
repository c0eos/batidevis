import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

export function getAllAcomptes(token: string | null) {
  return axios.get(
    `${API_URL}/acomptes`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getOneAcompteById(id: string|undefined, token: string | null) {
  return axios.get(
    `${API_URL}/acomptes/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}
