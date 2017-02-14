import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import io from 'socket.io-client';

import Messages from '../Messages/Messages.jsx';
import Input from '../Input/Input.jsx';
import './Chat.css';

import { openChat, toggleChat, closeChat } from '../../containers/UI/actions';
import { recieveMessage } from '../../containers/Chat/actions';

const socketPath = 'http://localhost:8000';

// Create chat box wrapper
export class ChatComponent extends Component {
  static propTypes = {
    chatStyle: PropTypes.string,
    dispatch: PropTypes.func,
    open: PropTypes.bool,
  }

  constructor (props) {
    super(props);

    this.socket = io.connect(socketPath, {
      reconnectionAttempts: 10,
    });

    this.socket.on('connect', this.onSocketConnected);
    this.socket.on('connect_error', this.onSocketConnectionError);
    this.socket.on('connect_timeout', this.onSocketTimeout);
    this.socket.on('disconnect', this.onSocketDisconnected);
    this.socket.on('reconnect', this.onSocketReconnected);
    this.socket.on('reconnecting', this.onSocketReconnecting);
    // this.socket.on('reconnect_error', socketConnectionError);
    this.socket.on('reconnect_failed', this.onSocketReconnectionFailed);
    this.socket.on('reconnect_timeout', this.onSocketTimeout);

    this.socket.on('operator:message', this.handleOperatorMessage());

    // Initial state
    this.state = {
      operator: {
        firstName: 'John',
      },
      company: {
        name: 'ACME',
      },
    };
  }


  // Event Handlers

  // Successful connection
  onSocketConnected() {
    // const state = store.getState();
    console.log('DEBUG', 'Socket connected');

    // if (!this.props.state.chat.connected) {
    //   store.dispatch({ type: CHAT_CONNECTED });
    // }
  }

  // Disconnected
  onSocketDisconnected() {
    // const state = store.getState();
    console.warn('DEBUG', 'Socket disconnected');

    // if (state.chat.connected) {
    //   store.dispatch({ type: CHAT_DISCONNECTED });
    // }
  }

  // Successful re-connected
  onSocketReconnected () {
    console.log('DEBUG', 'Socket reconnected');
  }

  // Attempting to re-connect
  onSocketReconnecting () {
    console.log('DEBUG', 'Socket reconnecting ...');
  }

  // Failed to re-connect after manager.reconnectionAttempts tried
  onSocketReconnectionFailed () {
    console.error('DEBUG', 'Socket failed reconnection');
  }

  // Timeout either connecting or re-connecting
  onSocketTimeout () {
    console.warn('DEBUG', 'Socket timeout');
  }

  // Error when connecting or re-connecting
  onSocketConnectionError () {
    console.error('DEBUG', 'Socket connection error');
  }

  handleOperatorMessage () {
    const { dispatch } = this.props;

    return function handleOperatorMessageCurry (data) {
      console.log('DEBUG', 'RECIEVING MESSAGE ...', data);

      dispatch(recieveMessage(data));
    };
  }


  // Actions

  open () {
    const { dispatch } = this.props;

    console.log('DEBUG', 'Open chat');

    dispatch(openChat());
  }

  toggle () {
    const { dispatch } = this.props;

    console.log('DEBUG', 'Toggling chat');

    dispatch(toggleChat());
  }

  close () {
    const { dispatch } = this.props;

    console.log('DEBUG', 'Close chat');

    dispatch(closeChat());
  }

  // This is where the magic happens

  render () {
    // const { sheet: { classes } } = this.props;
    const socket = this.socket;
    const operator = this.state.operator;
    const company = this.state.company;
    const { open, chatStyle } = this.props;

    const chatStyleName = chatStyle.toLowerCase();
    const chatClasses = [
      `chat-outerWrapper-${chatStyleName}`,
    ];

    if (!open) {
      chatClasses.push('closed');
    }

    return (
      <div className={chatClasses.join(' ')}>
        <div className={`chat-box-${chatStyleName}`}>
          <div className={`chat-innerWrapper-${chatStyleName}`}>
            <div className={`chat-header-${chatStyleName}`}>
              <span className={`chat-headerText-${chatStyleName}`}>
                <strong>{operator.firstName}</strong>&nbsp;from&nbsp;{company.name}
              </span>
              <button className={`chat-icon-${chatStyleName}`} onClick={this.toggle}>&#215;</button>
            </div>
            <Messages socket={socket} />
            <Input socket={socket} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chatStyle: state.ui.chatStyle,
  open: state.ui.open,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const Chat = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatComponent);

export default Chat;
