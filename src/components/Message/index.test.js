import render from 'preact-render-to-string';
import { h } from 'preact';
import Message from '.';

describe('Message component', () => {
  it('should render ', () => {
    const props = {
      content: [], // message content
      type: "client-tihodijakl"
    };

    const tree = render(<Message type={props.type} content={props.content} />);
    expect(tree).toMatchSnapshot();
  });
});
