<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './entities/user/model/authStore';
import { getMe } from './entities/user/api/getMe';

const authStore = useAuthStore();
onMounted(async () => {
  if (!authStore.token) return;
  
  try {
    const response = await getMe();

    authStore.setUser(response.data);
  } catch(error) {
    authStore.logout();
  }
})
</script>

<template>
  <RouterView />
</template>