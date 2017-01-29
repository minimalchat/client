import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { combineReducers, createStore } from 'redux';
import io from 'socket.io-client';
import snapshot from 'react-test-renderer';
import uiReducer from '../src/containers/UI/reducer';
import chatReducer from '../src/containers/Chat/reducer';

// Mock the Socket.io connect function for all tests
const socket = {
  on: jest.fn(),
  emit: jest.fn()
};

io.connect = jest.fn(() => socket);

// create the store / mock store fn's
const store = document.store = createStore(
  combineReducers({
    ui: uiReducer,
    chat: chatReducer,
  }),
);

store.dispatch = jest.fn();

// Globals for easier testing / not importing everything
global.React = React;
global.snapshot = snapshot;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.io = io;

global.store = store;

global.socket = {
  on: jest.fn(),
  emit: jest.fn(),
}  

// Skip createElement warnings but fail tests on any other warning
console.error = message => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
      throw new Error(message);
  }
};