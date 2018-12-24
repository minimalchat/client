import { h } from 'preact';
import render from 'preact-render-to-string';

import ThemeProvider from '.';


describe('<ThemeProvider />', () => {
  it('should render ', () => {
    const theme = {};
    const style = 'messenger'; 
    const tree = render(<ThemeProvider theme={theme} style={style}><span>Hello World</span></ThemeProvider>);
    expect(tree).toMatchSnapshot();
  });
});
