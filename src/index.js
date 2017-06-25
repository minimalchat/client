import { render, h } from 'preact';
import App from './components/App';

// Render the app
const mount = document.getElementById('mount');

render(<App />, mount);
