import React, { Component, PropTypes } from 'react';
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
    console.log(`INPUT KEYPRESS ${key} (${keyCode}), SHIFT ${shiftKey}, CTRL ${ctrlKey}, ALT ${altKey}`);

    if (keyCode === KEY_ENTER) {
      if (!shiftKey) {
        console.log('SENDING MESSAGE ...');
        // Send data
        this.socket.emit('client:message', event.target.value);
        this.props.dispatch(sendMessage(event.target.value));
        this.setState({ messageBox: '' });

        event.preventDefault();
      }
    }

    this.socket.emit('client:typing');
  }

  handleChange = (e) => { this.setState({ messageBox: e.target.value }); }

  render() {
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
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const Input = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputComponent);

export default Input;
