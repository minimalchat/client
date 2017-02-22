/* eslint max-len:1*/

import {
  CHAT_UNKNOWN,
  CHAT_CONNECTED,
  CHAT_DISCONNECTED,
  // CHAT_RECONNECTED,
  // CHAT_RECONNECTING,
  CHAT_MESSAGE_CLIENT,
  CHAT_MESSAGE_OPERATOR,
  CHAT_CLIENT,
  CHAT_OPERATOR,
} from './constants';


// Chat based actions (send, recieve) will go through the chatReducer
const chatInitialState = {
  status: CHAT_UNKNOWN,
  messages: [
      { author: 'CLIENT', content: ['Im a client'] },
      { author: 'OPERATOR', content: ['Im an operator'] },
  ],
    // messages: [],

};
const chatReducer = function ChatReducer (state = chatInitialState, action) {
  let messages = [];

  console.log('CHAT', action.type);

  switch (action.type) {

    // case CHAT_RECONNECTING:
    // case CHAT_RECONNECTED:
    case CHAT_DISCONNECTED:
    case CHAT_CONNECTED:
      return Object.assign({}, state, {
        status: action.type,
      });

    case CHAT_MESSAGE_OPERATOR:
      // messages = state.messages;

      // Is the last message from client? (e.g. can we combine it)
      if (state.messages.length > 0 &&
        state.messages[state.messages.length - 1].author === CHAT_OPERATOR) {
        messages = [
          ...state.messages[state.messages.length - 1].content,
          action.payload,
        ];

        return {
          ...state,
          messages: [
            ...state.messages.slice(0, state.messages.length - 1),
            { author: CHAT_OPERATOR, content: messages },
          ],
        };
      }

      return {
        ...state,
        messages: [...state.messages, { author: CHAT_OPERATOR, content: [action.payload] }],
      };

    case CHAT_MESSAGE_CLIENT:
      // messages = state.messages;

      // Is the last message from client? (e.g. can we combine it)
      // ...This got ugly. Resource for not mutating state in this case:
      // ...http://stackoverflow.com/questions/35362460/replace-array-item-with-another-one-without-mutating-state#35362981
      if (state.messages.length > 0 &&
        state.messages[state.messages.length - 1].author === CHAT_CLIENT) {
         // Clone the array of prev. messages
        messages = [
          ...state.messages[state.messages.length - 1].content,
          action.payload,
        ];

        return {
          ...state,
          messages: [
            ...state.messages.slice(0, state.messages.length - 1),
            { author: CHAT_CLIENT, content: messages },
          ],
        };
      }

      // If operator has spoken since last input, create a new bubble.
      return {
        ...state,
        messages: [...state.messages, { author: CHAT_CLIENT, content: [action.payload] }],
      };

    default:
      return state;
  }
};

export default chatReducer;
