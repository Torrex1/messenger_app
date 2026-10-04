<script setup lang="ts">
import { ref } from 'vue';
import { isAxiosError } from 'axios';

import { BaseInput } from '../../../shared/ui/input';
import { BaseButton } from '../../../shared/ui/button';

import { loginSchema } from '../model/validation';
import { login } from '../api/login';

import { useAuthStore } from '../../../entities/user/model/authStore';

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const errors = ref<{
  email?: string;
  password?: string,
  errorText?: string;
}>({})

const authStore = useAuthStore();

async function handleSubmit() {
  errors.value = {};

  const result = loginSchema.safeParse({
    email: email.value,
    password: password.value,
  })

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    errors.value = {
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
    }
    return;
  }

  try {
    isLoading.value = true;

    const response = await login({
      email: email.value,
      password: password.value,
    })

    authStore.setAuth(response.data.token, response.data.user);
    
    email.value = "";
    password.value = "";
  } catch(error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      if (error.response?.status === 400 && message) {
        errors.value.errorText = message;
      }
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    
    <div class="text-center mb-2">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
        Yay, you are back
      </h1>
      <p class="text-lg text-gray-500 mt-2">
        Everyone has been waiting for you (*^ω^*)
      </p>
    </div>

    <form novalidate @submit.prevent="handleSubmit" class="flex flex-col gap-2 p-4">
      <BaseInput label-text="Email" v-model="email" required label-type="email" :error="errors.email "/>
      <BaseInput label-text="Password" v-model="password" required label-type="password" :error="errors.password"/>
      <small v-if="errors.errorText" class="text-red-500 font-bold">{{ errors.errorText }}</small>

      <BaseButton :disabled="isLoading" button-text="Sign up" />
    </form>

    <div>
      <span>
        Do not have an account?
        <RouterLink to="/register" class="text-green-500 font-bold">Sign up</RouterLink>
      </span>
    </div>
  </div>
</template>