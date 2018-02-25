import initialState from './initialState'

export default function readsReducer(state=initialState.reads, action) {
  switch(action.type) {
    case 'GET_READS':
      return action.payload; 
    default: 
      return state;
  }
}