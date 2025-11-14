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
    CALL: {
      OFFER: 'call:offer',
      ANSWER: 'call:answer',
      ICE: 'call:ice',
      HANGUP: 'call:hangup',
    }
  },
  ON: {
    MESSAGE: {
      RECEIVE: 'message:receive',
      REACTED: 'message:reacted',
    },
    CALL: {
      OFFER: 'call:offer',
      ANSWER: 'call:answer',
      ICE: 'call:ice',
      HANGUP: 'call:hangup',
    }
  }
  
}