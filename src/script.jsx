import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import io from 'socket.io-client';

import Chat from './components/Chat/Chat.jsx';
import store from './containers';

// State

// Cheat here and make the store globally available for development
window.store = store;

// Init

if (!React) {
  console.error('Required dependancy missing, React. https://facebook.github.io/react/downloads.html');
}

if (!ReactDOM) {
  console.error('Required dependancy missing, ReactDOM. https://facebook.github.io/react/downloads.html');
}

if (!io) {
  console.error('Required dependancy missing, Socket.io. http://socket.io/download/');
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
  if (state.ui.chatStyle === 'SIDEPANEL') {
    root.style.top = 0;
    root.style.bottom = 0;
    root.style.right = 0;
  } else if (state.ui.chatStyle === 'FLOAT' || state.ui.chatStyle === 'MESSENGER') {
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
store.subscribe(() => {
  console.log('DEBUG', store.getState());
  render();
});

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
store.dispatch({ type: 'CHAT_DISCONNECTED' });
