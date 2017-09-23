import { h, Component } from 'preact';

import Chat from '../Chat';
import ClosedState from '../ClosedState';
import { ThemeProvider } from '../ThemeProvider';
import {
  formatMessageForClient,
  formatMessageForServer,
  combineLastMessage,
  createSocket,
  queryMessages,
} from './functions';

import './styles.css';

const MESSENGER = 'messenger';
const FLOAT = 'float';
const SIDEPANEL = 'side';

const TYPING_TIMEOUT = 3000;

class App extends Component {
  state = {
    chatOpen: false,
    messages: [],
    textBox: '',
    network: '',
    theme: MESSENGER, // wrapped with theme provider + HOC
  };

  componentDidMount () {
    this.socket = createSocket(this);
    this.typing = null;
  }

  componentWillUnMount () {
    window.clearTimeout(this.typing);
    this.typing = null;
  }

  // --- UI / Event Handlers

  toggleChat = bool => {
    this.setState({ chatOpen: bool });
  };

  handleInput = e => {
    this.setState({ textBox: e.target.value });
  };

  // --- Socket Methods

  handleKeyDown = e => {
    const payload = JSON.stringify(
      formatMessageForServer(null, this.state.session.client.id, this.state.session.id)
    );

    this.socket.emit('client:typing', payload);
  };

  /**
  * @description On connecting to the socket server save a session object into the state
  */
  handleNewConnection = session => {
    this.setState({
      session,
    });
  };

  handleExistingConnection = session => {
    this.setState({
      session,
    });

    queryMessages(this);
  };

  handleDisconnected = () => {
    this.setState({
      network: 'disconnected',
    });
  };

  handleReconnecting = attempts => {
    // eslint-disable-next-line
    const attemptLimit = this.socket.io._reconnectionAttempts;
    if (attempts < attemptLimit) {
      this.setState({
        network: 'reconnecting',
      });
    } else {
      this.handleDisconnected();
    }
  };

  handleReconnected = () => {
    this.setState({
      network: 'reconnected',
    });
  };

  // ---  Message Methods

  loadMessages = msgs => {
    let messages = [];

    // Since these are all 'new' we have to run though each and combine accordingly
    for (let i = 0; i < msgs.length; i += 1) {
        messages = combineLastMessage(
          Object.assign({}, {
            ...msgs[i],
            content: [msgs[i].content],
          }),
          messages
        );
    }

    this.setState({
      messages,
    });
  };

  // Save the message to local state
  saveMessageToState = msg => {
    const formattedMsg = formatMessageForClient(
      msg,
      this.state.session.client.id,
      this.state.session.id
    );

    this.setState({
      messages: combineLastMessage(formattedMsg, this.state.messages),
      textBox: '',
    });
  };

  saveMessageToServer = msg => {
    const formattedMsg = formatMessageForServer(
      msg,
      this.state.session.client.id,
      this.state.session.id
    );

    this.socket.emit('client:message', JSON.stringify(formattedMsg));
  };

  /** Send Message
   * @summary - Allow a user to send a message.
   * @description - Passes the message through some functions to save it locally and remotely
   * @param {object} e - event object; used to prevent refreshing the page
   */
  sendMessage = e => {
    e.preventDefault(); // Must prevent default behavior first
    if (this.state.textBox === '') return;
    const msg = this.state.textBox;
    this.saveMessageToState(msg);
    this.saveMessageToServer(msg);
  };

  /** Recieve Message
   * @summary - Takes data sent to user from socket/operator and consumes it
   * @description - Takes data from websocket clears typing timeout and combines the data
   * with the last message if necessary
   * @param {string} data - JSON string of data being sent back
   */
  receiveMessage = data => {
    const msg = JSON.parse(data); // Data comes in as a string

    // Clear the typing timeout if we receive a message
    window.clearTimeout(this.typing);
    this.typing = null;

    this.setState({
      typing: false,
      messages: combineLastMessage(msg, this.state.messages),
    });
  };

  /** Operator Typing
   * @summary - Handles debouncing operator typing chat bubble
   * @description - Sets a timeout to remove chat bubble after receiving indication from
   * the daemon that the operator is typing, resetting the timeout each time and updating
   * the state to reflect the typing
   */
  operatorTyping = () => {
    window.clearTimeout(this.typing);

    this.typing = window.setTimeout(() => {
      // Clear the typing variable
      this.setState({
        typing: false,
      });
    }, TYPING_TIMEOUT);

    this.setState({
      typing: true,
    });
  };

  // --- Render + Render methods

  renderClosedChat = () => (
    <ClosedState chatOpen={this.state.chatOpen} toggleChat={this.toggleChat} />
  );

  renderOpenChat = () => (
    <Chat
      messages={this.state.messages}
      network={this.state.network}
      textBox={this.state.textBox}
      toggleChat={this.toggleChat}
      typing={this.state.typing}
      handleInput={this.handleInput}
      handleKeyDown={this.handleKeyDown}
      sendMessage={this.sendMessage}
      chatOpen={this.state.chatOpen}
    />
  );

  renderChat = () => (this.state.chatOpen ? this.renderOpenChat() : this.renderClosedChat());

  render () {
    const { theme, chatOpen } = this.state;
    const visibility = chatOpen ? 'open' : 'closed';

    return (
      <ThemeProvider theme={this.state.theme}>
        <div className={`mnml--${theme} ${visibility}`}>{this.renderChat()}</div>
      </ThemeProvider>
    );
  }
}

export default App;
