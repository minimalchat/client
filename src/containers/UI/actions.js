/* eslint import/prefer-default-export: 0 */

import {
  UI_OPEN,
  UI_CLOSE,
  UI_HARD_ENTER,
  UI_SOFT_ENTER,
  TOGGLE_CHAT_STYLE,
} from './constants';

export function rotateChatStyle(payload) {
  return {
    type: TOGGLE_CHAT_STYLE,
    payload,
  };
}
