import { h } from 'preact';
import render from 'preact-render-to-string';

import ClosedState from '.';

describe('<ClosedState />', () => {
  it('matches snapshot', () => {
    const tree = render(<ClosedState toggleChat={jest.fn()} />);
    expect(tree).toMatchSnapshot();
  });
});
