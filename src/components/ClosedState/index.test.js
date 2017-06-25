import { h } from 'preact';
import render from 'preact-render-to-string';

import ClosedState from '.';

describe('<ClosedState />', () => {
  it('matches snapshot', () => {
    const tree = render(<ClosedState />);
    expect(tree).toMatchSnapshot();
  });
});
