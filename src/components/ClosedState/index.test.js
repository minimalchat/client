import { h } from 'preact';
import render from 'preact-render-to-string';

import ClosedState from '.';
import { ThemeProvider } from '../ThemeProvider';

describe('<ClosedState />', () => {
  it('matches snapshot', () => {
    const theme = {
      primary_colour: 'test',
    };
    const tree = render(<ThemeProvider theme={theme} style="messenger">
      <ClosedState toggleChat={jest.fn()} />
    </ThemeProvider>);
    expect(tree).toMatchSnapshot();
  });
});
