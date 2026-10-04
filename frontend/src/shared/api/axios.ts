import axios from "axios";
import { useAuthStore } from "../../entities/user/model/authStore";

export const api = axios.create({
  baseURL: "http://localhost:3000/api"
})

api.interceptors.request.use( (config) => {
  const authStore = useAuthStore();

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  
  return config;
})