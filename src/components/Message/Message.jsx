import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './Message.css';

const CHAT_OPERATOR = 'OPERATOR';

export const MessageComponent = (props) => {
  const { chatStyle, author, timestamp, id } = props;
  const content = props.content.map((message, index) => <li key={index}>{message}</li>);

  let message = (
    <div>
      <ul className={`Message-userContent_${chatStyle}`}>
        {content}
      </ul>
    </div>
  );

  if (author === CHAT_OPERATOR) {
    message = (
      <div>
        <div className={`Message-operatorPicture_${chatStyle}`}>
          <img alt="Operator" className={`Message-operatorPictureImage_${chatStyle}`} src="http://placehold.it/40x40/" />
        </div>
        <ul className={`Message-operatorContent_${chatStyle}`}>
          {content}
        </ul>
      </div>
    );
  }

  return (
    <li id={`message_${id}`} className="letschat-message" style={{ clear: 'both' }}>
      {message}
      <span className="letschat-message-timestamp">{timestamp}</span>
    </li>
  );
};

MessageComponent.propTypes = {
  chatStyle: PropTypes.string,
  timestamp: PropTypes.number,
  id: PropTypes.string,
  author: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

const Message = connect(
  state => ({ chatStyle: state.ui.chatStyle }),
  dispatch => ({ dispatch }),
)(MessageComponent);

export default Message;
