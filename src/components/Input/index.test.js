import { h } from 'preact';
import render from 'preact-render-to-string';

import Input from '.';

describe('<Input />', () => {
  it('should render ', () => {
    const tree = render(<Input />);
    expect(tree).toMatchSnapshot();
  });
});
