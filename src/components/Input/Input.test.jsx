import React from 'react';

import { shallow, mount } from 'enzyme';

import Input from './Input.jsx';

const socket = {
  // on: jest.fn(),
  emit: jest.fn(),
};

const store = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(() => ({
    ui: { chatStyle: 'TEST' },
  })),
};

describe('Input', () => {
  afterEach(() => {
    socket.emit.mockReset();
  });

  it('matches snapshot', () => {
    const component = shallow(<Input store={store} socket={socket} />);
    expect(component).toMatchSnapshot();
  });

  it('emits a client:typing event on keyDown', () => {
    const component = mount(<Input store={store} socket={socket} />);
    component.find('textarea').simulate('keyDown', {
      keyCode: 84,
      key: 't',
    });

    expect(socket.emit).toHaveBeenCalled();
    expect(socket.emit).toHaveBeenCalledWith('client:typing');
  });

  it('emits a client:message event on keyDown', () => {
    const component = mount(<Input store={store} socket={socket} />);

    component.find('textarea').simulate('keyDown', {
      keyCode: 13,
      shiftKey: false,
      key: 'Enter',
    });

    expect(socket.emit).toHaveBeenCalledTimes(2);
    expect(socket.emit.mock.calls[0][0]).toBe('client:message');
  });
});
