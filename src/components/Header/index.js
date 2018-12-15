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
    style: PropTypes.string,
    chatOpen: PropTypes.boolean,
  };

  renderToggleChatButton = () => (this.props.chatOpen ? <span>×</span> : <span>...</span>);

  render () {
    const { toggleChat, style, theme } = this.props;

    return (
      <header style={{ 'background': theme.primaryColour }} className={`Header--${style}`} onClick={() => toggleChat(true)}>
        <span className={`Header__title--${style}`}>Chat with John</span>
        <button className={`Header__closeBtn--${style}`} onClick={() => toggleChat(true)}>
          {this.renderToggleChatButton()}
        </button>
      </header>
    );
  }
}

export default applyTheme(Header);
