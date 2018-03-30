import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';

export default createStore(
  combineReducers({
    
  }),{
    
  },
  applyMiddleware(logger)
);
