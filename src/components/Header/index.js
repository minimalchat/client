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
    theme: PropTypes.shape({
      primary_colour: PropTypes.string.isRequired,
    }),
    chatOpen: PropTypes.boolean,
  };

  renderToggleChatButton = () => (this.props.chatOpen ? <span>×</span> : <span>...</span>);

  render () {
    const { toggleChat, style, theme } = this.props;

    return (
      <header
        style={{ backgroundColor: theme.primary_colour }}
        role="button"
        tabIndex={0}
        className={`Header--${style}`}
        onClick={() => toggleChat(true)}
        onKeyPress={event => {
          // Ensure event is not null
          const e = event || window.event;

          if ((e.which === 72 || e.keyCode === 72) && e.ctrlKey) {
            toggleChat(true);
          }
        }}
      >
        <span className={`Header__title--${style}`}>Chat with John</span>
        <button className={`Header__closeBtn--${style}`} onClick={() => toggleChat(true)}>
          {this.renderToggleChatButton()}
        </button>
      </header>
    );
  }
}

export default applyTheme(Header);
