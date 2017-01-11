/* eslint max-len:1*/

import {
  CHAT_CONNECTED,
  CHAT_DISCONNECTED,
  CHAT_MESSAGE_CLIENT,
  CHAT_MESSAGE_OPERATOR,
  CHAT_CLIENT,
  CHAT_OPERATOR,
} from './constants';


// Chat based actions (send, recieve) will go through the chatReducer
const chatInitialState = {
  messages: [
      { author: 'CLIENT', content: ['Im a client'] },
      { author: 'OPERATOR', content: ['Im an operator'] },
  ],
    // messages: [],

};
const chatReducer = function ChatReducer (state = chatInitialState, action) {
  let messages = [];

  // console.log('CHAT', action.type); // commenting out for now, so they don't show up in tests.

  switch (action.type) {
    case CHAT_MESSAGE_OPERATOR:
      messages = state.messages;

        // Is the last message from client? (e.g. can we combine it)
      if (messages.length > 0 && messages[messages.length - 1].author === CHAT_OPERATOR) {
        messages[messages.length - 1].content.push(action.payload);
      } else {
        messages.push({
          author: CHAT_OPERATOR,
          content: [action.message],
        });
      }

      return Object.assign({}, state, {
        messages,
      });

    case CHAT_MESSAGE_CLIENT:
      console.log('chat message from client, content is', action.payload);
      messages = state.messages;

        // // Is the last message from client? (e.g. can we combine it)
        // this got ugly. Resource for not mutating state in this case: http://stackoverflow.com/questions/35362460/replace-array-item-with-another-one-without-mutating-state#35362981
      if (messages.length > 0 && messages[messages.length - 1].author === CHAT_CLIENT) {
        const lastMsg = [...state.messages[state.messages.length - 1].content]; // clone the array of prev. messages
        const newLast = [...lastMsg, [action.payload]]; // add the "addendum"

        return {
          ...state,
          messages: [...state.messages.slice(0, state.messages.length - 1), { author: CHAT_CLIENT, content: newLast }],
        };

        // if operator has spoken since last input, create a new bubble.
      }

      return {
        ...state,
        messages: [...state.messages, { author: CHAT_CLIENT, content: [action.payload] }],
      };

    default:
      return state;
  }
};

export default chatReducer;
