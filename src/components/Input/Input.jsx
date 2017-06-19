import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Input.css';

import { sendMessage } from '../../containers/Chat/actions';
import { CHAT_DISCONNECTED } from '../../containers/Chat/constants';


// TODO: move to a constants file?
const KEY_ENTER = 13;

export class InputComponent extends Component {
  static propTypes = {
    chatStyle: PropTypes.string,
    chatStatus: PropTypes.string,
    chatId: PropTypes.string,
    clientId: PropTypes.string,
    dispatch: PropTypes.func,
    socket: (props, propName) => {
      if (!(propName in props)) {
        throw new Error('socket must be set.');
      }
    },
  }


  constructor (props) {
    super(props);
    this.socket = props.socket;

    this.state = { messageBox: '' };
  }


  onKeyPress = (event) => {
    const { key, keyCode, shiftKey, ctrlKey, altKey } = event;
    const { chatId, clientId } = this.props;
    console.log(`INPUT KEYPRESS ${key} (${keyCode}), SHIFT ${shiftKey}, CTRL ${ctrlKey}, ALT ${altKey}`);

    if (keyCode === KEY_ENTER) {
      if (!shiftKey) {
        console.log('SENDING MESSAGE ...');
        // Send data
        this.socket.emit('client:message', JSON.stringify({
          author: `client.${clientId}`,
          content: event.target.value,
          chat: chatId,
          timestamp: (new Date()).toISOString(),
        }));
        this.props.dispatch(sendMessage(event.target.value));
        this.setState({ messageBox: '' });

        event.preventDefault();
      }
    }

    this.socket.emit('client:typing');
  }

  handleChange = (e) => { this.setState({ messageBox: e.target.value }); }

  render () {
    const { chatStyle, chatStatus } = this.props;
    const isDisabled = chatStatus === CHAT_DISCONNECTED;

    return (
      <textarea
        type="text"
        className={`input-${chatStyle.toLowerCase()}`}
        placeholder="Type a message&hellip;"
        onKeyDown={this.onKeyPress}
        onChange={this.handleChange}
        value={this.state.messageBox}
        disabled={isDisabled}
      />
    );
  }
}

const mapStateToProps = state => ({
  chatStyle: state.ui.style,
  chatStatus: state.chat.status,
  chatId: state.chat.session.id,
  clientId: state.chat.session.client.id,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const Input = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputComponent);

export default Input;
