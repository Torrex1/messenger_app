import { defineStore } from "pinia";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),

  getters: {
    isAuthenticated: (state) => state.token !== null,
  },

  actions: {
    setAuth(token: string, user: User) {
      this.token = token
      this.user = user

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },

    logout() {
      this.token = null
      this.user = null

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
})