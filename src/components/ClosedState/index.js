import { h } from 'preact';
import PropTypes from 'prop-types';

import Header from '../Header';

import './styles.css';

const ClosedState = props =>
  <Header chatOpen={props.chatOpen} toggleChat={() => props.toggleChat(true)} />;
ClosedState.propTypes = {
  toggleChat: PropTypes.func,
  chatOpen: PropTypes.boolean,
};

export default ClosedState;
