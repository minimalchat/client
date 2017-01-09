import Message from '../Message/Message';
import { connect } from 'react-redux';
import './Messages_styles.css';


const MessageList = (props) => {
  const socket = props.socket;
  console.log('props for message list', props);

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

const messageListMapStateToProps = state =>  ({
  messages: state.chat.messages, // used to be state.messages..
  chodes: 'daildck',
});

const messageListMapDispatchToProps = dispatch => ({ });

export default connect(
  messageListMapStateToProps,
  messageListMapDispatchToProps,
)(MessageList);
