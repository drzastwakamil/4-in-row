import { consola } from 'consola'

type RedField = 'R'
type BlueField = 'B'
type EmptyField = 'E'
type GridField = RedField | BlueField | EmptyField

class FourInRowGame {
  grid: Array<Array<GridField>>
  constructor() {
    this.grid = []
  }
}

class Room {
  bluePlayer: Player
  redPlayer: Player
  constructor(bluePlayer: Player, redPlayer: Player) {
    this.bluePlayer = bluePlayer
    this.redPlayer = redPlayer
  }
}

class Player {
  id: string
  constructor(id: string) {
    this.id = id
  }
}

const rooms: Map<string, Room> = new Map()

export default defineWebSocketHandler({
  open(peer) {
    if (!peer.request?.url) {
      return
    }

    const roomId = peer.request.url.split('/').pop()
    console.log('the room id', roomId)

    if (!roomId) {
      return
    }



    const room = rooms.get(roomId) 
    if (rooms.get(roomId))
  },
  message(peer, message) {

  },
  close(peer) {
  },
})
