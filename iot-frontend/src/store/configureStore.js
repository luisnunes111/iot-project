import {createStore, applyMiddleware} from 'redux';
import ReduxThunk  from 'redux-thunk';
import logger  from 'redux-logger';
import rootReducer from '../reducers';



export default function configureStore(session) {  
  
  return createStore(
    rootReducer,
    session,
    applyMiddleware(ReduxThunk, logger)
  );
}