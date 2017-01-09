import Message from '../Message/Message';
import { connect } from 'react-redux';
import './Messages_styles.css';


const MessageList = (props) => {
  const {socket, chatStyle} = props;

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

const messageListMapStateToProps = state => ({ 
  messages: state.chat.messages,
  chatStyle: state.ui.chatStyle
})
const messageListMapDispatchToProps = dispatch => ({ });

export default connect(
  messageListMapStateToProps,
  messageListMapDispatchToProps,
)(MessageList);
