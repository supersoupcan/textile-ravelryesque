import {createStore, combineReducers, applyMiddleware} from 'redux';

import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import auth from './reducers/auth';
import messages from './reducers/messages';

export default createStore(
  combineReducers({
    auth,
    messages
  }),{
    auth : {
      authenticated : null,
      profile: null,
      pending : false,
    },
    messages : {}
  },
  applyMiddleware(thunk, promiseMiddleware(), logger)
);
