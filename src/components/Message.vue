<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

import { type MESSAGE } from '@/libs/interfaces/message'
import { computed } from 'vue'

const props = defineProps<MESSAGE>()

const dateAsString = computed(() => {
  const dateObj = new Date(props.date)

  return `${dateObj.getDate() + 1}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
})
</script>

<template>
  <v-card
    :prepend-avatar="author.picUrl"
    :title="author.name"
    :subtitle="`- ${dateAsString}`"
  >
    <v-card-text v-if="text?.length">
      {{ text }}
    </v-card-text>
  </v-card>
</template>

<style scoped>
.post-content > img {
  width: 500px;
  height: 200px;
}
</style>
