import { h } from 'preact';
import render from 'preact-render-to-string';

import Chat from '.';

describe('<Chat />', () => {
  it('matches snapshot', () => {
    const props = {
      messages: [],
    };
    const tree = render(<Chat messages={props.messages} />);
    expect(tree).toMatchSnapshot();
  });
});
