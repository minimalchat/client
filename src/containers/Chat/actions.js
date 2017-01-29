import {
  CHAT_MESSAGE_CLIENT,
} from './constants';


// receive e.target.value from Input text box.
export function updateMessageList(payload) { // eslint-disable-line
  return {
    // TODO: I didn't know what to name this... name is taken from "onKeyPress" fn in `<Input>`
    type: CHAT_MESSAGE_CLIENT,
    payload,
  };
}
