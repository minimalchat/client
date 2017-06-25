/* const render = require('preact-render-to-string');
 * const App = require('../thing');*/
import render from 'preact-render-to-string';
import { h } from 'preact';
import Input from '.';

describe('App component', () => {
  it('should render ', () => {
    const tree = render(<Input />);
    expect(tree).toMatchSnapshot();
  });
});
