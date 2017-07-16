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
    handleInput: PropTypes.func,
    sendMessage: PropTypes.func,

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

  render () {
    const { toggleChat, textBox, handleInput, sendMessage, theme } = this.props;

    return (
      <section className={`Chat--${theme}`}>
        <Header toggleChat={() => toggleChat(false)} />
        <Notification network={this.props.network} />

        {/* Container for text input and reading messages */}
        <ul className={`Chat__body--${theme}`} ref={c => (this.container = c)}>
          {this.renderMessages()}
        </ul>

        <Input sendMessage={sendMessage} textBox={textBox} handleInput={handleInput} />
      </section>
    );
  }
}

export default applyTheme(Chat);
