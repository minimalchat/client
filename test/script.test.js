const React = global.window.React = require('react');
const Redux = global.window.Redux = require('redux');
const ReactDOM = global.window.ReactDOM = require('react-dom');
const ReactRedux = global.window.ReactRedux = require('react-redux');
const ReactJSS = global.window.reactJss = require('react-jss');
const io = global.window.io = require('socket.io-client');

const snapshot = require('react-test-renderer');
const { shallow, mount, render } = require('enzyme');

// Mock the Socket.io connect function for all tests
const socket = {
  on: jest.fn(),
  emit: jest.fn()
};
io.connect = jest.fn(() => socket);

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


describe('state', () => {
  it('has a ui.style property', () => {
    const { store } = require('../src/script');

    const state = store.getState();

    expect(state.ui.hasOwnProperty('style')).toBe(true);

    expect(state.ui.style).not.toBe(undefined);
  });
});

describe('Message', () => {
  it('matches snapshot', () => {
    const { Message } = require('../src/script');

    const message = {
      key: 0,
      author: 'Test User',
      content: ['Foo Bar']
    };

    const component = snapshot.create(<Message key={message.key} author={message.author} content={message.content} />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('MessageList', () => {
  it('matches snapshot', () => {
    const { MessageList } = require('../src/script');

    const component = snapshot.create(<MessageList socket={socket} />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Input', () => {
  afterEach(() => {
    socket.emit.mockReset();
  });

  it('matches snapshot', () => {
    const { Input } = require('../src/script');

    const component = snapshot.create(<Input socket={socket} />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('emits a client:typing event on keyDown', () => {
    const { Input } = require('../src/script');

    const component = mount(<Input socket={socket} />);

    component.find('textarea').simulate('keyDown', {
      keyCode: 84,
      key: "t"
    });

    expect(socket.emit).toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalledWith('client:typing');
  });


  it('emits a client:message event on keyDown', () => {
    const { store, Input } = require('../src/script');

    const component = mount(<Input socket={socket} />);

    store.dispatch = jest.fn();

    component.find('textarea').simulate('keyDown', {
      keyCode: 13,
      shiftKey: false,
      key: "Enter"
    });

    expect(socket.emit).toHaveBeenCalledTimes(2);
    expect(socket.emit.mock.calls[0][0]).toBe('client:message');
  });
});

describe('Chat', () => {
  it('matches snapshot', () => {
    const { store, Chat } = require('../src/script');

    const component = snapshot.create(<Chat store={store} />);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('starts a socket connection', () => {
    const { store, Chat } = require('../src/script');

    expect(io.connect).toHaveBeenCalled();
  })

});
