import {createStore, combineReducers, applyMiddleware} from 'redux';

import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import auth from './reducers/auth';

export default createStore(
  combineReducers({
    auth,
  }),{
    auth : {
      authenticated : null,
      profile: null,
      pending : false,
      messages : {
        errors : []
      },
    },
  },
  applyMiddleware(thunk, promiseMiddleware(), logger)
);
