import {
  UI_OPEN,
  UI_CLOSE,
  UI_HARD_ENTER,
  UI_SOFT_ENTER,
  TOGGLE_CHAT_STYLE,
} from './constants';

const uiInitialState = {
  chatStyle: 'MESSENGER', //TODO: connect to App constants (make a global constants file // SIDEPANEL, FLOAT, MESSENGER)
};

const uiReducer = function UIReducer(state = uiInitialState, action) {
  console.log('UI', action.type);

  switch (action.type) {
    case UI_CLOSE:
      return Object.assign({}, state, {
        open: false,
      });

    case UI_OPEN:
      return state;

    case TOGGLE_CHAT_STYLE:
      return { ...state, chatStyle: action.payload };

    default:
      return state;
  }
};

export default uiReducer;
