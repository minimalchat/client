import { h, Component } from 'preact';

const { applyTheme } = ComponentToWrap =>
  class ThemeComponent extends Component {
    render () {
      const { theme } = this.context;
      return <ComponentToWrap {...this.props} theme={theme} />;
    }
  };

export default applyTheme;
