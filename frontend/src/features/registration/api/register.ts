import { api } from "../../../shared/api/axios";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function register(data: RegisterData) {
  return api.post('/auth/register', data)
}