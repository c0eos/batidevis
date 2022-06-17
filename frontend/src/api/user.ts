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

export function getToken(userdata: IUser): Promise<string> {
  return axios.post(`${API_URL}/users/login`, userdata)
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function register(userdata: IUser, token: string | null): Promise<IUser> {
  return axios.post(`${API_URL}/users`, userdata, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function updateOneUserById(
  userId: number,
  userdata: IUser,
  token: string | null,
): Promise<IUser> {
  return axios.put(`${API_URL}/users/${userId}`, userdata, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function deleteOneUserById(
  userId: number | undefined,
  token: string | null,
): Promise<IUser> {
  return axios.delete(`${API_URL}/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}

export function getAllUsers(token: string | null): Promise<IUser[]> {
  return axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => response.data.results)
    .catch((err) => { throw err.response.data.error_message ?? err.message; });
}
