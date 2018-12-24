import { h } from 'preact';
import render from 'preact-render-to-string';

import Header from '.';
import { ThemeProvider } from '../ThemeProvider';

describe('<Header />', () => {
  it('should render ', () => {
    const theme = {
      primary_colour: 'test',
    };
    const tree = render(<ThemeProvider theme={theme} style="messenger">
      <Header theme={theme} />
    </ThemeProvider>);
    expect(tree).toMatchSnapshot();
  });
});
