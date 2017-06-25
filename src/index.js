import { render, h } from 'preact';
import App from './components/App';

// Render the app
const div = document.createElement('div');
document.body.appendChild(div);

div.id = 'mnml-chat';

render(<App />, div);
