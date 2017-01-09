import { Provider } from 'react-redux';
// import styles from './styles';
import Chat from './components/Chat/Chat';

// reducers
import chatReducer from './containers/Chat/reducer'
import uiReducer from './containers/UI/reducer'


const script = (function script(w) {
  // Libraries

  const React = w.React || false;
  const Redux = w.Redux || false;
  const ReactDOM = w.ReactDOM || false;
  const ReactRedux = w.ReactRedux || false;
  const ReactJSS = w.reactJss || false;
  // const $ = w.jQuery || false;
  const io = w.io || false;
  const mnml = w.mnml || {};
  const socketPath = 'http://localhost:8000';


  /*** Constants ***/

  // KeyCode Constants
  const KEY_ENTER = 13;

  // socket constants
  const CHAT_CONNECTED = 'CHAT_CONNECTED';
  const CHAT_DISCONNECTED = 'CHAT_DISCONNECTED';
  const CHAT_MESSAGE_CLIENT = 'CHAT_MESSAGE_CLIENT'; // Check
  const CHAT_MESSAGE_OPERATOR = 'CHAT_MESSAGE_OPERATOR'; // Check

  const CHAT_CLIENT = 'CLIENT';
  const CHAT_OPERATOR = 'OPERATOR';

  const STYLE_MESSENGER = 'MESSENGER';
  const STYLE_FLOAT = 'FLOAT';
  const STYLE_SIDEPANEL = 'SIDEPANEL';


  // State
  const { combineReducers, createStore } = Redux;
  const { connect } = ReactRedux;


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
  // TODO: Can this be deleted?
/*
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

  // const injectSheet = ReactJSS.create();
  */


  

  // Init

  // if (!React) {
  //   console.error('Required dependancy missing, React. https://facebook.github.io/react/downloads.html');
  //   return {};
  // }

  // if (!Redux) {
  //   console.error('Required dependancy missing, Redux. http://redux.js.org/#installation');
  //   return {};
  // }

  // if (!ReactDOM) {
  //   console.error('Required dependancy missing, ReactDOM. https://facebook.github.io/react/downloads.html');
  //   return {};
  // }

  // if (!ReactRedux) {
  //   console.error('Required dependancy missing, ReactRedux. https://github.com/reactjs/react-redux#installation');
  //   return {};
  // }

  // if (!ReactJSS) {
  //   console.error('Required dependancy missing, ReactJSS. https://github.com/cssinjs/react-jss');
  //   return {};
  // }

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

    // TODO: Replace these with new constants. 
    if (state.ui.chatStyle === STYLE_SIDEPANEL) {
      root.style.top = 0;
      root.style.bottom = 0;
      root.style.right = 0;
    } else if (state.ui.chatStyle === 'FLOAT' || state.ui.chatStyle === "MESSENGER") {
      root.style.bottom = 0;
      root.style.right = 0;
      root.style.left = 0;
    }


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
