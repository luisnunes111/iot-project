import initialState from './initialState'

export default function userReducer(state=initialState.user, action) {
  switch(action.type) {
    case 'USER_SIGNIN_FULFILLED':
      return {...state, username: action.payload.username, name: action.payload.name, image: action.payload.image, loginState: { success: true }};
    case 'USER_SIGNIN_PENDING':
      return {...state, loginState: { pending: true }};
    case 'USER_SIGNIN_ERROR':
      return {...state, loginState: { error: { state: true, msg: action.payload}}};
    case 'USER_SIGNUP_FULFILLED':
      return {...state, registerState: { success: true }};
    case 'USER_SIGNUP_PENDING':
      return {...state, registerState: { pending: true}};
    case 'USER_SIGNUP_ERROR':
      return {...state, registerState: { error: { state: true, msg: action.payload}}};
    default: 
      return state;
  }
}
