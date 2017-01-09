import {
  UI_OPEN,
  UI_CLOSE,
  UI_HARD_ENTER,
  UI_SOFT_ENTER,
} from './constants.js'

const uiInitialState = {
  style: 'MESSANGER', //TODO: connect to App constants (make a global constants file)
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

    default:
      return state;
  }
};

export default uiReducer;