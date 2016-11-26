const React = global.window.React = require('react');
const Redux = global.window.Redux = require('redux');
const ReactDOM = global.window.ReactDOM = require('react-dom');
const ReactRedux = global.window.ReactRedux = require('react-redux');
const ReactJSS = global.window.reactJss = require('react-jss');
const io = global.window.io = require('socket.io-client');

const renderer = require('react-test-renderer');

// Mock the Socket.io connect function for all tests
io.connect = jest.fn(() => ({on: jest.fn()}));

const { store, Message, MessageList, Input, Chat } = require('../src/script');

// What do I want to test/make sure works with absolution
// - redux ACTIONS are doing what they intend to do (both sides, firing and
//  components reception)
//    - UI_OPEN
//    - UI_CLOSE
//    - UI_STYLE_MESSANGER
//    - UI_STYLE_MESSANGER
//    - CHAT_CONNECTED
//    - CHAT_DISCONNECTED
//    - CHAT_MESSAGE_OPERATOR
//    - CHAT_MESSAGE_CLIENT
// - styling is available in state
// - ?
//

describe('state', () => {
  it('has a ui.style property', () => {
    const state = store.getState();

    expect(state.ui.hasOwnProperty('style')).toBe(true);

    expect(state.ui.style).not.toBe(undefined);
  });
});

describe('Message', () => {});

describe('MessageList', () => {});

describe('Messages', () => {});

describe('Input', () => {});

describe('Chat', () => {
  it('starts a socket connection', () => {
    const component = renderer.create(
      <Chat store={store} />
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    expect(io.connect).toHaveBeenCalled();
  })
});
