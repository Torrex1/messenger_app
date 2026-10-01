<script setup lang="ts">
  const props = defineProps<{
    buttonText: string
  }>()
</script>

<template>
  <button class="
            h-10 bg-green-500 text-white cursor-pointer font-medium rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
            not-disabled:hover:bg-green-600
            disabled:cursor-not-allowed disabled:opacity-50
          "
  >
    <span>{{ buttonText }}</span>
  </button>
</template>