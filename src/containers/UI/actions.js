import {
  UI_OPEN,
  UI_TOGGLE,
  UI_CLOSE,
  // UI_HARD_ENTER,
  // UI_SOFT_ENTER,
  UI_TOGGLE_STYLE,
} from './constants';

export function toggleChatStyle(payload) {
  return {
    type: UI_TOGGLE_STYLE,
    payload,
  };
}


export function openChat(payload) {
  return {
    type: UI_OPEN,
    payload,
  };
}

export function toggleChat(payload) {
  return {
    type: UI_TOGGLE,
    payload,
  };
}

export function closeChat(payload) {
  return {
    type: UI_CLOSE,
    payload,
  };
}
