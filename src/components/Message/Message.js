import React, {PropTypes} from 'react';
// import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import './Message_styles.css';

const CHAT_OPERATOR = 'OPERATOR'

const Message = props => {
  const {chatStyle, author, timestamp, id} = props;
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

Message.propTypes = {
  author: PropTypes.string,
  content: PropTypes.array,
};

export default connect(
  state => ({chatStyle: state.ui.style}), 
  dispatch => ({})
)(Message)