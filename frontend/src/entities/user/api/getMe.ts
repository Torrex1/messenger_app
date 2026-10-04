import { api } from "../../../shared/api/axios";

export interface User {
  id: string;
  email: string;
  name: string;
}

export async function getMe() {
  return api.get<User>("/auth/me");
}