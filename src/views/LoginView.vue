<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const { login } = useAuthStore()

function triggerLogin() {
  login()
}
</script>
<template>
  <div>
    <v-btn @click="triggerLogin">Login</v-btn>
  </div>
</template>
