export const SOCKET_EVENTS = {
  EMIT: {
    ROOM: {
      JOIN: 'room:join',
      LEAVE: 'room:leave',
    },
    MESSAGE: {
      SEND: 'message:send',
      // TYPING: 'message:typing',
      REACT: 'message:reacted',
    },
  },
  ON: {
    MESSAGE: {
      RECEIVE: 'message:receive',
      REACTED: 'message:reacted',
    }
  }
  
}