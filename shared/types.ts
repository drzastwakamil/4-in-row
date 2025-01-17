export type PUBLIC_CHAT_EVENT_TYPE = 'PING' | 'PONG'

export type PublicChatMessage = {
  type: 'PING' | 'PONG' | 'TEXT_MESSAGE_SENT'
  value?: string
  author?: string
}
