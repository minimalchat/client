import { h, Component } from 'preact';
import PropTypes from 'prop-types';

import Header from '../Header';
import Message from '../Message';
import Input from '../Input';
import { applyTheme } from '../ThemeProvider';

import './styles.css';
import Notification from '../Notification/index';

/**
 * Main chat component handles displaying chat messages and passes
 * functions to the input to send messages
 * Has scroll to bottom functionality for keeping window scoll at bottom of the chat.
 * Needs to be a class based component in order to have that functionality ^
 */
class Chat extends Component {
  propTypes = {
    toggleChat: PropTypes.func,
    typing: PropTypes.boolean,
    handleInput: PropTypes.func,
    handleKeyDown: PropTypes.func,
    sendMessage: PropTypes.func,
    chatOpen: PropTypes.boolean,
    network: PropTypes.string,
    theme: PropTypes.string,
    textBox: PropTypes.string,
    messages: PropTypes.arrayOf({
      timestamp: PropTypes.string,
      author: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string),
      chat: PropTypes.string,
    }),
  };

  componentDidMount () {
    this.scrollToBottom();
  }

  componentDidUpdate () {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.container.scrollTop = this.container.scrollHeight;
  };

  // msg.content is an array!
  renderMessages = () =>
    this.props.messages.map(msg => <Message type={msg.author} content={msg.content} />);

  renderTyping = () =>
    (<div className={`Message__operatorWrapper--${this.props.theme}`}>
      <ul className={`Message__operator--${this.props.theme}`}>
        <li>
          <svg width="32" height="20">
            <circle id="typing-circle-1" r="3" cx="8" cy="16" fill="#aeaeae" />
            <animate
              xlinkHref="#typing-circle-1"
              attributeName="cy"
              from="16"
              to="16"
              values="16; 12; 16;"
              dur="500ms"
              repeat="always"
              begin="0s"
              repeatCount="indefinite"
              fill="freeze"
              id="typing-1"
            />
            <circle id="typing-circle-2" r="3" cx="16" cy="16" fill="#aeaeae" />
            <animate
              xlinkHref="#typing-circle-2"
              attributeName="cy"
              from="16"
              to="16"
              values="16; 12; 16;"
              dur="500ms"
              begin="typing-1.begin + 250ms"
              repeatCount="indefinite"
              fill="freeze"
              id="typing-2"
            />
            <circle id="typing-circle-3" r="3" cx="24" cy="16" fill="#aeaeae" />
            <animate
              xlinkHref="#typing-circle-3"
              attributeName="cy"
              from="16"
              to="16"
              values="16; 12; 16;"
              dur="500ms"
              begin="typing-2.begin + 250ms"
              repeatCount="indefinite"
              fill="freeze"
              id="typing-3"
            />
          </svg>
        </li>
      </ul>
      <img
        alt="Operator"
        className={`Message__avatar--${this.props.theme}`}
        src="http://placehold.it/40x40/"
      />
    </div>);

  render () {
    const {
      toggleChat,
      textBox,
      typing,
      handleInput,
      handleKeyDown,
      sendMessage,
      theme,
    } = this.props;

    return (
      <section className={`Chat--${theme}`}>
        <Header toggleChat={() => toggleChat(false)} chatOpen={this.props.chatOpen} />
        <Notification network={this.props.network} />

        {/* Container for text input and reading messages */}
        <ul
          className={`Chat__body--${theme}`}
          ref={c => {
            this.container = c;
            return c;
          }}
        >
          {this.renderMessages()}
          <li
            style={{ display: typing ? 'block' : 'none' }}
            className={`Message__box-typing--${theme}`}
          >
            {this.renderTyping()}
          </li>
        </ul>

        <Input
          sendMessage={sendMessage}
          textBox={textBox}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown}
        />
      </section>
    );
  }
}

export default applyTheme(Chat);
