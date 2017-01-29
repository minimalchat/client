import React from 'react';
import ReactDOM from 'react-dom';
import ReactRedux, { Provider } from 'react-redux';
import Redux from 'redux';
import io from 'socket.io-client';
// import { combineReducers, createStore } from 'redux';

import Chat from './components/Chat/Chat.jsx';
import store from './containers';

// import css = from './styles';

// window.React = require('react');
// window.Redux = require('redux');
// window.ReactDOM = require('react-dom');
// window.ReactRedux = require('react-redux');
// window.ReactJSS = require('react-jss');
// window.io = require('socket.io-client');

// window.{ combineReducers, createStore } = require('redux');
// window.{ connect } = require('react-redux');

// let chat = Object.assign({}, chat, (function script(w) {


// Libraries

// const React = w.React || false;
// const Redux = w.Redux || false;
// const ReactDOM = w.ReactDOM || false;
// const ReactRedux = w.ReactRedux || false;
// const ReactJSS = w.ReactJSS || false;
// const $ = w.jQuery || false;
// const io = w.io || false;
// const mnml = w.mnml || {};
// const socketPath = 'http://localhost:8000';

// Constants

// // KeyCode Constants
// const KEY_ENTER = 13;
//
// // socket constants
// const CHAT_CONNECTED = 'CHAT_CONNECTED';
// const CHAT_DISCONNECTED = 'CHAT_DISCONNECTED';
// const CHAT_MESSAGE_CLIENT = 'CHAT_MESSAGE_CLIENT'; // Check
// const CHAT_MESSAGE_OPERATOR = 'CHAT_MESSAGE_OPERATOR'; // Check
//
// const CHAT_CLIENT = 'CLIENT';
// const CHAT_OPERATOR = 'OPERATOR';
//
// const STYLE_MESSENGER = 'MESSENGER';
// const STYLE_FLOAT = 'FLOAT';
// const STYLE_SIDEPANEL = 'SIDEPANEL';


// State

// const { connect } = ReactRedux;

// If the latter happens, we in big dodo..
// const document = w.document || {};


// Init

if (!React) {
  console.error('Required dependancy missing, React. https://facebook.github.io/react/downloads.html');
}

if (!Redux) {
  console.error('Required dependancy missing, Redux. http://redux.js.org/#installation');
}

if (!ReactDOM) {
  console.error('Required dependancy missing, ReactDOM. https://facebook.github.io/react/downloads.html');
}

if (!ReactRedux) {
  console.error('Required dependancy missing, ReactRedux. https://github.com/reactjs/react-redux#installation');
}

// if (!ReactJSS) {
//   console.error('Required dependancy missing, ReactJSS. https://github.com/cssinjs/react-jss');
//   return {};
// }

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
store.dispatch({ type: 'CHAT_DISCONNECTED' });

// return {
//   store,
//   // Message,
//   // MessageList,
//   // Input,
//   // Chat,
// };


// }(window)));

// if (typeof module !== 'undefined') {
//   module.exports = chat;
// }
// console.log('MNML', module.exports);
