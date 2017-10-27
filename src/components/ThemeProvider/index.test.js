import { h } from 'preact';
import render from 'preact-render-to-string';

import ThemeProvider from '.';



describe('<ThemeProvider />', () => {
  it('should render ', () => {
    const tree = render(<ThemeProvider><span>Hello World</span></ThemeProvider>);
    expect(tree).toMatchSnapshot();
  });
});
