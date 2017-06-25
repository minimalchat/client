import { h } from 'preact';
import render from 'preact-render-to-string';

import Message from '.';

describe('<Message />', () => {
  it('matches snapshot', () => {
    const props = {
      content: [], // message content
      type: 'client-TEST',
    };

    const tree = render(<Message type={props.type} content={props.content} />);
    expect(tree).toMatchSnapshot();
  });
});
