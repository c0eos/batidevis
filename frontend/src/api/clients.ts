import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

export function getClients(token: string | null) {
  return axios.get(
    `${API_URL}/clients`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getClient(id: string, token: string | null) {
  return axios.get(
    `${API_URL}/clients/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}
