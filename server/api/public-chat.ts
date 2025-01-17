import { consola } from 'consola'
import type { PublicChatMessage } from '~~/shared/types'

export default defineWebSocketHandler({
  open(peer) {
    const request = peer.request?.headers
    consola.info(' the request of peer', request)
    // consola.log('the request of peer ', request)

    // console.log('peer wants to open', peer)
    // peer.send({ user: 'server', message: `Welcome ${peer}!` })
    // peer.publish('chat', { user: 'server', message: `${peer} joined!` })
    peer.subscribe('chat')
  },
  message(peer, message) {
    const parsedMessage: PublicChatMessage = JSON.parse(message.text())
    console.log('received message ', parsedMessage)
    if (parsedMessage.type === 'PING') {
      peer.send({
        type: 'PONG',
      } as PublicChatMessage)
    }
    else if (parsedMessage.type === 'TEXT_MESSAGE_SENT') {
      const messageWithUser: PublicChatMessage = {
        ...parsedMessage,
        author: peer.toString(),
      }
      peer.send(new Blob([JSON.stringify(messageWithUser)]))
      peer.publish('chat', new Blob([JSON.stringify(messageWithUser)]))
    }
  },
  close(peer) {
    console.log('peer closed connection', peer)
    // peer.publish('chat', { user: 'server', message: `${peer} left!` })
  },
})
