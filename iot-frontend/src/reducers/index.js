import {combineReducers} from 'redux';
import reads from './readsReducer';
import boards from './boardReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  reads,
  boards,
  user
})

export default rootReducer;