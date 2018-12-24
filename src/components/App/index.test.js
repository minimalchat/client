import { h } from 'preact';
import render from 'preact-render-to-string';
import io from 'socket.io-client';

import App from '.';

describe('<App />', () => {
  it('matches snapshot', () => {
    const theme = {
      primary_colour: 'test',
    };
    const tree = render(<App theme={theme} />);
    expect(tree).toMatchSnapshot();
  });
});
