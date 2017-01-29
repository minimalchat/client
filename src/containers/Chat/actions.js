import {
  CHAT_MESSAGE_CLIENT,
  CHAT_MESSAGE_OPERATOR,
} from './constants';

export function sendMessage(payload) {
  return {
    type: CHAT_MESSAGE_CLIENT,
    payload,
  };
}

export function recieveMessage(payload) {
  return {
    type: CHAT_MESSAGE_OPERATOR,
    payload,
  };
}
