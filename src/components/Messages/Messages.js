/* eslint react/jsx-filename-extension:0*/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Message from '../Message/Message';
import './Messages_styles.css';


const MessageList = (props) => {
  const { socket, chatStyle } = props;

  const messages = props.messages.map(
    (message, index) => <Message key={index} author={message.author} content={message.content} />,
  );

  return (
    <div className={`Messages_${chatStyle}`}>
      <div className={`Messages-wrapper_${chatStyle}`}>
        <ul className={`Messages-list_${chatStyle}`}>
          {messages}
        </ul>
      </div>
    </div>
  );
        // <Notification />
        // <Status socket={socket} />
};

MessageList.propTypes = {
  socket: PropTypes.node,
  chatStyle: PropTypes.string,
  messages: PropTypes.array // eslint-disable-line
};

const messageListMapStateToProps = state => ({
  messages: state.chat.messages,
  chatStyle: state.ui.chatStyle,
});
const messageListMapDispatchToProps = dispatch => ({ });

export default connect(
  messageListMapStateToProps,
  messageListMapDispatchToProps,
)(MessageList);
