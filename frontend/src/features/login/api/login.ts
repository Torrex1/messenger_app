import { api } from "../../../shared/api/axios";

export interface LoginData {
  email: string;
  password: string;
}

export async function login(data:LoginData) {
  return api.post('auth/login', data)
}