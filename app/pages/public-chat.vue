<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import type { PublicChatMessage } from '~~/shared/types'

const { status, data, send } = useWebSocket<Blob>('ws://localhost:3000/api/public-chat', {
  // heartbeat: true,
})

const messages = ref<Array<PublicChatMessage>>([])

// Listen for messages
watch(data, async (blob) => {
  console.log('the blob,', blob)
  if (!blob) {
    return
  }

  const parsedMessage: PublicChatMessage = JSON.parse(await blob.text())
  if (parsedMessage.type === 'PING') {
    const pongResponse: PublicChatMessage = {
      type: 'PONG',
    }
    send(new Blob([JSON.stringify(pongResponse)]))
  }
  else if (parsedMessage.type === 'TEXT_MESSAGE_SENT' && parsedMessage.value) {
    messages.value.push(parsedMessage)
  }
})

const inputValue = ref('')

function onFormSubmit() {
  const messageText = inputValue.value.trim()
  if (!messageText.length) {
    return
  }

  const message: PublicChatMessage = {
    type: 'TEXT_MESSAGE_SENT',
    value: messageText,
  }

  send(new Blob([JSON.stringify(
    message,
  )]))
  inputValue.value = ''
};
</script>

<template>
  <div>
    <div>
      CONNECTION STATUS: {{ status }}
    </div>
    <form @submit.prevent="onFormSubmit">
      <input
        v-model="inputValue"
        type="text"
        placeholder="Type something..."
        required
        @keypress.enter.prevent="onFormSubmit"
      >
      <button type="submit">
        Submit
      </button>
    </form>
    <div v-for="(message, index) of messages" :key="index">
      <strong>

        {{ message.author }}
      </strong>
      : {{ message.value }}
    </div>
  </div>
</template>

<style scoped></style>
