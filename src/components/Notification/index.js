import { h, Component } from "preact";
import PropTypes from "prop-types";

import { applyTheme } from "../ThemeProvider/";

import "./style.css";

/**
* Notification
*
*/
class Notification extends Component {
  propTypes = {
    theme: PropTypes.string,
    network: PropTypes.string
  };

  render() {
    const { theme, network } = this.props;
    if (network === "") return null;

    const renderNotification = () => {
      switch (network) {
        case "disconnected":
          return "Chat Disconnected";
        case "reconnecting":
          return "Disconnected; trying to reconnect...";
        case "reconnected":
          return "Disconnected; trying to reconnect...";
      }
    };

    return (
      <section className={`Notification__${theme}-${network}`}>
        {renderNotification()}
      </section>
    );
  }
}

export default applyTheme(Notification);
