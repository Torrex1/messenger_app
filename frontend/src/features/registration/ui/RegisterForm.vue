<script setup>
import { BaseInput } from '../../../shared/input';
import { BaseButton } from '../../../shared/button';
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

    <div class="flex flex-col gap-2 p-4">
      <BaseInput label-text="Name" />
      <BaseInput label-text="Email" label-type="email" />
      <BaseInput label-text="Password" label-type="password" />
      <BaseButton button-text="Register" />
    </div>
  </div>
</template>