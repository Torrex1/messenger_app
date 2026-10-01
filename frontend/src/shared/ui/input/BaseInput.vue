<script setup lang="ts">
  const props = defineProps<{
    labelText: string;
    labelType?: "text" | "password" | "email";
    required?: boolean;
    error?: string;
  }>()

  const model = defineModel<string>();
</script>

<template>
  <label class="flex flex-col items-start gap-1">
    <span>
      {{ labelText }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
    
    <input
      v-model="model"
      :class="[
        'border rounded p-1 px-2 w-80 text-lg focus:outline-none focus:border-gray-400', 
        error ? 'border-red-500': 'border-gray-200'
      ]" 
      :type="labelType"
      :required="required"
    >
    <small class="text-red-400 font-bold">
      {{ error }}
    </small>
  </label>
</template>