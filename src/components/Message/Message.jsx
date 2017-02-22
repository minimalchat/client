import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './Message.css';

const CHAT_OPERATOR = 'OPERATOR';

export const MessageComponent = (props) => {
  const { chatStyle, author, timestamp, key } = props;
  const chatStyleName = chatStyle.toLowerCase();
  const content = props.content.map((message, index) => <li key={index}>{message}</li>);

  let message = (
    <div>
      <ul className={`message-userContent-${chatStyleName}`}>
        {content}
      </ul>
    </div>
  );

  if (author === CHAT_OPERATOR) {
    message = (
      <div>
        <div className={`message-operatorPicture-${chatStyleName}`}>
          <img alt="Operator" className={`message-operatorPictureImage-${chatStyleName}`} src="http://placehold.it/40x40/" />
        </div>
        <ul className={`message-operatorContent-${chatStyleName}`}>
          {content}
        </ul>
      </div>
    );
  }

  return (
    <li id={`message_${key}`} className={`message-message-${chatStyleName}`} style={{ clear: 'both' }}>
      {message}
      <span className={`message-message-timestamp-${chatStyleName}`}>{timestamp}</span>
    </li>
  );
};

MessageComponent.propTypes = {
  chatStyle: PropTypes.string,
  timestamp: PropTypes.number,
  key: PropTypes.string,
  author: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

const mapStateToProps = state => ({
  chatStyle: state.ui.style,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});


const Message = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageComponent);

export default Message;
