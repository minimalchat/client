import React from 'react';
import { Message } from './Message';

describe('Message Component', () => {
  it('renders', () => {
    const message = {
      key: 0,
      author: 'Test User',
      content: ['Foo Bar'],
    };

    const component = renderer.create(<Message key={message.key} author={message.author} content={message.content} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  // it ...
});

