(function (w) {

  // Libraries

  const React = w.React || false;
  const Redux = w.Redux || false;
  const ReactDOM = w.ReactDOM || false;
  const ReactRedux = w.ReactRedux || false;
  // const $ = w.jQuery || false;
  const io = w.io || false;


  // Constants

  const UI_OPEN = 'UI_OPEN';
  const UI_CLOSE = 'UI_CLOSE';


  // Functions

  // Successful connection
  const socketConnected = function socketConnected () { };
  // Disconnected
  const socketDisconnected = function socketDisconnected () { };
  // Successful re-connected
  const socketReconnected = function socketReconnected () { };
  // Attempting to re-connect
  const socketReconnecting = function socketReconnecting () { };

  // Timeout either connecting or re-connecting
  const socketTimeout = function socketTimeout () { };
  // Error when connecting or re-connecting
  const socketConnectionError = function socketConnectionError () { };


  // State
  const { combineReducers, createStore } = Redux;
  const { connect } = ReactRedux;

  // UI based actions (open, close)  will go through the uiReducer
  const uiInitialState = { };
  const uiReducer = function UIReducer (state = uiInitialState, action) {
    switch (action.type) {
      case UI_CLOSE:
        return Object.assign({}, state, {
          open: false
        });
      case UI_OPEN:
      default:
        return state;
    }
  };

  // Chat based actions (send, recieve) will go through the chatReducer
  const chatInitialState = {
    messages: []
  };
  const chatReducer = function ChatReducer (state = chatInitialState, action) {
    switch (action.type) {
      default:
        return state;
    }
  }

  let store = document.store = createStore(
    combineReducers({
      ui: uiReducer,
      chat: chatReducer
    })
  );

  // Create chat box wrapper
  class Chat extends React.Component {
    render () {
      return (
        <div id="lets-chat" className="wrapper">
          <Messages data={this.props.data} />
        </div>
      )
    }
  }

  class Messages extends React.Component {
    render () {
      return null;
    }
  }

  class Input extends React.Component {
    render () {
      return null
    }
  }

  if (!React) {
    console.error('Required dependancy missing, React. https://facebook.github.io/react/downloads.html')
  }

  if (!Redux) {
    console.error('Required dependancy missing, Redux. http://redux.js.org/#installation')
  }

  if (!ReactDOM) {
    console.error('Required dependancy missing, ReactDOM. https://facebook.github.io/react/downloads.html')
  }

  if (!ReactRedux) {
    console.error('Required dependancy missing, ReactRedux. https://github.com/reactjs/react-redux#installation')
  }

  if (!io) {
    console.error('Required dependancy missing, Socket.io. http://socket.io/download/')
  }

  if (!React || !ReactDOM || !io) {
    return
  }

  // Our generic render function
  const render = function render () {
    const state = store.getState();

    ReactDOM.render(
      <Chat data={state.chat.messages} />,
      document.getElementById('lets-chat')
    );
  };

  // Our render loop
  const unsubscribe = store.subscribe(() => {
    console.log('DEBUG', store.getState());
    render();
  });


  // Initiate the socket connection
  socket = io.connect('http://localhost:8000');

  io.on('connect', socketConnected);
  io.on('connect_error', socketConnectionError);
  io.on('connect_timeout', socketTimeout);
  socket.on('disconnect', socketDisconnected);
  socket.on('reconnect', socketReconnected);
  socket.on('reconnecting', socketReconnecting);
  socket.on('reconnect_error', socketConnectionError);
  socket.on('reconnect_failed', socketReconnectionFailed);
  socket.on('reconnect_timeout', socketTimeout);

  // Create our entry point
  let div = document.createElement('div');
  div.id = "lets-chat";
  document.body.appendChild(div);

}) (window)