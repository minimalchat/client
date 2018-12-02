import { h, Component } from 'preact';
import PropTypes from 'prop-types';

import './styles.css';

export class ThemeProvider extends Component {
  propTypes = {
    children: PropTypes.element,
  };

  getChildContext () {
    const { ...context } = this.props;
    return context;
  }
  render ({ children }) {
    return (children && children[0]) || null;
  }
}

export const applyTheme = ComponentToWrap =>
  class ThemeComponent extends Component {
    render () {
      const { theme, style } = this.context;
      return <ComponentToWrap {...this.props} theme={theme} style={style} />;
    }
  };
