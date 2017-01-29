import React from 'react';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import { shallow, render } from 'enzyme';

import Chat from './Chat';

const socket = {
  on: jest.fn(),
};

const store = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(() => ({
    ui: { chatStyle: 'TEST' },
    chat: { messages: [] },
  })),
};

io.connect = jest.fn(() => socket);

describe('Chat', () => {
  it('matches snapshot', () => {
    const component = shallow(<Chat store={store} />);

    expect(component).toMatchSnapshot();
  });

  it('starts a socket connection', () => {
    // Requires a store/Provider for render or mount enzyme functions for
    //  some reason
    render(
      <Provider store={store}>
        <Chat />
      </Provider>,
    );

    expect(io.connect).toHaveBeenCalled();
  });
});
