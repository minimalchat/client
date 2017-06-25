import { h } from 'preact';
import render from 'preact-render-to-string';

import Header from '.';

describe('<Header />', () => {
  it('should render ', () => {
    const tree = render(<Header />);
    expect(tree).toMatchSnapshot();
  });
});
