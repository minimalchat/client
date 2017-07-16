import { h, Component } from 'preact';

import Chat from '../Chat';
import ClosedState from '../ClosedState';
import { ThemeProvider } from '../ThemeProvider';
import {
  formatMessageForClient,
  formatMessageForServer,
  combineLastMessage,
  createSocket,
} from './functions';

import './styles.css';

const MESSENGER = 'messenger';
const FLOAT = 'float';
const SIDEPANEL = 'side';

class App extends Component {
  state = {
    chatOpen: true,
    messages: [],
    textBox: '',
    network: '',
    theme: MESSENGER, // wrapped with theme provider + HOC
  };

  componentDidMount () {
    this.socket = createSocket(this);
  }

  // --- UI / Event Methods

  toggleChat = bool => {
    this.setState({ chatOpen: bool });
  };

  handleInput = e => {
    this.setState({ textBox: e.target.value });
  };

  // ---  Socket Methods

  /**
  * @description On connecting to the socket server save a session object into the state
  */
  handleNewConnection = e => {
    this.setState({
      session: JSON.parse(e),
    });
  };

  handleDisconnected = () => {
    this.setState({
      network: 'disconnected',
    });
  };

  handleReconnecting = attempts => {
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

  // save the message to local stage: either combining them or not.
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

  receiveMessage = data => {
    const msg = JSON.parse(data); // Data comes in as a string

    this.setState({
      messages: combineLastMessage(msg, this.state.messages),
    });
  };

  // --- Render + Render methods

  renderClosedChat = () => <ClosedState toggleChat={this.toggleChat} />;

  renderOpenChat = () =>
    (<Chat
      messages={this.state.messages}
      network={this.state.network}
      textBox={this.state.textBox}
      toggleChat={this.toggleChat}
      handleInput={this.handleInput}
      sendMessage={this.sendMessage}
    />);

  renderChat = () => (this.state.chatOpen ? this.renderOpenChat() : this.renderClosedChat());

  render () {
    const { theme, chatOpen } = this.state;
    const visibility = chatOpen ? 'open' : 'closed';

    return (
      <ThemeProvider theme={this.state.theme}>
        <div className={`mnml--${theme} ${visibility}`}>
          {this.renderChat()}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
