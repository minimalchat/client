/* const render = require('preact-render-to-string');
 * const App = require('../thing');*/
import render from 'preact-render-to-string';
import { h } from 'preact';
import ClosedState from '.';

describe('App component', () => {
  it('should render ', () => {
    const tree = render(<ClosedState />);
    expect(tree).toMatchSnapshot();
  });
});
