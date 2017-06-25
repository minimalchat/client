import render from 'preact-render-to-string';
import { h } from 'preact';
import Header from '.';

describe('Header component', () => {
  it('should render ', () => {
    const props = {};

    const tree = render(<Header />);
    expect(tree).toMatchSnapshot();
  });
});
