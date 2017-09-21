import { h } from 'preact';
import PropTypes from 'prop-types';

import { applyTheme } from '../ThemeProvider';

import './styles.css';

const Message = props => {
  // our message's content
  const content = props.content.map((msg, i) =>
    <li key={i}>
      {msg}
    </li>
  );

  // our default message is a client message
  let message = (
    <div className={`Message__operatorWrapper--${props.theme}`}>
      <ul className={`Message__operator--${props.theme}`}>
        {content}
      </ul>

      <img
        alt="Operator"
        className={`Message__avatar--${props.theme}`}
        src="http://placehold.it/40x40/"
      />
    </div>
  );

  // Ff the iterated message is an operator; override `message`
  if (props.type.indexOf('client') >= 0) {
    message = (
      <ul className={`Message__client--${props.theme}`}>
        {content}
      </ul>
    );
  }

  // Incoming props, mesage.content is an array.
  return (
    <li className={`Message__box--${props.theme}`}>
      {message}
    </li>
  );
};

Message.propTypes = {
  theme: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default applyTheme(Message);
