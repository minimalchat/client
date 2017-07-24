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
    chatOpen: PropTypes.boolean
  };

  renderToggleChatButton = () => (
    this.props.chatOpen ? (<span>×</span>) : (<span>⬆</span>)
  )

  render () {
    const { toggleChat, theme } = this.props;

    return (
      <header className={`Header--${theme}`} onClick={() => toggleChat(true)}>
        <span className={`Header__title--${theme}`}>Chat with John</span>
        <button className={`Header__closeBtn--${theme}`} onClick={() => toggleChat(true)}>
          {this.renderToggleChatButton()}
        </button>
      </header>
    );
  }
}

export default applyTheme(Header);
