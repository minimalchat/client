import { h } from 'preact';
import PropTypes from 'prop-types';

import { applyTheme } from '../ThemeProvider';

import './styles.css';

const Input = props => {
  const { sendMessage, theme, textBox, handleInput, handleKeyDown } = props;
  return (
    <form className={`Input__form--${theme}`} onSubmit={sendMessage}>
      <input
        className={`Input--${theme}`}
        placeholder="Type Here"
        onChange={e => handleInput(e)}
        onKeyDown={e => handleKeyDown(e)}
        name="messages"
        value={textBox}
      />
    </form>
  );
};

Input.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,

  theme: PropTypes.string.isRequired,
  textBox: PropTypes.string.isRequired,
};

export default applyTheme(Input);
