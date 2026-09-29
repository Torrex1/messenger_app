import { createRouter, createWebHistory } from "vue-router";
import { RegistrationCard } from "../../pages/auth-registration";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/register",
      name: "register",
      component: RegistrationCard
    },
  ]
})

export default router
