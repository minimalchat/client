import { render, h } from 'preact';
import App from './components/App';
import theme from '../config/theme.json';

// Testing to see if this works with the Theme Editor
// TODO: Figure out a better way to deal with this, but for now, hack it up!
window._mnmlThemeObject = theme; // eslint-disable-line no-underscore-dangle

// Render the app
const div = document.createElement('div');
document.body.appendChild(div);

div.id = 'mnml-chat';

render(<App theme={theme} />, div);
