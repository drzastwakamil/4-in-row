<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'

const { status, data, send } = useWebSocket<Blob>('ws://localhost:3000/api/room/123', {
  // heartbeat: true,
})

// Listen for messages
watch(data, async (blob) => {
  console.log('the blob,', blob)
})
</script>

<template>
  <div>
    room to play in
  </div>
</template>

<style scoped></style>
