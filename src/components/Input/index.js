import { h, Component } from 'preact';
import PropTypes from 'prop-types';

import { applyTheme } from '../ThemeProvider';

import './styles.css';

class Input extends Component {
  componentDidMount () {
    this.focusInput();
  }

  focusInput () {
    if (this.input != null) {
      this.input.focus();
    }
  }

  render () {
    const { sendMessage, theme, textBox, handleInput, handleKeyDown } = this.props;

    return (
      <form className={`Input__form--${theme}`} onSubmit={sendMessage}>
        <input
          ref={input => {
            this.input = input;
          }}
          className={`Input--${theme}`}
          placeholder="Type Here"
          onChange={e => handleInput(e)}
          onKeyDown={e => handleKeyDown(e)}
          name="messages"
          value={textBox}
        />
      </form>
    );
  }
}

Input.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,

  theme: PropTypes.string.isRequired,
  textBox: PropTypes.string.isRequired,
};

export default applyTheme(Input);
