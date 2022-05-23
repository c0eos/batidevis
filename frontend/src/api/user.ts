import axios from "axios";
import { IUser } from "../utils/schemas";

const API_URL = process.env.REACT_APP_API_URL || "";

// eslint-disable-next-line import/prefer-default-export
export function checkToken(token: string | null): Promise<IUser> {
  return axios.get(
    `${API_URL}/users/checkToken`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getToken(email: string, password: string): Promise<string> {
  return axios.post(`${API_URL}/users/login`, { email, password })
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}
