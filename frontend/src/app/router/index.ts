import { createRouter, createWebHistory } from "vue-router";
import { RegistrationCard, LoginCard } from "../../pages/auth-registration";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/register",
      name: "register",
      component: RegistrationCard
    },
    {
      path: "/login",
      name: "login",
      component: LoginCard
    }
  ]
})

export default router
