const css = require('./styles');

window.React = require('react');
window.Redux = require('redux');
window.ReactDOM = require('react-dom');
window.ReactRedux = require('react-redux');
window.ReactJSS = require('react-jss');
window.io = require('socket.io-client');

// window.{ combineReducers, createStore } = require('redux');
// window.{ connect } = require('react-redux');

let chat = Object.assign({}, chat, (function script(w) {
  // Libraries

  const React = w.React || false;
  const Redux = w.Redux || false;
  const ReactDOM = w.ReactDOM || false;
  const ReactRedux = w.ReactRedux || false;
  const ReactJSS = w.ReactJSS || false;
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
  );


  // Styles

  const style = function Style (component) {
    const state = store.getState();

    if (!css.hasOwnProperty(state.ui.style)) {
      throw new Error('UnknownStyleError');
    }

    if (!css[state.ui.style].hasOwnProperty(component)) {
      throw new Error('UnknownComponentStyleError');
    }

    // console.log('CSS', css[state.ui.style][component]);
    return css[state.ui.style][component];
  };

  const injectSheet = ReactJSS.create();


  // React Components

  // class Notification extends React.Component {
  //   render () {
  //     return (
  //       <ul className="letschat-alert" style={{margin: 0, listStyle: 'none'}}>
  //       </ul>
  //     )
  //   }
  // }

  // class Status extends React.Component {
  //   constructor (props) {
  //     super(...arguments);

  //     this.socket = props.socket;
  //     this.socket.on('operator:typing', this.onTyping);

  //     this.state = {
  //       typing: false,
  //       style: {}
  //     };
  //   }

  //   onTyping () {
  //     console.log('OPERATOR TYPING ...');
  //   }

  //   render () {
  //     return (
  //         <ul className="letschat-message-status" style={{
  //           position: 'fixed',
  //           bottom: '48px',
  //           margin: 0,
  //           boxSizing: 'border-box',
  //           padding: '4px 8px',
  //           height: '24px',
  //           width: '265px',
  //           fontSize: '13px',
  //           fontFamily: 'sans-serif',
  //           fontStyle: 'italic',
  //           listStyle: 'none',
  //           color: '#D1D1D1'
  //         }}>
  //           <li><span>John is typing...</span></li>
  //         </ul>
  //       )
  //   }
  // }

  const Message = injectSheet(style('Message'))((props) => {
    const content = props.content.map((message, index) => <li key={index}>{message}</li>);
    const { sheet: { classes } } = props;

    let message = (
      <div>
        <ul className={classes.userContent}>
          {content}
        </ul>
      </div>
    );

    if (props.author === CHAT_OPERATOR) {
      message = (
        <div>
          <div className={classes.operatorPicture}>
            <img alt="Operator" className={classes.operatorPictureImage} src="http://placehold.it/40x40/" />
          </div>
          <ul className={classes.operatorContent}>
            {content}
          </ul>
        </div>
      );
    }

    return (
      <li id={`message_${props.id}`} className="letschat-message" style={{ clear: 'both' }}>
        {message}
        <span className="letschat-message-timestamp">{props.timestamp}</span>
      </li>
    );
  });

  const messageListMapStateToProps = state => ({
    messages: state.messages || [],
  });
  const messageListMapDispatchToProps = dispatch => ({ });

  const MessageList = injectSheet(style('MessageList'))((props) => {
    const state = store.getState();
    const socket = props.socket;
    const messages = state.chat.messages.map(
      (message, index) => <Message key={index} author={message.author} content={message.content} />,
    );
    const { sheet: { classes } } = props;

    return (
      <div className={classes.messages}>
        <div className={classes.messagesWrapper}>
          <ul className={classes.messagesList}>
            {messages}
          </ul>
        </div>
      </div>
    );
          // <Notification />
          // <Status socket={socket} />
  });

  const Messages = connect(
    messageListMapStateToProps,
    messageListMapDispatchToProps,
  )(MessageList);


  @injectSheet(style('Input'))
  class Input extends React.Component {
    static propTypes = {
      socket: (props, propName) => {
        if (!(propName in props)) {
          throw new Error('socket must be set.');
        }
      },
      sheet: (props, propName) => {
        if (!(propName in props)) {
          throw new Error('sheet must be set.');
        }
      },
    }
    constructor (props) {
      super(props);

      this.socket = props.socket;
    }


    // Event Handler

    onKeyPress (event) {
      const key = event.key;
      const keyCode = event.keyCode;
      const shiftKey = event.shiftKey;
      const ctrlKey = event.ctrlKey;
      const altKey = event.altKey;
      const input = event.target;

      console.log(`INPUT KEYPRESS ${key} (${keyCode}), SHIFT ${shiftKey}, CTRL ${ctrlKey}, ALT ${altKey}`);

      if (keyCode === KEY_ENTER) {
        if (!shiftKey) {
          console.log('SENDING MESSAGE ...');
          // Send data
          this.socket.emit('client:message', event.target.value);

          // Update message list
          store.dispatch({ type: UI_HARD_ENTER, message: event.target.value });
          store.dispatch({ type: CHAT_MESSAGE_CLIENT, message: event.target.value });

          event.preventDefault();
          input.value = '';
        } else {
          // Update input height
          store.dispatch({ type: UI_SOFT_ENTER });
        }
      }

      this.socket.emit('client:typing');
    }


    render () {
      const { sheet: { classes } } = this.props;

      return (
        <textarea
          type="text"
          className={classes.input}
          placeholder="Type a message&hellip;"
          onKeyDown={this.onKeyPress.bind(this)}
        />
      );
    }
  }

  // Create chat box wrapper
  @injectSheet(style('Chat'))
  class Chat extends React.Component {
    static propTypes = {
      sheet: (props, propName) => {
        if (!(propName in props)) {
          throw new Error('sheet must be set.');
        }
      },
    }
    constructor (props) {
      super(props);

      this.socket = io.connect(socketPath, {
        reconnectionAttempts: 10,
      });

      this.socket.on('connect', this.onSocketConnected);
      this.socket.on('connect_error', this.onSocketConnectionError);
      this.socket.on('connect_timeout', this.onSocketTimeout);
      this.socket.on('disconnect', this.onSocketDisconnected);
      this.socket.on('reconnect', this.onSocketReconnected);
      this.socket.on('reconnecting', this.onSocketReconnecting);
      // this.socket.on('reconnect_error', socketConnectionError);
      this.socket.on('reconnect_failed', this.onSocketReconnectionFailed);
      this.socket.on('reconnect_timeout', this.onSocketTimeout);

      this.socket.on('operator:message', this.handleOperatorMessage);

      // Initial state
      this.state = {
        operator: {
          firstName: 'John',
        },
        company: {
          name: 'ACME',
        },
      };
    }


    // Event Handlers

    // Successful connection
    onSocketConnected () {
      const state = store.getState();
      console.log('DEBUG', 'Socket connected');

      if (!state.chat.connected) {
        store.dispatch({ type: CHAT_CONNECTED });
      }
    }

    // Disconnected
    onSocketDisconnected () {
      const state = store.getState();
      console.warn('DEBUG', 'Socket disconnected');

      if (state.chat.connected) {
        store.dispatch({ type: CHAT_DISCONNECTED });
      }
    }

    // Successful re-connected
    onSocketReconnected () {
      console.log('DEBUG', 'Socket reconnected');
    }

    // Attempting to re-connect
    onSocketReconnecting () {
      console.log('DEBUG', 'Socket reconnecting ...');
    }

    // Failed to re-connect after manager.reconnectionAttempts tried
    onSocketReconnectionFailed () {
      console.error('DEBUG', 'Socket failed reconnection');
    }

    // Timeout either connecting or re-connecting
    onSocketTimeout () {
      console.warn('DEBUG', 'Socket timeout');
    }

    // Error when connecting or re-connecting
    onSocketConnectionError () {
      console.error('DEBUG', 'Socket connection error');
    }

    handleOperatorMessage (data) {
      console.log('DEBUG', 'RECIEVING MESSAGE ...', data);

      store.dispatch({ type: CHAT_MESSAGE_OPERATOR, message: data });
    }


    // Actions

    open () {
      console.log('DEBUG', 'Open chat');
    }

    close () {
      console.log('DEBUG', 'Close chat');
    }


    render () {
      const { sheet: { classes } } = this.props;
      const socket = this.socket;
      const operator = this.state.operator;
      const company = this.state.company;

      return (
        <div className={classes.outerWrapper}>
          <div className={classes.box}>
            <div className={classes.innerWrapper}>
              <div className={classes.header}>
                <span className={classes.headerText}>
                  <strong>{operator.firstName}</strong>
                  &nbsp;from&nbsp;{company.name}
                </span>
                <button className={classes.icon} onClick={this.close}>&#215;</button>
              </div>
              <Messages store={store} socket={socket} />
              <Input socket={socket} />
            </div>
          </div>
        </div>
      );
    }
  }

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

    ReactDOM.render(
      <Chat store={store} />,
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
    Message,
    MessageList,
    Input,
    Chat,
  };
}(window)));

if (typeof module !== 'undefined') {
  module.exports = chat;
}
// console.log('MNML', module.exports);
