import { h } from 'preact';
import render from 'preact-render-to-string';

import Chat from '.';
import { ThemeProvider } from '../ThemeProvider';

describe('<Chat />', () => {
  it('matches snapshot', () => {
    const props = {
      messages: [],
      theme: {
        primary_colour: 'test',
      },
    };
    const tree = render(<ThemeProvider theme={props.theme} style="messenger">
      <Chat messages={props.messages} />
    </ThemeProvider>);
    expect(tree).toMatchSnapshot();
  });
});
