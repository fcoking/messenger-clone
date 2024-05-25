<script setup lang="ts">
import Message from '@/components/Message.vue'
import MessageComposer from '@/components/MessageComposer.vue'
import { useMessagesStore } from '@/stores/messages'
import { onMounted, toRefs } from 'vue'

const { messagesByDate } = toRefs(useMessagesStore())
const { createMessage, getMessages, subscribeToMessages } = useMessagesStore()

async function handleMessage(messageBody: { text: string }) {

  createMessage({
    text: messageBody.text
  })
}

onMounted(() => {
  getMessages()
  subscribeToMessages()
})
</script>
<template>
  <div class="pa-4 bg-grey-lighten-4">
    <Message
      class="mt-4"
      v-for="(message, n) in messagesByDate"
      :author="message.author"
      :date="message.date"
      :text="message.text"
      :key="n"
    />
    <MessageComposer @onMessage="handleMessage" />
  </div>
</template>
