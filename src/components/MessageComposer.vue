<script setup lang="ts">
import { computed, ref } from 'vue'

const emits = defineEmits(['onMessage'])

const messageText = ref('')

function triggerMessage() {
  emits('onMessage', {
    text: messageText.value,
  })
  messageText.value = ''
}

const messageIsValid = computed(() => {
  return !!messageText.value?.trim().length
})
</script>
<template>
  <v-card>
    <v-card-text>
      <v-textarea
        v-model="messageText"
        id="composer-text-input"
        variant="underlined"
        no-resize
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="!messageIsValid" @click="triggerMessage" variant="tonal">Enviar</v-btn>
    </v-card-actions>
  </v-card>
</template>
