import Message from '../Message/Message';
import { connect } from 'react-redux';


const MessageList = (props) => {
  const socket = props.socket;
  console.log(props);

  const messages = props.messages.map(
    (message, index) => <Message key={index} author={message.author} content={message.content} />,
  );

  // const { sheet: { classes } } = props;

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
});

const messageListMapDispatchToProps = dispatch => ({ });

export default connect(
  messageListMapStateToProps,
  messageListMapDispatchToProps,
)(MessageList);
