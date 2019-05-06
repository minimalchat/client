import { h } from 'preact';
import PropTypes from 'prop-types';

import Header from '../Header';

import './styles.css';

const ClosedState = props => (
  <Header chatOpen={props.chatOpen} toggleChat={() => props.toggleChat(true)} />
);

ClosedState.defaultProps = {
  chatOpen: false,
};

ClosedState.propTypes = {
  toggleChat: PropTypes.func.isRequired,
  chatOpen: PropTypes.bool,
};

export default ClosedState;
