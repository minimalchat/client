import { Message } from './Message';

describe('Message Component', () => {
  it('renders', () => {
    const message = {
      key: 0,
      author: 'Test User',
      content: ['Foo Bar'],
    };

    const component = shallow(<Message key={message.key} author={message.author} content={message.content} />);
    expect(component).toMatchSnapshot();
  })

  // ...
});

