import { h } from 'preact';
import PropTypes from 'prop-types';
import Header from '../Header';

import './styles.css';

const ClosedState = props => <Header toggleChat={() => props.toggleChat(true)} />;

ClosedState.propTypes = {
  toggleChat: PropTypes.func,
};

export default ClosedState;
