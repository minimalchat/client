import { Provider } from 'react-redux';
import styles from './styles';
import Message from './components/Message/Message.js';
import Chat from './components/Chat/Chat';

const script = (function script(w) {
  // Libraries

  const React = w.React || false;
  const Redux = w.Redux || false;
  const ReactDOM = w.ReactDOM || false;
  const ReactRedux = w.ReactRedux || false;
  const ReactJSS = w.reactJss || false;
  // const $ = w.jQuery || false;
  const io = w.io || false;
  // const mnml = w.mnml || {};
  const socketPath = 'http://localhost:8000';


  // Constants

  // KeyCode Constants
  const KEY_ENTER = 13;

  // React Constants
  const UI_OPEN = 'UI_OPEN';
  const UI_CLOSE = 'UI_CLOSE';
  const UI_SOFT_ENTER = 'UI_SOFT_ENTER';
  const UI_HARD_ENTER = 'UI_HARD_ENTER';
  const UI_STYLE_MESSANGER = 'UI_STYLE_MESSANGER';
  const UI_STYLE_FLOAT = 'UI_STYLE_FLOAT';
  const UI_STYLE_SIDEPANEL = 'UI_STYLE_SIDEPANEL';

  const CHAT_CONNECTED = 'CHAT_CONNECTED';
  const CHAT_DISCONNECTED = 'CHAT_DISCONNECTED';
  const CHAT_MESSAGE_CLIENT = 'CHAT_MESSAGE_CLIENT'; // Check
  const CHAT_MESSAGE_OPERATOR = 'CHAT_MESSAGE_OPERATOR'; // Check

  const CHAT_CLIENT = 'CLIENT';
  const CHAT_OPERATOR = 'OPERATOR';

  const STYLE_MESSANGER = 'MESSANGER';
  const STYLE_FLOAT = 'FLOAT';
  const STYLE_SIDEPANEL = 'SIDEPANEL';


  // State
  const { combineReducers, createStore } = Redux;
  const { connect } = ReactRedux;


  // UI based actions (open, close)  will go through the uiReducer
  const uiInitialState = {
    style: STYLE_MESSANGER,
  };
  const uiReducer = function UIReducer (state = uiInitialState, action) {
    console.log('UI', action.type);
    switch (action.type) {
      case UI_CLOSE:
        return Object.assign({}, state, {
          open: false,
        });
      case UI_OPEN:
      default:
        return state;
    }
  };

  // Chat based actions (send, recieve) will go through the chatReducer
  const chatInitialState = {
    messages: [],
  };
  const chatReducer = function ChatReducer (state = chatInitialState, action) {
    let messages = [];

    console.log('CHAT', action.type);

    switch (action.type) {
      case CHAT_MESSAGE_OPERATOR:
        messages = state.messages;

        // Is the last message from client? (e.g. can we combine it)
        if (messages.length > 0 && messages[messages.length - 1].author === CHAT_OPERATOR) {
          messages[messages.length - 1].content.push(action.message);
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
        messages = state.messages;

        // Is the last message from client? (e.g. can we combine it)
        if (messages.length > 0 && messages[messages.length - 1].author === CHAT_CLIENT) {
          messages[messages.length - 1].content.push(action.message);
        } else {
          messages.push({
            author: CHAT_CLIENT,
            content: [action.message],
          });
        }

        return Object.assign({}, state, {
          messages,
        });
      default:
        return state;
    }
  };

  // If the latter happens, we in big dodo..
  const document = w.document || {};
  const store = document.store = createStore(
    combineReducers({
      ui: uiReducer,
      chat: chatReducer,
    }),

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


  // Styles

  // TODO: This is ugly and I would really love to have these as seperate files
  //  or some way of not bloating the source file

    const state = store.getState();
  const style = function Style (component) {

    if (!styles.hasOwnProperty(state.ui.style)) {
      throw new Error('UnknownStyleError');
    }

    if (!styles[state.ui.style].hasOwnProperty(component)) {
      throw new Error('UnknownComponentStyleError');
    }

    // console.log('CSS', styles[state.ui.style][component]);
    return styles[state.ui.style][component];
  };

  const injectSheet = ReactJSS.create();


  

  // Init

  if (!React) {
    console.error('Required dependancy missing, React. https://facebook.github.io/react/downloads.html');
    return {};
  }

  if (!Redux) {
    console.error('Required dependancy missing, Redux. http://redux.js.org/#installation');
    return {};
  }

  if (!ReactDOM) {
    console.error('Required dependancy missing, ReactDOM. https://facebook.github.io/react/downloads.html');
    return {};
  }

  if (!ReactRedux) {
    console.error('Required dependancy missing, ReactRedux. https://github.com/reactjs/react-redux#installation');
    return {};
  }

  if (!ReactJSS) {
    console.error('Required dependancy missing, ReactJSS. https://github.com/cssinjs/react-jss');
    return {};
  }

  if (!io) {
    console.error('Required dependancy missing, Socket.io. http://socket.io/download/');
    return {};
  }

  // Our generic

  // stylesrender function
  const render = function render () {
    const root = document.getElementById('lets-chat');
    const state = store.getState();

    root.style.top = 'auto';
    root.style.bottom = 'auto';
    root.style.right = 'auto';
    root.style.left = 'auto';

    if (state.ui.style === STYLE_SIDEPANEL) {
      root.style.top = 0;
      root.style.bottom = 0;
      root.style.right = 0;
    } else if (state.ui.style === STYLE_FLOAT || state.ui.style === STYLE_MESSANGER) {
      root.style.bottom = 0;
      root.style.right = 0;
      root.style.left = 0;
    }

    console.log('the store is,', store)

    ReactDOM.render(
      <Provider store={store}>
        <Chat />
      </Provider>,
      root,
    );
  };

  // Our render loop
  const unsubscribe = store.subscribe(() => {
    console.log('DEBUG', store.getState());
    render();
  });

  // Initiate the socket connection
  // socket = io.connect(socketPath, {
  //   reconnectionAttempts: 10
  // });

  // let styles = document.createElement('link');
  // styles.id = 'lets-chat-styles';
  // styles.rel = 'stylesheet';
  // styles.type = 'text/css';
  // styles.media = 'all';
  // styles.href = '/styles/lets-chat-syles-0.0.1.css';

  // Create our entry point
  const div = document.createElement('div');
  div.id = 'lets-chat';
  div.style.position = 'fixed';
  // div.style.bottom = 0;
  // div.style.right = 0;
  // div.style.left = 0;

  document.body.appendChild(div);
  // document.body.insertBefore(styles, div);

  // Start by going into disconnected mode (and then connecting)
  store.dispatch({ type: CHAT_DISCONNECTED });

  return {
    store,
    // Message,
    // MessageList,
    // Input,
    // Chat,
  };
}(window));

if (typeof module !== 'undefined') {
  module.exports = script;
}
// console.log('MNML', module.exports);
