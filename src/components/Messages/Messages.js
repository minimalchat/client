import Message from '../Message/Message';
import { connect } from 'react-redux';
import './Messages_styles.css';


const MessageList = (props) => {
  const socket = props.socket;

  const messages = props.messages.map(
    (message, index) => <Message key={index} author={message.author} content={message.content} />,
  );

  return (
    <div className="Messages">
      <div className="Messages-wrapper">
        <ul className="Messages-list">
          {messages}
        </ul>
      </div>
    </div>
  );
        // <Notification />
        // <Status socket={socket} />
};

const messageListMapStateToProps = state => ({ messages: state.chat.messages })
const messageListMapDispatchToProps = dispatch => ({ });

export default connect(
  messageListMapStateToProps,
  messageListMapDispatchToProps,
)(MessageList);
