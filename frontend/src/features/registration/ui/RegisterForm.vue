<script setup lang="ts">
import { ref } from 'vue'
import { isAxiosError } from 'axios'

import { BaseInput } from '../../../shared/ui/input';
import { BaseButton } from '../../../shared/ui/button';
import { register } from '../api/register';
import { registerSchema } from '../model/validation';

import { useAuthStore } from '../../../entities/user/model/authStore';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);

const errors = ref<{
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string
}>({})

const authStore = useAuthStore();

async function handleSubmit() {
  errors.value = {};

  const result = registerSchema.safeParse({
    name: name.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  })

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    errors.value = {
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
      confirmPassword: fieldErrors.confirmPassword?.[0],
    }

    return; 
  }

  try {
    isLoading.value = true;

    const response = await register({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    authStore.setAuth(response.data.token, response.data.user);
    
    name.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;

      if (error.response?.status === 409 && message) {
        errors.value.email = message;
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
        Create your account
      </h1>
      <p class="text-lg text-gray-500 mt-2">
        It looks like someone has already written to you ^^
      </p>
    </div>

    <form novalidate @submit.prevent="handleSubmit" class="flex flex-col gap-2 p-4">
      <BaseInput label-text="Name" required v-model="name" :error="errors.name" />
      <BaseInput label-text="Email" required label-type="email" v-model="email" :error="errors.email" />
      <BaseInput label-text="Password" required label-type="password" v-model="password" :error="errors.password" />
      <BaseInput label-text="Confirm password" required label-type="password" v-model="confirmPassword" :error="errors.confirmPassword" />
      <BaseButton :disabled="isLoading" button-text="Register" />
    </form>
    
    <div>
      <span>
        Already have an account?
        <RouterLink to="/login" class="text-green-500 font-bold">Sign in</RouterLink>
      </span>
    </div>
  </div>
</template>