import React from 'react';

// import { describe, it, expect } from 'jest';
import { shallow } from 'enzyme';

import Message from './Message.jsx';

const store = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(() => ({
    ui: { chatStyle: 'TEST' },
  })),
};

describe('Message', () => {
  it('matches snapshot', () => {
    const message = {
      key: 0,
      author: 'Test User',
      content: ['Foo Bar'],
    };

    const component = shallow(
      <Message
        store={store}
        key={message.key}
        author={message.author}
        content={message.content}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
