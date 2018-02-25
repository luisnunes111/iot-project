import initialState from './initialState'

export default function boardReducer(state=initialState.boards, action) {
  switch(action.type) {
    case 'BOARD_CREATE_FULFILLED':
      return {...state, createState: { success: true }};
    case 'BOARD_CREATE_PENDING':
      return {...state, createState: { pending: true }};
    case 'BOARD_CREATE_ERROR':
      return {...state, createState: { error: { state: true, msg: action.payload}}};
    case 'BOARD_LIST_FULFILLED':
      return {...state, data: action.payload, listState: { success: true }};
    case 'BOARD_LIST_PENDING':
      return {...state, listState: { pending: true }};
    case 'BOARD_LIST_ERROR':
      return {...state, listState: { error: { state: true, msg: action.payload}}};
    case 'BOARD_DETAILS_FULFILLED':
      return {...state, details: action.payload, detailsState: { success: true }};
    case 'BOARD_DETAILS_PENDING':
      return {...state, details: null, detailsState: { pending: true }};
    case 'BOARD_DETAILS_ERROR':
      return {...state, detailsState: { error: { state: true, msg: action.payload}}};
    default: 
      return state;
  }
}
