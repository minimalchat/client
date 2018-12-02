import { h, Component } from 'preact';
import PropTypes from 'prop-types';

import { applyTheme } from '../ThemeProvider/';

import './style.css';

/**
* Notification
* NOTE: this notificatin is tailored towards displaying network notifications; it has
* not been built with other types of notifications in mind (ex: '6 new messages!')
* Possible future feature refactor
*/
class Notification extends Component {
  propTypes = {
    style: PropTypes.string,
    network: PropTypes.string,
  };

  render () {
    const { style, network } = this.props;
    if (network === '' || network === 'connected') return null;

    const renderNotification = () => {
      switch (network) {
        case 'disconnected':
          return 'Chat Disconnected';
        case 'reconnecting':
          return 'Disconnected; trying to reconnect...';
        case 'reconnected':
          return 'Back in Business!';
        default:
          return '';
      }
    };

    return (
      <section className={`Notification__${style}-${network}`}>{renderNotification()}</section>
    );
  }
}

export default applyTheme(Notification);
