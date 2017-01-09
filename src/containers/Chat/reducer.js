import {
  CHAT_CONNECTED,
  CHAT_DISCONNECTED,
  CHAT_MESSAGE_CLIENT,
  CHAT_MESSAGE_OPERATOR,
  CHAT_CLIENT,
  CHAT_OPERATOR,
} from './constants.js'


// Chat based actions (send, recieve) will go through the chatReducer
  const chatInitialState = {
    // messages: [
    //   {author: 'CLIENT', content: ['Im a client']},
    //   {author: 'OPERATOR', content: ['Im an operator']}
    //   ],
    messages:[]
  };
  const chatReducer = function ChatReducer (state = chatInitialState, action) {
    let messages = [];

    console.log('CHAT', action.type);

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
        console.log('chat message from client, content is', action.payload)
        messages = state.messages;

        // Is the last message from client? (e.g. can we combine it)
        if (messages.length > 0 && messages[messages.length - 1].author === CHAT_CLIENT) {
          messages[messages.length - 1].content.push(action.payload);
        } else {
          messages.push({
            author: CHAT_CLIENT,
            content: [action.payload],
          });
        }
        console.log(messages);

        return Object.assign({}, state, {
          messages,
        });
        
      default:
        return state;
    }
  };

  export default chatReducer;