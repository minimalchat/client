import {
  // CHAT_UNKNOWN,
  CHAT_CONNECTED,
  CHAT_DISCONNECTED,
  // CHAT_RECONNECTED,
  // CHAT_RECONNECTING,
  CHAT_NEW,
  CHAT_MESSAGE_CLIENT,
  CHAT_MESSAGE_OPERATOR,
} from './constants';

export function sendMessage (payload) {
  return {
    type: CHAT_MESSAGE_CLIENT,
    payload,
  };
}

export function recieveMessage (payload) {
  return {
    type: CHAT_MESSAGE_OPERATOR,
    payload,
  };
}

export function newChat (payload) {
  return {
    type: CHAT_NEW,
    payload,
  };
}

export function connected () {
  return {
    type: CHAT_CONNECTED,
  };
}

export function disconnected () {
  return {
    type: CHAT_DISCONNECTED,
  };
}

// export function reconnected(payload) {
//
// }
