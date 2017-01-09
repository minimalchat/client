import {
  UI_OPEN,
  UI_CLOSE,
  UI_HARD_ENTER,
  UI_SOFT_ENTER,
  TOGGLE_CHAT_STYLE
} from './constants.js'


export function toggleChatAction(payload) {
  return {
    type: TOGGLE_CHAT,
    payload,
  }
}

export function rotateChatStyle(payload) {
  return {
    type: TOGGLE_CHAT_STYLE,
    payload,
  }
}



