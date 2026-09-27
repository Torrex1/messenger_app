<script setup lang="ts">
  const props = defineProps<{
    labelText: string;
    labelType?: "text" | "password" | "email"
  }>()
</script>

<template>
  <label class="flex flex-col items-start gap-1">
    <span>{{ labelText }}</span>
    <input 
      class="border border-gray-200 rounded p-1 px-2 w-80 text-lg focus:outline-none focus:border-gray-400" 
      :type="labelType" >
  </label>
</template>