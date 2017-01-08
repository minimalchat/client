import Message from '../Message/Message';
import { connect } from 'react-redux';



const MessageList = (props) => {
  console.log(props);
  // const state = store.getState();
  const socket = props.socket;

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

const messageListMapStateToProps = state => ({
  messages: state.messages || [],
});

const messageListMapDispatchToProps = dispatch => ({ });

export default connect(
  messageListMapStateToProps,
  messageListMapDispatchToProps,
)(MessageList);
