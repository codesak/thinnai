//Not in use, will be used for host sign up if required!
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOAD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  LOGOUT,
  Action,
  TOKEN_KEY,
} from '../utils/consts'
import destroyToken from '../utils/destroyToken'

const initialState = {
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: null,
  user: {},
  verified: null,
  loading: true,
}

const registerReducer = (state = initialState, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LOADED:
    case LOGIN_SUCCESS:
      // if (type === LOGIN_SUCCESS) localStorage.setItem(TOKEN_KEY, payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        verified: payload.confrimed,
      }
    case REGISTER_SUCCESS:
      localStorage.setItem(TOKEN_KEY, payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case VERIFICATION_SUCCESS:
      destroyToken()
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        verified: true,
      }
    case VERIFICATION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        verified: false,
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case USER_LOAD_FAIL:
    case LOGOUT:
      destroyToken()
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
        verified: null,
      }
    default:
      return state
  }
}

export default registerReducer
