import React, {PropTypes} from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import './Message_styles.css';

// TODO: CHAT_OPERATOR mocked - this will be in the redux store.
const CHAT_OPERATOR = 'client';

const Message = props => {

  const content = props.content.map((message, index) => <li key={index}>{message}</li>);

  let message = (
    <div>
      <ul className="Message-userContent">
        {content}
      </ul>
    </div>
  );

  if (props.author === CHAT_OPERATOR) {
    message = (
      <div>
        <div className="Message-operatorPicture">
          <img alt="Operator" className="Message-operatorPictureImage" src="http://placehold.it/40x40/" />
        </div>
        <ul className={classes.operatorContent}>
          {content}
        </ul>
      </div>
    );
  }

  return (
    <li id={`message_${props.id}`} className="letschat-message" style={{ clear: 'both' }}>
      {message}
      <span className="letschat-message-timestamp">{props.timestamp}</span>
    </li>
  );
};

Message.propTypes = {
  author: PropTypes.string,
  content: PropTypes.array,
};

export default Message;