import { h, Component } from 'preact';
import PropTypes from 'prop-types';

import { applyTheme } from '../ThemeProvider/';

import './style.css';

/**
* Header
*
*/

class Header extends Component {
  propTypes = {
    toggleChat: PropTypes.func,
    theme: PropTypes.string,
  };

  render () {
    const { toggleChat, theme } = this.props;

    return (
      <header className={`Header--${theme}`}>
        <span className={`Header__title--${theme}`}>Chat with John</span>
        <button className={`Header__closeBtn--${theme}`} onClick={toggleChat}>
          ×
        </button>
      </header>
    );
  }
}

export default applyTheme(Header);
