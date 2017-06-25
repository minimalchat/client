/* const render = require('preact-render-to-string');
 * const App = require('../thing');*/
import render from 'preact-render-to-string';
import { h } from 'preact';
import Chat from '.';

describe('App component', () => {
  it('should render ', () => {
    const props = {
      messages: [],
    };

    const tree = render(<Chat messages={props.messages} />);
    expect(tree).toMatchSnapshot();
  });
});
