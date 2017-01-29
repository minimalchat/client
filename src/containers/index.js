import { combineReducers, createStore } from 'redux';

import chatReducer from './Chat/reducer';
import uiReducer from './UI/reducer';

const store = createStore(
  combineReducers({
    ui: uiReducer,
    chat: chatReducer,
  }),

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
);

export default store;
